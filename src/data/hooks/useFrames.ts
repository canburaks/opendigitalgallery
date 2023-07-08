import { ProductType, getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../supabaseClient';
import { PRODUCT_FULL_QUERY_SELECT } from '../queries';

export const getFrames = async () => {
  const locales = getLocaleValues();
  const client = getSupabaseBrowserClient();
  return client
    .from('products')
    .select(PRODUCT_FULL_QUERY_SELECT)
    .eq('product_type_id', ProductType.FRAME)
    .eq('prices.currency', locales.currency)
    .eq('prices.country_id', locales.code);
};

export const useFrames = (enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.frames], () => getFrames(), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
