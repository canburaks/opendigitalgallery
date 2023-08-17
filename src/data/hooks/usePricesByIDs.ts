import { getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getPricesByIDs = async (priceIDs: number[]) => {
  const client = getSupabaseBrowserClient();
  const locales = getLocaleValues();

  return client
    .from('prices')
    .select()
    .in('price_id', priceIDs)
    .eq('currency', locales.currency)
    .eq('country_id', locales.code);
};

export const usePricesByIDs = (productIDs: number[], enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.prices, productIDs],
    () => getPricesByIDs(productIDs),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );

  return { data: data?.data, isLoading };
};
