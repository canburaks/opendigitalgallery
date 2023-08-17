import React, { useEffect } from 'react';
import {
  ItemTransaction,
  OrderQueryResponse,
  OrderResponseType,
  Product,
  TransactionItemProduct,
} from '@/types';
import { useAddresses, useCountries, useProductsByIDs, usePublicUser } from '@/data/hooks';
import {
  Body,
  BodyS,
  BodyXS,
  Headline,
  Headline2XS,
  HeadlineXS,
  SectionContainer,
} from '@/components';
import { useCartStore } from '@/data/stores';
import { useCartDetails } from '@/data/hooks/useCartDetails';
import _ from 'lodash';
import { useProductOptions } from '@/data/hooks/useProductOptions';
import { printAddress } from '@/utils';

type Props = {
  data: OrderQueryResponse;
  orderData?: OrderResponseType;
};

export const OrderSuccess = ({ data: paymentData, orderData }: Props) => {
  const setStore = useCartStore((state) => state.setStore);

  useEffect(() => {
    setStore([]);
    localStorage.setItem('cart', 'null');
  }, [setStore]);

  // Payment data
  const transactionItems = Array.isArray(paymentData?.itemTransactions)
    ? paymentData?.itemTransactions
    : [];
  let lineItemIds: string[] | number[] = transactionItems.map(
    (it: ItemTransaction) => it.itemId.split('-')[1]
  );
  lineItemIds = lineItemIds.map((e) => parseInt(e));

  // Products data regarding the transaction items
  const { data } = useProductsByIDs({ limit: 50, productIDs: lineItemIds }, !!lineItemIds?.length);
  const products: TransactionItemProduct[] = lineItemIds.map((pid: number) => {
    const product = data?.data?.find((p: Product) => p.product_id === pid) || {};
    const transactionItem =
      transactionItems.find((it: ItemTransaction) => it.itemId.split('-')[1] === pid.toString()) ||
      {};
    return { ...transactionItem, ...product };
  });

  const user = usePublicUser(
    orderData && orderData.data && orderData?.data[0].uid,
    Boolean(orderData && orderData.data && orderData?.data[0].uid)
  );

  const address = useAddresses(user.data?.uid, Boolean(user.data?.uid));
  console.log('address', address);

  const cartDetailsRes = useCartDetails(
    orderData && orderData.data && orderData?.data[0].cart_id,
    Boolean(orderData && orderData.data && orderData?.data[0].cart_id)
  );
  const cartDetails = cartDetailsRes.data?.data;
  const cartDetailsMapByProductId = _.keyBy(cartDetails, 'prices.product_id');

  const productOptionsRes = useProductOptions();
  const productOptions = productOptionsRes.data;
  const productOptionsMap = _.keyBy(productOptions, 'product_option_id');

  const countries = useCountries({
    select: ['name', 'country_id'],
  });
  const countriesMap = _.keyBy(countries.data?.data, 'country_id');
  console.log('countriesMap', countriesMap);

  // Date
  const orderDateObject = new Date(paymentData?.systemTime);

  return (
    <SectionContainer>
      <div className="text-center">
        <Headline>Sipariş Alındı.</Headline>
        <Headline2XS className="text-greenMui-600 font-medium mt-24">
          Teşekkür ederiz. Siparişiniz alınmıştır.
        </Headline2XS>
      </div>

      {/* Info Box */}
      <div className="grid grid-cols-6 bg-grayMui-100 p-10 gap-8 mt-10">
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">Sipariş numarası</BodyS>
          <BodyS className="font-semibold text-grayMui-800">{paymentData.token}</BodyS>
        </div>
        <div className="flex flex-col gap-2">
          <BodyS className="">Tarih</BodyS>
          <time
            dateTime={orderDateObject.toISOString().split('T')[0]}
            className="font-medium text-gray-900"
          >
            <BodyS className="font-semibold text-grayMui-800">
              {orderDateObject.toString().split(' ').slice(0, 4).join(' ')}
            </BodyS>
          </time>{' '}
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">E posta</BodyS>
          <BodyS className="font-semibold text-grayMui-800">{user.data?.email}</BodyS>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">Ödeme Yöntemi</BodyS>
          <BodyS className="font-semibold text-grayMui-800">
            {paymentData.cardType || 'Kredi Kartı'}
          </BodyS>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">Toplam</BodyS>
          <BodyS className="font-semibold text-grayMui-800">
            {paymentData.price} {paymentData.currency}
          </BodyS>
        </div>
      </div>

      {/* Order Details */}
      <div>
        <HeadlineXS className="my-10">Sipariş Detayları</HeadlineXS>
        <div className="border-1 border-solid border-grayMui-300 p-5 flex flex-col gap-6 ">
          {products.map((item) => {
            const cartDetail =
              item.product_id &&
              cartDetailsMapByProductId[item.product_id] &&
              cartDetailsMapByProductId[item.product_id];
            console.log('item', item);
            const optionDetail =
              cartDetail &&
              cartDetail.prices &&
              productOptionsMap[cartDetail && cartDetail.prices?.product_option_id];

            return (
              <div key={item.itemId} className="flex justify-between ">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <BodyS>{item.title}</BodyS>
                    <BodyXS className="bg-grayMui-500 w-8 h-5 flex justify-center items-center rounded-full text-white font-semibold">
                      x {cartDetail && cartDetail.quantity}
                    </BodyXS>
                  </div>
                  {item.product_id && <BodyS>Ebat: {optionDetail && optionDetail.value}</BodyS>}
                </div>
                <div>
                  <Body>
                    {(item.price || 0) * ((cartDetail && cartDetail.quantity) || 0)}{' '}
                    {paymentData.currency}
                  </Body>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-grayMui-100 border-b-1 border-t-0 border-l-1 border-r-1 border-solid border-grayMui-300 p-5 flex flex-col gap-4">
          <div className="flex justify-between">
            <Body className="font-medium">ARA TOPLAM</Body>
            <Body>
              {paymentData.price} {paymentData.currency}
            </Body>
          </div>
          <div className="flex justify-between">
            <Body className="font-medium">GÖNDERİM</Body>
            <Body>Henüz data yok {paymentData.currency}</Body>
          </div>
          <div className="flex justify-between">
            <Body className="font-medium">ÖDEME YÖNTEMi</Body>
            <Body>Kredi Kartı</Body>
          </div>
        </div>
        <HeadlineXS className="my-5">Address</HeadlineXS>
        <Body>
          {address.data &&
            address.data.data &&
            printAddress(address.data.data[0], true, countriesMap as any)}
        </Body>
      </div>
    </SectionContainer>
  );
};
