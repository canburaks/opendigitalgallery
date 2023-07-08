import { IYZICO_LOCAL_STORAGE_TOKEN } from '@/constants';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderQueryApiResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { iyzipay } from '@/data/iyzicoServer';
import { loggerServer as logger } from '@/utils/logger/server';

export default function handler(req: NextApiRequest, res: NextApiResponse<OrderQueryApiResponse>) {
  const bodyData = JSON.parse(req.body);

  const token = bodyData.token;

  if (!token) {
    res.status(400).json({ message: `${IYZICO_LOCAL_STORAGE_TOKEN} not found: ${token}` });
  }

  return iyzipay.checkoutForm.retrieve(
    {
      token,
    },
    function (err: any, result: OrderQueryApiResponse) {
      logger.info(`order query result: ${JSON.stringify(result)}`);
      if (err) {
        logger.error({ error: err });
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json(result);
      }
    }
  );
}
