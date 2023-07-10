import { IYZICO_LOCAL_STORAGE_TOKEN } from '@/constants';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderQueryApiResponse, OrderResponseStatusEnum, OrderStatusEnum } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { iyzipay } from '@/data/iyzicoServer';
// import { loggerServer as logger } from '@/utils/logger/server';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function handler(req: NextApiRequest, res: NextApiResponse<OrderQueryApiResponse>) {
  const bodyData = JSON.parse(req.body);
  const supabase = createServerSupabaseClient({ req, res });

  const token = bodyData.token;

  if (!token) {
    res.status(400).json({ message: `${IYZICO_LOCAL_STORAGE_TOKEN} not found: ${token}` });
  }

  return iyzipay.checkoutForm.retrieve(
    {
      token,
    },
    function (err: any, result: OrderQueryApiResponse) {
      // console.log(`order query result: ${JSON.stringify(result)}`);
      if (err) {
        console.error({ error: err });
        res.status(500).json({ message: err.message });
      } else {
        const orderUpdate = supabase
          .from('orders')
          .update({ 
            payment_provider_response: result,
            order_status_id: result.status === OrderResponseStatusEnum.SUCCESS ? OrderStatusEnum.Ordered : OrderStatusEnum.UnsuccessfulPayment,
          })
          .eq('payment_provider_token', token)
          .select();
        // console.log(`order update result: ${JSON.stringify(orderUpdate)}`);
        orderUpdate.then((orderUpdateResult) => {
          console.log(`order update result: ${JSON.stringify(orderUpdateResult)}`);
          return res.status(200).json(result);
        })
      }
    }
  );
}
