import { CartProductList, Divider, HeadlineXS } from '@/components';
import React from 'react';

export const CartListSection = () => {
  return (
    <div>
      <HeadlineXS className="pb-2">Orders</HeadlineXS>
      <Divider direction="horizontal" />
      <CartProductList />
    </div>
  );
};
