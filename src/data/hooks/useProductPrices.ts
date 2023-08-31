import { getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export interface ProductPriceInputs {
  productID: number;
}

export const getProductPrices = async (productID?: number) => {
  const locales = getLocaleValues();
  const client = getSupabaseBrowserClient();
  return client
    .from('prices')
    .select()
    .eq('product_id', productID!)
    .eq('prices.currency', locales.currency)
    .eq('prices.country_id', locales.code);
};

export const useProductPrices = (productID?: number, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.productPrices, productID],
    () => getProductPrices(productID),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data?.data, isLoading };
};
