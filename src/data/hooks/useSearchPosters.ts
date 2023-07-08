import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../supabaseClient';
import { PRODUCT_LIST_ITEM_QUERY_SELECT, SEARCH_POSTERS_INCLUDED_COLUMNS } from '../queries';

export const getSearchPosters = async (searchTerm: string) => {
  const client = getSupabaseBrowserClient();
  return client
    .from('products')
    .select(PRODUCT_LIST_ITEM_QUERY_SELECT)
    .textSearch(SEARCH_POSTERS_INCLUDED_COLUMNS, searchTerm);
};

export const useSearchPosters = (searchTerm: string, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.searchPosters, searchTerm],
    () => getSearchPosters(searchTerm),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
};
