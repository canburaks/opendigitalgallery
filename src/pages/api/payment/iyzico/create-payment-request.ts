// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IYZICO_LOCAL_STORAGE_TOKEN, PAGES } from '@/constants';
import {
  FormInitializeRequest,
  FormInitializeResponse,
  PaymentGroup,
  OrderStatusEnum,
  CartProduct,
  CART_STATUSES,
  DeliveryOrganization,
  Database,
  PaymentCollector,
} from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { isString } from 'lodash';
import { iyzipay } from '@/data/clients/iyzicoServer';
import { serialize, CookieSerializeOptions } from 'cookie';
import { v5 as uuidv5 } from 'uuid';
import { generatePassword } from '@/utils';
import { CheckoutFormValues } from '@/views/CheckoutView/sections/CheckoutSection';
import { supabaseServer } from '@/data/clients/supabaseServer';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormInitializeResponse | { message: string }>
) {
  const bodyData = JSON.parse(req.body);
  const requestData = bodyData.requestData;
  const formValues = bodyData.formValues as CheckoutFormValues;
  const hiddenAuthUser = bodyData.hiddenAuthUser as CheckoutFormValues;
  const cartProducts = bodyData.cartProducts as CartProduct[];

  let currentUserId: null | string = null;
  let cardId: null | number = null;
  let addressId: null | number = null;

  const supabase = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    currentUserId = user.id;
    const cartIDRes = await supabaseServer
      .from('carts')
      .select('*')
      .eq('uid', user.id)
      .eq('cart_status_id', CART_STATUSES.ACTIVE);

    if (cartIDRes.error) {
      return res.status(500).json({
        message: cartIDRes.error.message,
      });
    }

    if (cartIDRes.data.length === 0) {
      const createCartRes = await supabaseServer
        .from('carts')
        .insert([{ uid: user.id, cart_status_id: 1 }])
        .select();

      if (createCartRes.error) {
        return res.status(500).json({
          message: createCartRes.error.message,
        });
      }

      cartProducts.forEach(async (cartProduct) => {
        const query = await supabaseServer.from('cart_details').insert({
          cart_id: createCartRes.data[0].cart_id,
          price_id: cartProduct.priceId,
          quantity: cartProduct.quantity,
        });

        if (query.error) {
          return res.status(500).json({
            message: query.error.message,
          });
        }
      });

      cardId = createCartRes.data[0].cart_id;
    } else {
      cardId = cartIDRes.data[0].cart_id;
    }

    const addressRes = await supabaseServer.from('addresses').select('*').eq('uid', user.id);

    if (addressRes.error) {
      return res.status(500).json({
        message: addressRes.error.message,
      });
    }
    if (addressRes.data.length === 0 && formValues && formValues.address_detail) {
      const addressInsertRes = await supabaseServer
        .from('addresses')
        .insert({
          address_detail: formValues.address_detail || '',
          uid: user.id || '',
          city: formValues.city || '',
          zip: formValues.zip || '',
          country_id: parseInt(formValues.country_id || '0'),
        })
        .select();

      if (addressInsertRes.error) {
        return res.status(500).json({
          message: addressInsertRes.error.message,
        });
      }

      addressId = addressInsertRes.data[0].address_id;
    } else {
      addressId = addressRes.data[0].address_id;
    }
  }

  // Case: If there is hidden auth user, start save here (coming from payment flow without login)
  if (!user && hiddenAuthUser) {
    const emailCheckRes = await supabaseServer
      .from('users')
      .select('*', { count: 'exact' })
      .eq('email', hiddenAuthUser.email!);

    if (emailCheckRes.error) {
      return res.status(500).json({
        message: emailCheckRes.error.message,
      });
    }

    // not registered user
    if (emailCheckRes.count === 0) {
      const signUpRes = await supabaseServer.auth.signUp({
        email: hiddenAuthUser.email || '',
        password: generatePassword(),
      });
      if (signUpRes.error) {
        return res.status(500).json({
          message: signUpRes.error.message,
        });
      }
      if (!signUpRes.data.user?.id) {
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }
      currentUserId = signUpRes.data.user.id;

      const userRes = await supabaseServer
        .from('users')
        .insert({
          uid: signUpRes.data.user?.id,
          email: hiddenAuthUser.email,
          first_name: hiddenAuthUser.firstName,
          last_name: hiddenAuthUser.lastName,
        })
        .select();

      if (userRes.error) {
        return res.status(500).json({
          message: userRes.error.message,
        });
      }

      const createCartRes = await supabaseServer
        .from('carts')
        .insert([{ uid: userRes.data[0].uid, cart_status_id: 1 }])
        .select();

      if (createCartRes.error) {
        return res.status(500).json({
          message: createCartRes.error.message,
        });
      }

      cardId = createCartRes.data[0].cart_id;

      cartProducts.forEach(async (cartProduct) => {
        const query = await supabaseServer.from('cart_details').insert({
          cart_id: createCartRes.data[0].cart_id,
          price_id: cartProduct.priceId,
          quantity: cartProduct.quantity,
        });

        if (query.error) {
          return res.status(500).json({
            message: query.error.message,
          });
        }
      });
      const addressRes = await supabaseServer
        .from('addresses')
        .insert({
          address_detail: hiddenAuthUser.address_detail || '',
          uid: signUpRes.data.user.id || '',
          city: hiddenAuthUser.city || '',
          zip: hiddenAuthUser.zip || '',
          country_id: parseInt(hiddenAuthUser.country_id || '0'),
        })
        .select();

      if (addressRes.error) {
        return res.status(500).json({
          message: addressRes.error.message,
        });
      }

      addressId = addressRes.data[0].address_id;
      currentUserId = signUpRes.data.user.id;
    }
    //  registered user but not sign in yet
    else {
      currentUserId = emailCheckRes.data[0].uid;

      // address check
      const checkAddress = await supabaseServer
        .from('addresses')
        .select('*')
        .eq('uid', currentUserId);

      if (checkAddress.error) {
        return res.status(500).json({
          message: checkAddress.error.message,
        });
      }

      if (checkAddress.data.length === 0) {
        const addressRes = await supabaseServer
          .from('addresses')
          .insert({
            address_detail: hiddenAuthUser.address_detail || '',
            uid: currentUserId || '',
            city: hiddenAuthUser.city || '',
            zip: hiddenAuthUser.zip || '',
            country_id: parseInt(hiddenAuthUser.country_id || '0'),
          })
          .select();

        if (addressRes.error) {
          return res.status(500).json({
            message: addressRes.error.message,
          });
        }

        addressId = addressRes.data[0].address_id;
      } else {
        addressId = checkAddress.data[0].address_id;
      }

      const checkExistingCart = await supabaseServer
        .from('carts')
        .select('*')
        .eq('uid', currentUserId)
        .eq('cart_status_id', CART_STATUSES.ACTIVE);

      if (checkExistingCart.error) {
        return res.status(500).json({
          message: checkExistingCart.error.message,
        });
      }

      // if there is no active cart, create one
      if (checkExistingCart.data.length === 0) {
        const createCartRes = await supabaseServer
          .from('carts')
          .insert([{ uid: currentUserId, cart_status_id: 1 }])
          .select();

        if (createCartRes.error) {
          return res.status(500).json({
            message: createCartRes.error.message,
          });
        }

        cardId = createCartRes.data[0].cart_id;

        cartProducts.forEach(async (cartProduct) => {
          const query = await supabaseServer.from('cart_details').insert({
            cart_id: createCartRes.data[0].cart_id,
            price_id: cartProduct.priceId,
            quantity: cartProduct.quantity,
          });

          if (query.error) {
            return res.status(500).json({
              message: query.error.message,
            });
          }
        });
      }
      // if there is active cart, add products to it
      else {
        cardId = checkExistingCart.data[0].cart_id;
        const cartDetails = await supabaseServer
          .from('cart_details')
          .select('*')
          .eq('cart_id', checkExistingCart.data[0].cart_id);

        if (cartDetails.error) {
          return res.status(500).json({
            message: cartDetails.error.message,
          });
        }

        cartProducts.forEach(async (cartProduct) => {
          const priceIDsInCartDetails = cartDetails.data.map(
            (cartDetail) => cartDetail.cart_detail_id
          );
          const isExistAlready = priceIDsInCartDetails.includes(cartProduct.priceId);
          if (isExistAlready) {
            return;
          }

          const query = await supabaseServer.from('cart_details').insert({
            cart_id: checkExistingCart.data[0].cart_id,
            price_id: cartProduct.priceId,
            quantity: cartProduct.quantity,
          });

          if (query.error) {
            return res.status(500).json({
              message: query.error.message,
            });
          }
        });
      }
    }
  }

  // const { price, paidPrice, currency, locale, shippingAddress, billingAddress, buyer, basketItems } = req.body;
  const data: Partial<FormInitializeRequest> = {
    paymentGroup: PaymentGroup.LISTING!,
    callbackUrl: process.env.IYZICO_CALLBACK_URL!,
    enabledInstallments: [1],
    ...(requestData as Partial<FormInitializeRequest>),
  };

  // set buyer ip address
  if (data.buyer) {
    const userIp = requestIp.getClientIp(req) || getClientIP(req);
    if (!userIp) {
      console.error('user ip address not found', userIp);
      throw new Error(`user ip address not found: ${userIp}`);
    } else {
      data.buyer.ip = userIp;
    }
  }

  // set conversation id
  const namespace = process.env.CONVERSATION_UUID_NAMESPACE_UUID!;
  console.log('namespace', namespace);
  const uuid = uuidv5('conversation', namespace);
  data.conversationId = uuid;
  console.log('uuid', uuid);

  return iyzipay.checkoutFormInitialize.create(
    data,
    function (err: any, result: FormInitializeResponse) {
      if (err) {
        console.error('create payment request was resulted in error:', err);
        res.status(400).json(result);
      } else {
        // Set cookie
        setCookie(res, IYZICO_LOCAL_STORAGE_TOKEN, result.token, {
          path: PAGES.ORDERS.path || '/',
          maxAge: 3600,
        });

        // console.log("status", OrderStatusEnum.PaymentAwaiting)
        const orderSetResponse = supabaseServer
          .from('orders')
          .insert({
            uid: currentUserId || '',
            cart_id: cardId || 0,
            order_status_id: OrderStatusEnum.PaymentAwaiting,
            payment_provider_response: JSON.stringify(result),
            payment_provider_token: result.token,
            total_shipping_cost: requestData.shippingCost || 0,
            total_price: typeof data.price === 'string' ? parseFloat(data.price) : data.price || 0,
            address_id: addressId || -1,
            payment_collector_id: PaymentCollector.IYZICO,
            delivery_organization_id: DeliveryOrganization.DHL,
            total_tax: 0,
          })

          .select('*');
        // console.log('order set response1: ', orderSetResponse);
        orderSetResponse.then((orderSetRes) => {
          console.log('order set response2: ', orderSetRes);

          if (orderSetRes.error) {
            return res.status(500).json({
              message: orderSetRes.error.message,
            });
          }

          res.status(200).json(result);
        });
      }
    }
  );
}

function getClientIP(req: NextApiRequest): string | undefined {
  let ip;
  if (req.headers['x-forwarded-for'] && isString(req.headers['x-forwarded-for'])) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  return ip;
}

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};
