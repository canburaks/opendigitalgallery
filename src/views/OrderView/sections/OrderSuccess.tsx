import React from 'react';
import { ItemTransaction, OrderQueryResponse, Product, TransactionItemProduct } from '@/types';
import { useProductsByIDs } from '@/data/hooks';
import { SectionContainer } from '@/components';
import { OrderCartList } from '../components/OrderCartList';
import { PaymentSuccessBox } from '../components/PaymentSuccessBox';
import { BillingBox } from '../components/BillingBox';

type Props = {
  data: OrderQueryResponse;
};

export const OrderSuccess = (props: Props) => {
  // Order data
  const orderData = props.data;
  const transactionItems = Array.isArray(orderData?.itemTransactions)
    ? orderData?.itemTransactions
    : [];
  let lineItemIds: string[] | number[] = transactionItems.map(
    (it: ItemTransaction) => it.itemId.split('-')[1]
  );
  lineItemIds = lineItemIds.map((e) => parseInt(e));

  // Products data regarding the transaction items
  const { data } = useProductsByIDs(
    { limit: 50, productIDs: lineItemIds },
    lineItemIds?.length > 0
  );
  const products: TransactionItemProduct[] = lineItemIds.map((pid: number) => {
    const product = data?.data?.find((p: Product) => p.product_id === pid) || {};
    const transactionItem =
      transactionItems.find((it: ItemTransaction) => it.itemId.split('-')[1] === pid.toString()) ||
      {};
    return { ...transactionItem, ...product };
  });

  // Date
  const orderDateObject = new Date(orderData?.systemTime);
  return (
    <SectionContainer>
      <div className="grid gap-16 lg:grid-cols-2 mb-8">
        {/* Product Headline */}
        <PaymentSuccessBox orderData={orderData} orderDateObject={orderDateObject} />

        {/* Product List */}
        <OrderCartList products={products} orderData={orderData} />
      </div>

      {/* Billing */}
      <BillingBox orderData={orderData} />
    </SectionContainer>
  );
};
