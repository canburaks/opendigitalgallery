import { IYZICO_LOCAL_STORAGE_TOKEN } from '@/constants';
import {
  CART_STATUSES,
  OrderQueryApiResponse,
  OrderResponseStatusEnum,
  OrderStatusEnum,
} from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { iyzipay } from '@/data/clients/iyzicoServer';
import { supabaseServer } from '@/data/clients/supabaseServer';

export default function handler(req: NextApiRequest, res: NextApiResponse<OrderQueryApiResponse>) {
  const bodyData = JSON.parse(req.body);
  const supabase = supabaseServer;
  const token = bodyData.token;

  if (!token) {
    res.status(400).json({ message: `${IYZICO_LOCAL_STORAGE_TOKEN} not found: ${token}` });
  }

  const iyzicoHandler = async (err: any, result: OrderQueryApiResponse) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    // Update Order Table
    const orderUpdateRes = await supabase
      .from('orders')
      .update({
        payment_provider_response: result,
        order_status_id:
          result.status === OrderResponseStatusEnum.SUCCESS
            ? OrderStatusEnum.Ordered
            : OrderStatusEnum.UnsuccessfulPayment,
      })
      .eq('payment_provider_token', token)
      .select();
    if (orderUpdateRes.error) {
      return res.status(500).json({ message: orderUpdateRes.error.message });
    }

    // Update Cart
    if (result.status === OrderResponseStatusEnum.SUCCESS) {
      const cartRes = await supabase
        .from('carts')
        .update({
          cart_status_id: CART_STATUSES.ORDERED,
        })
        .eq('cart_id', orderUpdateRes.data[0].cart_id)
        .select();

      if (cartRes.error) {
        return res.status(500).json({ message: cartRes.error.message });
      }
    }
  };

  return iyzipay.checkoutForm.retrieve({ token }, iyzicoHandler);
}
