import { Body, BodyS, HeadlineS } from '@/components';
import { OrderQueryResponse } from '@/types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { FC } from 'react';

interface PaymentSuccessBoxProps {
  orderData: OrderQueryResponse;
  orderDateObject: Date;
}

export const PaymentSuccessBox: FC<PaymentSuccessBoxProps> = ({ orderData, orderDateObject }) => {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <CheckCircleOutlineIcon className="text-[60px] text-green" />
      <HeadlineS className="text-green">Payment Successful</HeadlineS>
      <Body className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris
      </Body>
      <BodyS className="text-sm text-left text-gray-600">Order No: {orderData.token} </BodyS>
      <BodyS className="text-sm text-left text-gray-600">
        Order placed at:{' '}
        <time dateTime={orderDateObject.toISOString().split('T')[0]}>
          {orderDateObject.toString().split(' ').slice(0, 4).join(' ')}
        </time>
      </BodyS>
    </div>
  );
};
