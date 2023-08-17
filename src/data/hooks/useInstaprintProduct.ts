import { useState, useMemo, useEffect } from 'react';
import {
  INSTAPRINT_PRODUCT_ID,
  INSTAPRINT_PRODUCT_HANDLE,
  INSTAPRINT_PRODUCT_OPTION_IDS,
} from '@/constants';
import { useProductsByIDs } from '@/data/hooks';
import type { Product, ProductDetails } from '@/types';
import { ProductType, getLocaleValues } from '@/constants';
import { useRouter } from 'next/router';
import { INSTAPRINT_PRODUCT_QUERY_SELECT } from '../queries/productQueries';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const useInstaprintProducts = () => {
  // Query Instaprint product from database
  const { data: instaprintProductData } = useProductsByIDs(
    {
      productIDs: [INSTAPRINT_PRODUCT_ID],
      select: INSTAPRINT_PRODUCT_QUERY_SELECT.split(',') as Array<keyof Product>,
      limit: 1,
    },
    true
  );

  // The product data itself
  const instaprintProduct: Partial<ProductDetails> = useMemo(() => {
    if (
      instaprintProductData &&
      instaprintProductData.data &&
      instaprintProductData.data.length > 0
    ) {
      return instaprintProductData.data[0];
    } else
      return {
        handle: INSTAPRINT_PRODUCT_HANDLE,
        product_id: INSTAPRINT_PRODUCT_ID,
        prices: [],
        quantity: 1,
      };
  }, [instaprintProductData]);

  // const getInstaprintProductOptionIds = useMemo(() => {
  //   if (instaprintProduct && instaprintProduct.prices) {
  //     return instaprintProduct.prices.map((price) => price.product_option_id);
  //   } else return [];
  // }, [instaprintProduct])

  const frames = useFramesByOptionIds(INSTAPRINT_PRODUCT_OPTION_IDS);
  return { instaprintProduct, frames };
};

///////////////////////////////////////////////////////////////////////////////

// This hook filters the frames which are compatible with the given optionIds
const useFramesByOptionIds = (optionIds: number[]) => {
  const { locale } = useRouter();
  const [frameProducts, setFrameProductsData] = useState<Partial<FrameProductsType>[]>([]);

  useEffect(() => {
    getFramesByOptionIds(locale).then((data) => {
      if (data && data.length > 0) {
        // filter prices of frame products
        const framesWithFilteredPrices = data.map((frameProduct) => {
          const filteredPrices = frameProduct.prices.filter((price) =>
            optionIds.includes(price.product_option_id)
          );
          frameProduct['prices'] = filteredPrices;
          return frameProduct;
        });
        setFrameProductsData(framesWithFilteredPrices);
      }
    });
  }, []);
  return frameProducts;
};

async function getFramesByOptionIds(locale = 'en') {
  const client = getSupabaseBrowserClient();
  const locales = getLocaleValues(locale === 'tr' ? 'tr' : 'en');
  const { data } = await client
    .from('products')
    .select(
      'handle, product_id, tags, title, product_type_id, prices(country_id, price_id, product_id, product_option_id, is_active, price, currency, shipping_cost, product_options(*))'
    )
    .eq('product_type_id', ProductType.FRAME)
    .eq('prices.country_id', locales.code);
  return data;
}

type FrameProductsType = typeof getFramesByOptionIds;
