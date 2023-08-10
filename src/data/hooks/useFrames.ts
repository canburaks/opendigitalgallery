import { ProductType, getLocaleValues, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { PRODUCT_FULL_QUERY_SELECT } from '../queries/productQueries';
import { useRouter } from 'next/router';

export const getFrames = async (locale = 'en') => {
  const locales = getLocaleValues(locale === 'tr' ? 'tr' : 'en');
  const client = getSupabaseBrowserClient();
  return client
    .from('products')
    .select(PRODUCT_FULL_QUERY_SELECT)
    .eq('product_type_id', ProductType.FRAME)
    .eq('prices.currency', locales.currency)
    .eq('prices.country_id', locales.code);
};

export const useFrames = (enabled?: boolean) => {
  const { locale } = useRouter();

  const { data, isLoading } = useQuery([queryKeys.frames], () => getFrames(locale), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
