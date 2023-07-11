import { useRouter } from 'next/router';
import { LocaleType, MergedProductOption, ProductDetails, TranslatableFields } from '@/types';
import React, { useState, useMemo } from 'react';
import { RadioGroup } from '@headlessui/react';
import { DEFAULT_LOCALE, PRODUCT_DIMENSION_UNIT, PRODUCT_IMAGE_PLACEHOLDER } from '@/constants';
import { useTranslation } from 'next-i18next';
import { Container } from '@mui/material';
import {
  useProductDataFromQuery,
  getTranslatableProductData,
} from '@/views/ProductDetailsView/utils';
import { TRX } from '@/constants';
import { ImageBox, FrameWidget } from './components';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const ProductDetailsView: React.FC = () => {
  const { locale = DEFAULT_LOCALE, asPath } = useRouter();
  const { t } = useTranslation('common');

  // short circuit if no product
  const product: ProductDetails | undefined =
    useProductDataFromQuery(asPath.split('/').pop() ?? '') || {};
  const images = product.images || [];
  const options = useMemo(() => product.options || [], [product?.options]);
  const optionIds = useMemo(() => options.map((o) => o.product_option_id), [options]);

  // Translated Product
  const translatedProduct: TranslatableFields = getTranslatableProductData(
    product,
    locale as LocaleType
  );

  // Selected Size
  const [activeProductOptionId, setActiveProductionOptionId] = useState<number | undefined>(
    options[0] ? options[0].product_option_id : undefined
  );
  const selectedOption = useMemo(() => {
    return options.find((o: MergedProductOption) => o.product_option_id === activeProductOptionId);
  }, [activeProductOptionId, options]);

  console.log('selectedOption', selectedOption);

  return (
    <Container maxWidth="lg" className="flex flex-row mt-16">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
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
                  {product?.product_id && selectedOption?.price && (
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
                    />
                  )}
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
