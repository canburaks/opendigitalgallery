import { Grow, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BodyS, LinkComponent } from '../Atoms';
import CheckIcon from '@mui/icons-material/Check';
import { Button as MyButton } from '../Atoms';
import { useCartStore } from '@/data/stores';
import cx from 'classnames';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import { useProductOptions } from '@/data/hooks/useProductOptions';
import { useProduct } from '@/data/hooks/useProduct';

export const CartPopup = () => {
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  const { data: productOptions } = useProductOptions();
  const { lastAddedProduct, removeLastAddedProduct, store } = useCartStore();

  const product = useProduct(
    lastAddedProduct?.productId || '',
    Boolean(lastAddedProduct?.productId)
  );

  useEffect(() => {
    const routeChangeHandler = () => {
      setShowCart(false);
    };
    router.events.on('routeChangeStart', routeChangeHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeHandler);
    };
  }, [router.events]);

  useEffect(() => {
    if (lastAddedProduct) {
      setShowCart(true);
    }
  }, [lastAddedProduct]);

  return (
    <Grow style={{ transformOrigin: 'top' }} in={showCart}>
      <div
        className={cx(
          'fixed z-[9999] top-[50px] p-8 rounded-sm right-10 w-90 shadow-xl bg-white flex flex-col items-center justify-center overflow-hidden '
        )}
      >
        <div className="flex flex-row justify-between w-full">
          <BodyS className="flex items-center">
            <CheckIcon className="mr-2" fontSize="small" />
            Ürün sepetinize eklendi.
          </BodyS>
          <IconButton
            className=""
            onClick={() => {
              setShowCart(false);
              removeLastAddedProduct();
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        {product.data && product.data.data && (
          <div className="flex w-full flex-col">
            <div className="flex gap-4">
              <img
                className="w-30"
                src={product.data?.data[0].default_image_url || ''}
                alt={product.data?.data[0].default_image_alt || ''}
              />
              <div className="flex flex-col gap-1">
                <BodyS className="mt-4">{product.data?.data[0].title}</BodyS>
                <BodyS>
                  Size:
                  {
                    productOptions?.find(
                      (item) => item.product_option_id === lastAddedProduct?.productOptionId
                    )?.value
                  }
                </BodyS>
              </div>
            </div>
            <LinkComponent href="/checkouts">
              <MyButton text="Ödeme" className="w-full" />
            </LinkComponent>
            <LinkComponent
              href="/cart"
              className="py-[10px] text-center border-2 border-black border-solid mt-2 "
            >
              Sepete Git {store.length > 0 ? `(${store.length})` : ''}
            </LinkComponent>
          </div>
        )}
      </div>
    </Grow>
  );
};
