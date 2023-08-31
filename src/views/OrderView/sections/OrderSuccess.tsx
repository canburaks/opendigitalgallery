import React, { useEffect } from 'react';
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
import { printAddress } from '@/utils';
import { OrderData } from '@/pages/api/orderData';

type Props = {
  orderData?: OrderData;
};

export const OrderSuccess = ({ orderData }: Props) => {
  const setStore = useCartStore((state) => state.setStore);

  useEffect(() => {
    setStore([]);
    localStorage.setItem('cart', 'null');
  }, [setStore]);

  const address = orderData?.address;
  const paymentToken = orderData?.paymentToken;
  const orderDate = orderData?.orderDate && new Date(orderData?.orderDate);
  const user = orderData?.user && orderData?.user[0];

  console.log('orderData', orderData);

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
          <BodyS className="font-semibold text-grayMui-800">{paymentToken}</BodyS>
        </div>
        <div className="flex flex-col gap-2">
          <BodyS className="">Tarih</BodyS>
          {orderDate && (
            <time
              dateTime={orderDate && orderDate.toISOString().split('T')[0]}
              className="font-medium text-gray-900"
            >
              <BodyS className="font-semibold text-grayMui-800">
                {orderDate.toString().split(' ').slice(0, 4).join(' ')}
              </BodyS>
            </time>
          )}
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">E posta</BodyS>
          <BodyS className="font-semibold text-grayMui-800">{user?.email}</BodyS>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">Ödeme Yöntemi</BodyS>
          <BodyS className="font-semibold text-grayMui-800">
            {orderData?.cardType || 'Kredi Kartı'}
          </BodyS>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <BodyS className="">Toplam</BodyS>
          <BodyS className="font-semibold text-grayMui-800">
            {orderData?.price} {orderData?.currency}
          </BodyS>
        </div>
      </div>

      {/* Order Details */}
      <div>
        <HeadlineXS className="my-10">Sipariş Detayları</HeadlineXS>
        <div className="border-1 border-solid border-grayMui-300 p-5 flex flex-col gap-6 ">
          {orderData?.cartDetails?.map((item) => {
            const priceProductData = orderData.priceProductDetails?.find(
              (item) => item.product_id === item.product_id
            );

            const product = priceProductData?.products;
            const option = priceProductData?.product_options;

            if (!product) return null;

            return (
              <div key={product?.product_id} className="flex justify-between ">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <BodyS>{product?.title}</BodyS>
                    <BodyXS className="bg-grayMui-500 w-8 h-5 flex justify-center items-center rounded-full text-white font-semibold">
                      x {item.quantity}
                    </BodyXS>
                  </div>
                  {product?.product_id && <BodyS>Ebat: {option && option.value}</BodyS>}
                </div>
                <div>
                  <Body>
                    {(priceProductData?.price || 0) * (item.quantity || 0)}{' '}
                    {priceProductData?.currency}
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
              {orderData?.price} {orderData?.currency}
            </Body>
          </div>
          <div className="flex justify-between">
            <Body className="font-medium">GÖNDERİM</Body>
            <Body>Henüz data yok {orderData?.currency}</Body>
          </div>
          <div className="flex justify-between">
            <Body className="font-medium">ÖDEME YÖNTEMi</Body>
            <Body>Kredi Kartı</Body>
          </div>
        </div>
        <HeadlineXS className="my-5">Address</HeadlineXS>
        <Body>{address && printAddress(address[0], true)}</Body>
      </div>
    </SectionContainer>
  );
};
