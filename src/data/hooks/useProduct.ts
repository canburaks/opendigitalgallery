import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { PRODUCT_FULL_QUERY_SELECT } from '../queries/productQueries';

export const getProduct = async (id: string) => {
  const client = getSupabaseBrowserClient();
  return client.from('products').select(PRODUCT_FULL_QUERY_SELECT).eq('product_id', id);
};

export const useProduct = (id: string | number, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.posters, id], () => getProduct(id.toString()), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
