import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getProductTranslations = async (id: number) => {
  const client = getSupabaseBrowserClient();
  return client.from('product_translations').select().eq('product_id', id);
};

export const useProductTranslations = (id: number, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.translations, id],
    () => getProductTranslations(id),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
};
