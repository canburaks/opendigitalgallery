import { ProductType, getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { PRODUCT_FULL_QUERY_SELECT } from '../queries/productQueries';

export const getPoster = async (id: string) => {
  const locales = getLocaleValues();
  const client = getSupabaseBrowserClient();
  return client
    .from(PRODUCT_FULL_QUERY_SELECT)
    .select()
    .eq('product_id', id)
    .eq('product_type_id', ProductType.POSTER)
    .eq('prices.currency', locales.currency)
    .eq('prices.country_id', locales.code);
};

export const usePoster = (id: string | number, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.posters, id], () => getPoster(id.toString()), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
