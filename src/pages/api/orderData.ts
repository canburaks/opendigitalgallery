// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AddressResponseSuccess, getAddress } from '@/data/services/getAddress';
import { CartDetailsResponseSuccess, getCartDetails } from '@/data/services/getCartDetails';
import { OrdeByTokenResponseSuccess, getOrderByToken } from '@/data/services/getOrderByToken';
import {
  ProductsByPriceIDsSuccess,
  getProductsByPriceIDs,
} from '@/data/services/getProductsByPriceIDs';
import { UserReponseSuccess, getUser } from '@/data/services/getUser';
import { OrderResponseStatusEnum } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface OrderData {
  orderDetails: OrdeByTokenResponseSuccess | null;
  status: OrderResponseStatusEnum | null;
  orderDate: Date | null;
  cartDetails: CartDetailsResponseSuccess | null;
  priceProductDetails: ProductsByPriceIDsSuccess | null;
  user: UserReponseSuccess | null;
  address: AddressResponseSuccess | null;
  paymentToken: string | null;
  cardType: string | null;
  price: number | null;
  currency: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bodyData = req.body;
  const token = bodyData.token;
  const method = req.method;

  const responseData: OrderData = {
    status: null,
    orderDetails: null,
    cartDetails: null,
    priceProductDetails: null,
    user: null,
    address: null,
    orderDate: null,
    paymentToken: null,
    cardType: 'Kredi Kartı',
    price: null,
    currency: null,
  };

  if (method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  if (!token) {
    return res.status(400).json({
      message: 'Token is required',
    });
  }

  // * Data: Order
  const { data: orderData, error: orderError } = await getOrderByToken(token);
  if (orderError) {
    return res.status(500).json({
      message: 'Error while getting order data',
    });
  }

  // * Data: Status
  const paymentResponseJSON = orderData[0].payment_provider_response;
  const paymentData =
    typeof paymentResponseJSON === 'string' ? JSON.parse(paymentResponseJSON) : paymentResponseJSON;
  const paymentStatus = paymentData.status;
  const orderDate = new Date(paymentData?.systemTime);
  const paymentToken = paymentData?.token;
  const price = paymentData?.price;
  const currency = paymentData?.currency;
  console.log('paymentData', paymentData);

  // * Data: Cart Details
  const cardID = orderData[0].cart_id;
  const { data: cartData, error: cartError } = await getCartDetails(cardID);
  if (cartError) {
    return res.status(500).json({
      message: 'Error while getting cart data',
    });
  }

  // * Data Products
  const priceIDs = cartData.map((item) => item.price_id);
  const { data: productData, error: productError } = await getProductsByPriceIDs(priceIDs);
  if (productError) {
    return res.status(500).json({
      message: 'Error while getting product data',
    });
  }

  // * Data: User
  const userID = orderData[0].uid;
  const { data: userData, error: userError } = await getUser(userID);
  if (userError) {
    return res.status(500).json({
      message: 'Error while getting user data',
    });
  }

  // * Data: Address
  const { data: addressData, error: addressError } = await getAddress(userID);
  if (addressError) {
    return res.status(500).json({
      message: 'Error while getting address data',
    });
  }

  // Populate Response
  responseData.status = paymentStatus;
  responseData.orderDetails = orderData;
  responseData.cartDetails = cartData;
  responseData.priceProductDetails = productData;
  responseData.user = userData;
  responseData.address = addressData;
  responseData.orderDate = orderDate;
  responseData.paymentToken = paymentToken;
  responseData.price = price;
  responseData.currency = currency;

  res.status(200).json(responseData);
}
