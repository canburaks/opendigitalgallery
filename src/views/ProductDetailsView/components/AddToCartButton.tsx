import React, { MouseEvent, useMemo } from 'react';
import { useCartStore } from '@/data/stores';
import { CartProduct } from '@/types';
import { Button } from '@/components';
import { NO_FRAME_PRODUCT, ProductType } from '@/constants';

export function AddToCartButton({
  productTitle,
  productId,
  productOptionId,
  productImageUrl,
  frameId,
  frameTitle,
  frameImageUrl,
  text,
  priceId,
  productPrice,
  framePrice,
}: {
  productTitle: string;
  productId: number;
  productOptionId: number;
  productImageUrl: string;
  frameId: number;
  frameTitle: string;
  frameImageUrl: string;
  text: string;
  priceId: number | undefined;
  productPrice: number;
  framePrice: number;
}) {
  const { addToCart /*removeFromCart*/ } = useCartStore();

  // Cart Product to either add or remove from cart
  const cartProduct: CartProduct = useMemo(
    () => ({
      productTitle: productTitle,
      productId: productId!,
      productOptionId: productOptionId!,
      productImageUrl: productImageUrl,
      productType: ProductType.POSTER,
      frameId: frameId!,
      quantity: 1,
      priceId: priceId || -1,
      productPrice: productPrice,
      price: productPrice,
    }),
    [productTitle, productId, productOptionId, productImageUrl, frameId, priceId, productPrice]
  );
  const cartFrame: CartProduct = useMemo(
    () => ({
      productTitle: frameTitle,
      productId: frameId!,
      productOptionId: productOptionId!,
      productImageUrl: frameImageUrl,
      productType: ProductType.FRAME,
      frameId: frameId!,
      quantity: 1,
      priceId: priceId || -1,
      framePrice,
      price: framePrice,
    }),
    [frameTitle, frameId, productOptionId, frameImageUrl, priceId, framePrice]
  );

  // Increase the quantity of the product in the cart
  function addToCartMutation(e: MouseEvent): void {
    e.preventDefault();
    if (frameId !== NO_FRAME_PRODUCT.product_id) {
      addToCart(cartFrame, false);
      addToCart(cartProduct, true);
    } else {
      addToCart(cartProduct, true);
    }
  }

  // Decrease the quantity of the product in the cart
  // function removeFromProductMutation(e: MouseEvent): void {
  //   e.preventDefault();
  //   removeFromCart(cartProduct);
  // }

  // ---------------------------------------------------------------------------------
  return (
    <div className="sm:flex-col1 mt-10 flex">
      <Button
        onClick={addToCartMutation}
        type="submit"
        className="cursor-pointer flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
      >
        {text}
      </Button>
    </div>
  );
}
