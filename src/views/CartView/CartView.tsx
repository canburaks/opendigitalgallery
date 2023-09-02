import {
  Body,
  BodyL,
  BodyS,
  Button,
  CartProductList,
  Divider,
  HeadlineS,
  LinkComponent,
  SectionContainer,
} from '@/components';
import { useProductPricesByIDs } from '@/data/hooks';
import { useCartStore } from '@/data/stores';
import React from 'react';
import { useProductsByIDs } from '@/data/hooks/useProductsByIDs';
import { useMediaQuery } from '@mui/material';

export const CartView = () => {
  const store = useCartStore((state) => state.store);
  const isCartEmpty = store && store.length === 0;
  const productIDs = store && store.map((item) => +item.productId);
  const break800 = useMediaQuery('(max-width:800px)');

  const products = useProductsByIDs(
    {
      productIDs: productIDs || [],
      select: ['title', 'product_id', 'handle', 'default_image_alt', 'default_image_url'],
    },
    productIDs && productIDs.length > 0
  );

  const productPrices = useProductPricesByIDs(productIDs || [], Boolean(productIDs));
  const sumPrice =
    store &&
    store.reduce((acc, item) => {
      const priceData = productPrices.data?.find((price) => price.price_id === item.priceId);
      console.log('priceData', priceData?.price);
      return acc + (priceData?.price || 0) * item.quantity;
    }, 0);

  if (products.data?.error) {
    return <div>Something went wrong</div>;
  }

  return (
    <SectionContainer>
      <div className="min-h-[calc(100vh-260px)]">
        {isCartEmpty && (
          <div className="flex flex-col justify-center">
            <HeadlineS className="text-center py-8">Your cart is empty</HeadlineS>
            <LinkComponent className="flex justify-center" href="/">
              <Button text="Continue to shop" />
            </LinkComponent>
          </div>
        )}
        {!isCartEmpty && (
          <div className="py-6">
            <div className="flex justify-between items-center">
              <HeadlineS>Sepetiniz</HeadlineS>
              <LinkComponent className="underline" href="/">
                <BodyS>Continue shopping</BodyS>
                <div className="!border-b-[0.1px] rounded-sm opacity-8 mt-[2px] border-solid border-black" />
              </LinkComponent>
            </div>

            {/* Cart List */}
            <div className="flex w-full gap-4 pt-8 pb-4 ">
              <Body className="flex-1 opacity-6 ml-4">Ürünler</Body>
              <Body className="flex-[4] opacity-6"></Body>
              <Body className="flex-[3] opacity-6 break800:block hidden">Quantity</Body>
              <Body className="flex-1 opacity-6">Total</Body>
            </div>
            <div className="mb-4">
              <Divider direction="horizontal" />
            </div>
            <CartProductList layout={break800 ? 'horizontal' : 'vertical'} />
            <div className="mt-12">
              <Divider direction="horizontal" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <BodyL className="pt-8">Alt Toplam : {sumPrice}</BodyL>
              <BodyS className="">Vergi dahildir ve kargo ücretsizdir.</BodyS>
              <LinkComponent href="/checkouts">
                <Button text="Ödeme" className="w-80 mt-4" />
              </LinkComponent>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
