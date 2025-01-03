// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IYZICO_LOCAL_STORAGE_TOKEN, PAGES } from '@/constants';
import { FormInitializeRequest, FormInitializeResponse, PaymentGroup } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { isString } from 'lodash';
import { iyzipay } from '@/data/iyzicoServer';
import { serialize, CookieSerializeOptions } from 'cookie';
import { loggerServer as logger } from '@/utils/logger/server';
import { v5 as uuidv5 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormInitializeResponse>) {
  const bodyData = JSON.parse(req.body);

  // const { price, paidPrice, currency, locale, shippingAddress, billingAddress, buyer, basketItems } = req.body;
  const data: Partial<FormInitializeRequest> = {
    paymentGroup: PaymentGroup.LISTING!,
    callbackUrl: process.env.IYZICO_CALLBACK_URL!,
    enabledInstallments: [1],
    ...(bodyData as Partial<FormInitializeRequest>),
  };

  // set buyer ip address
  if (data.buyer) {
    const userIp = requestIp.getClientIp(req) || getClientIP(req);
    if (!userIp){
      console.error('user ip address not found', userIp);
      throw new Error(`user ip address not found: ${userIp}`)
    } else {
      data.buyer.ip = userIp;
    }
  }

  // set conversation id
  const namespace = process.env.CONVERSATION_UUID_NAMESPACE_UUID!;
  const uuid = uuidv5('conversation', namespace);
  data.conversationId = uuid;



  return iyzipay.checkoutFormInitialize.create(
    data,
    function (err: any, result: FormInitializeResponse) {
      if (err) {
        logger.error('create payment request was resulted in error:', err);
        res.status(400).json(result);
      } else {
        // Set cookie
        setCookie(res, IYZICO_LOCAL_STORAGE_TOKEN, result.token, {
          path: PAGES.ORDERS.path || '/',
          maxAge: 3600,
        });
        res.status(200).json(result);
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

// const demoData = {
//   locale: LocaleEnum.TR, // eslint-disable-line
//   conversationId: '123456789',
//   price: '0.8',
//   paidPrice: '1',
//   currency: iyzico.CURRENCY.TRY, // eslint-disable-line
//   basketId: 'B67832',
//   paymentGroup: iyzico.PAYMENT_GROUP.LISTING, // eslint-disable-line
//   callbackUrl: process.env.IYZICO_CALLBACK_URL,
//   enabledInstallments: [2, 3, 6, 9],
//   buyer: {
//     id: 'BY789',
//     name: 'John',
//     surname: 'Doe',
//     gsmNumber: '+905350000000',
//     email: 'email@email.com',
//     identityNumber: '74300864791',
//     lastLoginDate: '2015-10-05 12:43:35',
//     registrationDate: '2013-04-21 15:12:09',
//     registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//     ip: '85.34.78.112',
//     city: 'Istanbul',
//     country: 'Turkey',
//     zipCode: '34732',
//   },
//   shippingAddress: {
//     contactName: 'Jane Doe',
//     city: 'Istanbul',
//     country: 'Turkey',
//     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//     zipCode: '34742',
//   },
//   billingAddress: {
//     contactName: 'Jane Doe',
//     city: 'Istanbul',
//     country: 'Turkey',
//     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//     zipCode: '34742',
//   },
//   basketItems: [
//     {
//       id: 'BI101',
//       name: 'Binocular',
//       category1: 'Collectibles',
//       category2: 'Accessories',
//       itemType: iyzico.BASKET_ITEM_TYPE.PHYSICAL, // eslint-disable-line
//       price: '0.3',
//     },
//     {
//       id: 'BI102',
//       name: 'Game code',
//       category1: 'Game',
//       category2: 'Online Game Items',
//       itemType: require('iyzipay').BASKET_ITEM_TYPE.VIRTUAL, // eslint-disable-line
//       price: '0.5',
//     },
//   ],
// };
