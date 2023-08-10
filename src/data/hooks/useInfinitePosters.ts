import { ProductType, getLocaleValues, queryKeys } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { PRODUCT_LIST_ITEM_QUERY_SELECT } from '../queries/productQueries';

type GetInitialPostersType = {
  from: number;
  to: number;
};

export const getInfinitePosters = async ({ from, to }: GetInitialPostersType) => {
  const locales = getLocaleValues();
  const client = getSupabaseBrowserClient();
  return client
    .from('products')
    .select(PRODUCT_LIST_ITEM_QUERY_SELECT, { count: 'exact' })
    .eq('product_type_id', ProductType.POSTER)
    .eq('prices.currency', locales.currency)
    .eq('prices.country_id', locales.code)
    .eq('prices.product_option_id', '1')
    .range(from, to);
};

export const useInfinitePosters = (count: number) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.posters],
    ({ pageParam = { from: 0, to: count - 1 } }) => getInfinitePosters(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPageCount = pages.length;
        const totalItemInTable = (Array.isArray(pages) && pages[0].count) || 10;
        const from = nextPageCount * count;
        const to = (nextPageCount + 1) * count - 1;

        const params = {
          from: from < totalItemInTable ? from : totalItemInTable,
          to: to > totalItemInTable ? totalItemInTable : to,
        };

        return params;
      },
    }
  );

  return { data: data?.pages || [], isLoading, fetchNextPage, isFetchingNextPage };
};
