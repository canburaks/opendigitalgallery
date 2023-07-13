import type {
  ProductDetails,
  ProductOptions,
  ProductPriceOptions,
  MergedProductOption,
} from '@/types';

/*
 * This function merges existing product_country_options
 * with the corresponding default product_options
 * */
export function mergeOptions(
  prices: ProductPriceOptions[],
  defaultOptions: ProductOptions[]
): MergedProductOption[] {
  const mergedOptions: MergedProductOption[] = [];
  // check if country options  are provided
  if (!prices || prices.length === 0) {
    throw new Error('No country options found for the product!');
  }

  // check if default options are provided
  if (!defaultOptions || defaultOptions.length === 0) {
    throw new Error('No default options for a product!');
  }

  prices.forEach((countryOption: ProductPriceOptions) => {
    const defaultOption = defaultOptions.find(
      (option) => option.product_option_id === countryOption.product_option_id
    );

    if (defaultOption && countryOption) {
      mergedOptions.push({
        price_id: countryOption?.price_id,
        country_id: countryOption?.country_id,
        product_option_id: countryOption?.product_option_id,
        product_id: countryOption?.product_id,
        price: countryOption?.price,
        currency: countryOption?.currency,
        option_name: defaultOption.description,
        option_value: defaultOption.value,
        shipping_cost: countryOption.shipping_cost,
      });
    }
  });

  return mergedOptions;
}

export function merger(
  product: ProductDetails,
  defaultOptions: ProductOptions[],
  activeProductOptionIds?: number[]
): ProductDetails {
  if (product?.prices && defaultOptions) {
    try {
      const options = mergeOptions(product.prices, defaultOptions);
      if (activeProductOptionIds) {
        product.options = options.filter((option) =>
          activeProductOptionIds.includes(option.product_option_id)
        );
      } else {
        product.options = options;
      }
    } catch (error) {
      product.options = [];
    }
  }
  return product;
}
