import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getProductOptions = async () => {
  const client = getSupabaseBrowserClient();
  return client.from('product_options').select();
};

export const useProductOptions = (enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.productOptions], () => getProductOptions(), {
    enabled: enabled === undefined ? true : enabled,
  });

  return { data: data?.data, isLoading };
};
