import { Body, Divider, OrderProductCard } from '@/components';
import { OrderQueryResponse, TransactionItemProduct } from '@/types';
import React, { FC } from 'react';

interface OrderCartListProps {
  products: TransactionItemProduct[];
  orderData: OrderQueryResponse;
}

export const OrderCartList: FC<OrderCartListProps> = ({ products, orderData }) => {
  return (
    <div>
      <div className="flex w-full gap-4 pt-8 pb-4 ">
        <Body className="flex-1 opacity-6 ml-4">Ürünler</Body>
        <Body className="flex-[4] opacity-6"></Body>
        <Body className="flex-[3] opacity-6 break800:block hidden">Quantity</Body>
        <Body className="flex-1 opacity-6">Total</Body>
      </div>
      <div className="mb-4">
        <Divider direction="horizontal" />
      </div>
      <div className=" flex flex-col gap-4">
        {products.map((item) => {
          return (
            <OrderProductCard
              layout="vertical"
              {...item}
              quantity={1}
              key={item.product_id}
              currency={orderData.currency}
              price={item.price}
            />
          );
        })}
      </div>
      <div className="mt-12">
        <Divider direction="horizontal" />
      </div>
    </div>
  );
};
