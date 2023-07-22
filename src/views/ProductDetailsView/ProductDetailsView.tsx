import { useRouter } from 'next/router';
import { LocaleType, MergedProductOption, ProductDetails, TranslatableFields, CartProduct } from '@/types';
import React, { useState, useMemo, MouseEvent } from 'react';
import { RadioGroup } from '@headlessui/react';
import { DEFAULT_LOCALE, PRODUCT_DIMENSION_UNIT, PRODUCT_IMAGE_PLACEHOLDER, NO_FRAME_PRODUCT, FRAME_IMAGE_PLACEHOLDER } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Container } from '@mui/material';
import {
  useProductDataFromQuery,
  getTranslatableProductData,
} from '@/views/ProductDetailsView/utils';
import { TRX } from '@/constants';
import { ImageBox } from './components';
// import { AddToCartButton } from './components/AddToCartButton';
import { useFrameDataFromQuery } from './utils';
import { Button } from '@/components';
import { useCartStore } from '@/data/stores';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const ProductDetailsView: React.FC = () => {
  const { locale = DEFAULT_LOCALE, asPath } = useRouter();
  const { t } = useTranslation('common');

  const addToCart = useCartStore((state) => state.addToCart);


  // short circuit if no product
  const product: ProductDetails | undefined =
    useProductDataFromQuery(asPath.split('/').pop() ?? '') || {};
  const images = product.images || [];
  const options = useMemo(() => product.options || [], [product?.options]);
  const optionIds = useMemo(() => options.map((o) => o.product_option_id), [options]);


  // Selected Size
  const [activeProductOptionId, setActiveProductionOptionId] = useState<number | undefined>(
    options[0] ? options[0].product_option_id : undefined
  );
  const selectedOption = useMemo(() => {
    return options.find((o: MergedProductOption) => o.product_option_id === activeProductOptionId);
  }, [activeProductOptionId, options]);


  // FRAMES DATA
  const framesData = useFrameDataFromQuery({ productOptionIds: optionIds });
  // console.log("frames data", framesData)

  // FRAMES WITH NO FRAME OPTION
  const frames: ProductDetails[] = useMemo(() => [NO_FRAME_PRODUCT, ...framesData], [framesData]);

  // PRODUCT ID OF THE FRAME: the frame which selected by user. E.g: id of Black Wooden Frame
  const [selectedFrameId, setSelectedFrameId] = React.useState<number>(-1);

  // FRAME PRODUCT: No Frame, Black Wooden Frame, Natuarl Wooden Frame etc.
  const selectedFrame: ProductDetails = useMemo(() => {
    // find the frame product that matches the selected frame id
    const selectedframe = frames.find((f) => f.product_id === selectedFrameId);
    if (
      !selectedframe ||
      selectedframe?.product_id === undefined ||
      selectedframe?.product_id === -1
    ) {
      return NO_FRAME_PRODUCT;
    } else {
      return selectedframe;
    }
  }, [frames, selectedFrameId]);


  // THE PRODUCT OPTION of  FRAME PRODUCT: [1,2,3,4] --> 70x50, 50x40, 40x30, 30x21
  const selectedFrameOption: MergedProductOption = useMemo(() => {
    const defaultProduct = NO_FRAME_PRODUCT;
    if (selectedFrame && selectedFrame.options) {
      const frameOption = selectedFrame.options.filter(
        (o) => o.product_option_id === activeProductOptionId
      );
      if (frameOption.length > 0) {
        return frameOption[0];
      }
    }
    const defaultOption = defaultProduct.options!.find(
      (o) => o.product_option_id === activeProductOptionId
    );
    // console.log('defaultOption', defaultOption);
    if (defaultOption) return defaultOption;
    return defaultProduct.options![0];
  }, [activeProductOptionId, selectedFrame]);



  // FRAMES HAS ONLY OPTION OF  SELECTED SIZE
  const framesByProductOptionId = useMemo(() => {
    return frames.map((frame) => {
      const _frame = { ...frame };
      const options: MergedProductOption[] | undefined = frame.options?.filter(
        (o) => o.product_option_id === selectedFrameOption.product_option_id
      );
      if (options && options.length > 0) {
        _frame.options = options;
      }
      return _frame;
    });
  }, [frames, selectedFrameOption.product_option_id]);


  // Translated Product
  const translatedProduct: TranslatableFields = getTranslatableProductData(
    product,
    locale as LocaleType
  );

  // This will be passed to the add to cart button
  const frameCartProduct = useMemo(() => {
    if (selectedFrameOption.product_id === NO_FRAME_PRODUCT.product_id) {
      return undefined
    } else {
      return {
        productId: selectedFrameOption.product_id,
        priceId: selectedFrameOption.price_id,
        quantity: 1,
      }
    }
  }, [selectedFrameOption])


  // This will be passed to the add to cart button
  const posterCartProduct = useMemo(() => {
    if (selectedOption) {
      return {
        productId: selectedOption.product_id,
        priceId: selectedOption.price_id,
        quantity: 1,
      }
    }
  }, [selectedOption])

  function addToCartMutation(e: MouseEvent): void {
    e.preventDefault();
    if (posterCartProduct) {
      if (frameCartProduct && frameCartProduct.productId !== NO_FRAME_PRODUCT.product_id) {
        addToCart( frameCartProduct as CartProduct, false);
        addToCart(posterCartProduct as CartProduct, true);
      } else {
        addToCart(posterCartProduct, true);
      }
    }
  }

  return (
    <Container maxWidth="lg" className="flex flex-row mt-16">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 relative">
            {/* Image gallery */}
            <ImageBox
              images={images}
              defaultAltText={translatedProduct.title}
              productId={translatedProduct.product_id}
            />

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {translatedProduct.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">{t(TRX.PRODUCT_DETAILS.INFORMATION)}</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {selectedOption ? `${selectedOption.price} ${selectedOption.currency}` : ''}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">{TRX.PRODUCT_DETAILS.DESCRIPTION}</h3>

                {translatedProduct.description && (
                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: translatedProduct.description }}
                  />
                )}
              </div>

              <form className="mt-6">
                {/* PRODUCT SIZE */}
                <div>
                  <RadioGroup value={activeProductOptionId} onChange={setActiveProductionOptionId}>
                    <RadioGroup.Label className="block text-sm font-medium text-gray-700 z-10">
                      {t(TRX.PRODUCT_DETAILS.SIZE)}
                    </RadioGroup.Label>
                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      {options.map((option: MergedProductOption) => (
                        <RadioGroup.Option
                          as="div"
                          key={option.option_value + '-product-option'}
                          value={option.product_option_id}
                          className={({ active }) =>
                            classNames(
                              active ? 'ring-2 ring-indigo-500' : '',
                              activeProductOptionId === option.product_option_id
                                ? 'bg-indigo-100 border-indigo-200 z-10'
                                : 'bg-white border-gray-200 z-0',
                              'relative duration-300 ease-in-out transform-gpu block cursor-pointer rounded-lg border border-solid border-gray-300 p-4 focus:outline-none'
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <RadioGroup.Label
                                as="p"
                                className="text-sm font-medium text-gray-900"
                              >
                                {option.option_value} {PRODUCT_DIMENSION_UNIT}
                              </RadioGroup.Label>
                              <RadioGroup.Description as="p" className="mt-1 text-xs text-gray-500">
                                {`${option.price} ${option.currency}`}
                              </RadioGroup.Description>
                              <div
                                className={classNames(
                                  'border-2',
                                  checked ? 'border-indigo-500' : 'border-gray-500',
                                  // option.product_option_id === activeProductOptionId
                                  //   ? 'bg-indigo-200'
                                  //   : 'bg-gray-500',
                                  'pointer-events-none absolute inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-8">
                  <RadioGroup value={selectedFrameId} onChange={setSelectedFrameId}>
                    <RadioGroup.Label className="block text-sm font-medium text-gray-700 z-10">
                      {t(TRX.PRODUCT_DETAILS.CHOOSE_FRAME)}
                    </RadioGroup.Label>
                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      {framesByProductOptionId.length > 0 &&
                        framesByProductOptionId.map((frame: ProductDetails) => (
                          <RadioGroup.Option
                            as="div"
                            key={frame.product_id}
                            value={frame.product_id}
                            className={({ active }) =>
                              classNames(
                                active ? 'ring-2 ring-indigo-500' : '',
                                selectedFrame?.product_id === frame?.product_id ? 'bg-indigo-100' : 'bg-white',
                                'relative duration-300 ease-in-out transform-gpu block cursor-pointer rounded-lg border border-solid border-gray-300 p-4 focus:outline-none'
                              )
                            }
                          >
                            {({ checked }) => (
                              <>
                                <div className="flex flex-col justify-between h-full">
                                  <RadioGroup.Label as="p" className="text-xs font-medium text-gray-900">
                                    {frame.title}
                                  </RadioGroup.Label>
                                  {frame.options && frame.options.length > 0 && (
                                    <RadioGroup.Description as="p" className="mt-1 text-xs text-gray-500">
                                      {`+${frame?.options[0]?.price} ${frame?.options[0]?.currency}`}
                                    </RadioGroup.Description>
                                  )}
                                </div>
                                <div
                                  className={classNames(
                                    'border-2',
                                    checked ? 'border-indigo-500' : 'border-gray-500',
                                    'pointer-events-none absolute inset-px rounded-lg'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                  <div className="sm:flex-col1 mt-10 flex">
                    <Button
                      onClick={addToCartMutation}
                      type="submit"
                      className="cursor-pointer flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      {t(TRX.PRODUCT_DETAILS.ADD_TO_CART)}
                    </Button>
                  </div>
                  {/* {product?.product_id && selectedOption?.price && (
                    <FrameWidget
                      priceId={selectedOption?.price_id}
                      productPrice={selectedOption.price!}
                      productTitle={translatedProduct.title}
                      productOptionIds={optionIds}
                      activeProductOptionId={activeProductOptionId}
                      productId={product.product_id}
                      productImageUrl={product.default_image_url || PRODUCT_IMAGE_PLACEHOLDER}
                      shipping_cost={selectedOption.shipping_cost}
                      currency={selectedOption.currency}
                      frame={frame}
                      setFrame={setFrame}
                    />
                  )} */}
                  {/* {product !== undefined && selectedOption !== undefined && posterCartProduct && <AddToCartButton
                    productTitle={translatedProduct?.title}
                    priceId={selectedOption?.price_id}
                    productId={product.product_id!}
                    productImageUrl={product.default_image_url || PRODUCT_IMAGE_PLACEHOLDER}
                    productPrice={selectedOption.price!}
                    productOptionId={activeProductOptionId!}
                    frameId={selectedFrameOption.product_id!}
                    frameTitle={selectedFrame.title!}
                    framePrice={selectedFrameOption.price}
                    frameImageUrl={selectedFrame.default_image_url || FRAME_IMAGE_PLACEHOLDER}
                    text={t(TRX.PRODUCT_DETAILS.ADD_TO_CART)}
                    shipping_cost={selectedOption?.shipping_cost}
                    currency={selectedOption.shipping_cost}
                    frameCartProduct={frameCartProduct}
                    posterCartProduct={posterCartProduct}
                  />} */}
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  {t(TRX.PRODUCT_DETAILS.ADDITIONAL_DETAILS)}
                </h2>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
