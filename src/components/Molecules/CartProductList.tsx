import { usePricesByIDs } from '@/data/hooks';
import { useProductOptions } from '@/data/hooks/useProductOptions';
import { useCartStore } from '@/data/stores';
import React, { FC } from 'react';
import { BodyS, Counter, ImageWithFallback } from '../Atoms';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import cx from 'classnames';
import { useProductsByIDs } from '@/data/hooks';
import { PRODUCT_IMAGE_RATIO } from '@/constants';

interface CartProductListProps {
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const CartProductList: FC<CartProductListProps> = ({ layout = 'horizontal', className }) => {
  const cartStore = useCartStore((state) => state);
  const priceIDs = cartStore?.store?.map((item) => +item.priceId);
  const productIDs = cartStore?.store?.map((item) => +item.productId);
  const productOptions = useProductOptions();
  const productPrices = usePricesByIDs(priceIDs || [], Boolean(priceIDs));
  const { data: products } = useProductsByIDs({
    productIDs: productIDs || [],
  });

  return (
    <div className={cx('flex flex-col gap-8', className)}>
      {cartStore &&
        cartStore?.store?.length > 0 &&
        cartStore.store.map((product) => {
          const storeItem = cartStore.store.find(
            (storeItem) => storeItem.productId === product.productId
          );
          const productPriceOptions = productPrices?.data?.find(
            (priceOptions) => priceOptions.product_id === product.productId
          );
          const option = productOptions.data?.find(
            (optionItem) => optionItem.product_option_id === productPriceOptions?.product_option_id
          );

          const priceData = productPrices.data?.find(
            (price) => price.price_id === productPriceOptions?.price_id
          );
          const productItem = products?.data?.find(
            (productI) => productI.product_id === product.productId
          );

          if (!priceData || !storeItem?.quantity) {
            return null;
          }

          return (
            <div key={`${product.productId}-${product.priceId}`}>
              <div className="flex gap-8 items-center w-full">
                <ImageWithFallback
                  src={productItem?.default_image_url || ''}
                  alt={productItem?.default_image_alt || ''}
                  className="flex-[1]"
                  width={96 * PRODUCT_IMAGE_RATIO}
                  height={96}
                />
                <div className="flex flex-col justify-between flex-[4]">
                  <BodyS className="break800:text-lg">{productItem?.title}</BodyS>
                  <BodyS>Size: {option?.value}</BodyS>
                </div>
                <div
                  className={cx('flex-[3] hidden', {
                    ' !flex': layout === 'vertical',
                  })}
                >
                  <Counter
                    quantity={storeItem?.quantity || 0}
                    onIncrease={() => {
                      if (storeItem) {
                        cartStore.addToCart(product);
                      }
                    }}
                    onReduce={() => {
                      if (storeItem) {
                        cartStore.removeFromCart(product);
                      }
                    }}
                  />
                  <IconButton
                    className="ml-2"
                    onClick={() => {
                      if (storeItem) {
                        cartStore.removeCartPermanently(product);
                      }
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </div>
                <BodyS
                  className={cx('flex-[1] ', {
                    'text-lg': layout === 'horizontal',
                  })}
                >
                  {priceData?.price * storeItem?.quantity} {priceData?.currency}
                </BodyS>
              </div>
              <div
                className={cx('flex-[3] flex justify-end', {
                  hidden: layout === 'vertical',
                })}
              >
                <Counter
                  quantity={storeItem?.quantity || 0}
                  onIncrease={() => {
                    if (storeItem) {
                      cartStore.addToCart(storeItem);
                    }
                  }}
                  onReduce={() => {
                    if (storeItem) {
                      cartStore.removeFromCart(storeItem);
                    }
                  }}
                />
                <IconButton
                  className="ml-2"
                  onClick={() => {
                    if (storeItem) {
                      cartStore.removeCartPermanently(storeItem);
                    }
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};
