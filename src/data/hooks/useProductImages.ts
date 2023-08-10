import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getProductImages = async (id: number) => {
  const client = getSupabaseBrowserClient();
  return client.from('product_images').select().eq('product_id', id);
};

export const useProductImages = (id: number, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.productImages, id], () => getProductImages(id), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
