import { getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getProductPricesByIDs = async (productIDs: number[]) => {
  const client = getSupabaseBrowserClient();
  const locales = getLocaleValues();

  return client
    .from('prices')
    .select()
    .in('product_id', productIDs)
    .eq('currency', locales.currency)
    .eq('country_id', locales.code);
};

export const useProductPricesByIDs = (productIDs: number[], enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.productCountryOptions, productIDs],
    () => getProductPricesByIDs(productIDs),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );

  return { data: data?.data, isLoading };
};
