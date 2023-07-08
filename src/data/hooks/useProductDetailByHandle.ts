import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_COUNTRY_CODE } from '@/constants';
import { getSupabaseBrowserClient } from '../supabaseClient';
import { PRODUCT_FULL_QUERY_SELECT } from '../queries';

export const getProductDetailByHandle = async (handle: string, countryCode?: number) => {
  const client = getSupabaseBrowserClient();
  return client
    .from('products')
    .select(PRODUCT_FULL_QUERY_SELECT)
    .eq('handle', handle)
    .filter('prices.country_id', 'eq', countryCode || DEFAULT_COUNTRY_CODE);
};

export const useProductDetailByHandle = (id: string | number, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.posters, id],
    () => getProductDetailByHandle(id.toString()),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
};
