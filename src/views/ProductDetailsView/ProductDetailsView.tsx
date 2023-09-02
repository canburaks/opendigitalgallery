import { useRouter } from 'next/router';
import React, { useState, MouseEvent, useMemo } from 'react';
import { ImageBox } from './components';
import { Body, BodyL, BodyS, Button, ErrorText, HeadlineXS, SectionContainer } from '@/components';
import { useCartStore } from '@/data/stores';
import { useProductDetailByHandle } from '@/data/hooks/useProductDetailByHandle';
import { useProductOptions } from '@/data/hooks/useProductOptions';
import { useFrames } from '@/data/hooks';
import cx from 'classnames';
import { CartProduct } from '@/types';

// Note Sizes: Every poster doen't have all size options because of aspect ratio. So we need to check in prices to get available options

export const ProductDetailsView: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { query } = useRouter();
  const productHandle = query?.slug as string;
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [selectedFrameId, setSelectedFrameId] = React.useState<number | null>(null);
  const [err, setErr] = useState('');

  // Data: Product
  const { data: product } = useProductDetailByHandle(productHandle);
  const images = product?.images || [];
  const prices = useMemo(() => product?.prices || [], [product?.prices]);
  const availableOptionsId = prices.map((price) => price.product_option_id);

  // Data: All Product Options (Sizes)
  const { data: allOptions } = useProductOptions();
  const availableOptions = useMemo(
    () => allOptions?.filter((option) => availableOptionsId.includes(option.product_option_id)),
    [allOptions, availableOptionsId]
  );

  // Data: Frames
  const { data: frames } = useFrames();
  const selectedFrame = useMemo(
    () => frames?.find((frame) => frame.product_id === selectedFrameId),
    [frames, selectedFrameId]
  );

  // Prepare Data Format For Cart
  const productForCart = useMemo<CartProduct | undefined>(() => {
    const priceData = prices?.find((price) => price.product_option_id === selectedOptionId);
    if (priceData && product?.product_id) {
      return {
        productId: product?.product_id,
        quantity: 1,
        priceId: priceData?.price_id,
      };
    }
  }, [prices, product?.product_id, selectedOptionId]);

  const frameForCart = useMemo<CartProduct | undefined>(() => {
    const priceData = selectedFrame?.prices?.find(
      (price) => price.product_option_id === selectedOptionId
    );
    if (selectedFrame?.product_id && priceData?.price_id) {
      return {
        productId: selectedFrame?.product_id,
        quantity: 1,
        priceId: priceData?.price_id,
      };
    }
  }, [selectedFrame, selectedOptionId]);

  function addToCartMutation(e: MouseEvent): void {
    e.preventDefault();

    if (!selectedOptionId) {
      return setErr('Please select a size');
    }

    if (!productForCart && !frameForCart) {
      return setErr('Something went wrong, please try again later.');
    }

    if (productForCart && !frameForCart) {
      return addToCart(productForCart, true);
    }

    if (productForCart && frameForCart) {
      addToCart(productForCart, true);
      addToCart(frameForCart, false);
      return;
    }
  }

  return (
    <SectionContainer>
      <div className="flex gap-16">
        {/* Left: Image gallery */}
        <ImageBox
          images={images}
          defaultAltText={product?.title || ''}
          productId={product?.product_id || -1}
        />

        {/* Right: Product Info */}
        <div className="mt-12">
          <HeadlineXS className="font-semibold">{product?.title}</HeadlineXS>
          <div
            dangerouslySetInnerHTML={{ __html: product?.default_description_html || '' }}
            className="mt-4"
          />

          {/** Product Options **/}
          <Body className="mt-4 mb-2 font-semibold text-gray-700 ">Dimensions</Body>
          <div className="flex gap-2">
            {availableOptions?.map((option) => {
              return (
                <button
                  onClick={() => setSelectedOptionId(option.product_option_id)}
                  key={option.product_option_id}
                  className={cx(
                    'p-3 border-1 bg-transparent border-gray-300 border-solid rounded-md cursor-pointer',
                    {
                      'border-greenMui-500 bg-greenMui-50':
                        selectedOptionId === option.product_option_id,
                    }
                  )}
                >
                  <BodyS>{option.value}</BodyS>
                </button>
              );
            })}
          </div>

          {/** Product Frames **/}
          <Body className="mt-8 mb-2 font-semibold text-gray-700 ">Frames</Body>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFrameId(null)}
              key="no frame"
              className={cx(
                'p-3 bg-transparent w-[120px] border-1 border-gray-300 border-solid rounded-md cursor-pointer',

                {
                  'border-greenMui-500 bg-greenMui-50': selectedFrameId === null,
                }
              )}
            >
              <div className="h-32" />
              <BodyS>No Frame</BodyS>
            </button>

            {frames?.map((frame) => {
              return (
                <button
                  onClick={() => setSelectedFrameId(frame.product_id)}
                  key={frame.product_id}
                  className={cx(
                    'p-3 w-[120px] bg-transparent border-1 border-gray-300 border-solid rounded-md cursor-pointer',
                    {
                      'border-greenMui-500 bg-greenMui-50': selectedFrameId === frame.product_id,
                    }
                  )}
                >
                  <img
                    src={frame.default_image_url || ''}
                    className="max-w-full object-cover"
                    alt={frame.default_image_alt || ''}
                  />
                  <BodyS>{frame.title}</BodyS>
                </button>
              );
            })}
          </div>

          {/** Add to Cart **/}
          <div className="mt-8 w-full">
            <Button className="w-full" onClick={addToCartMutation}>
              <BodyL>Add To Cart</BodyL>
            </Button>
            <div className="mt-2 flex justify-end">
              <ErrorText error={err} />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
