import { queryKeys } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../supabaseClient';
import { COLLECTION_PRODUCT_LIST_ITEM_QUERY_SELECT } from '../queries';

type GetInitialPostersType = {
  from: number;
  to: number;
  collectionID: number | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getInfiniteCollectionPosters = async ({
  from,
  to,
  collectionID,
}: GetInitialPostersType) => {
  const client = getSupabaseBrowserClient();

  return client // eslint-disable-line @typescript-eslint/no-explicit-any
    .from('product_collections')
    .select(COLLECTION_PRODUCT_LIST_ITEM_QUERY_SELECT, {
      count: 'exact',
    })
    .filter('collection_id', 'eq', collectionID)
    .range(from, to);
};

export const useInfiniteCollectionPosters = (
  collectionID: number | undefined,
  count: number,
  enabled?: boolean
) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.collectionPosters, collectionID],
    ({ pageParam = { from: 0, to: count - 1 } }) =>
      getInfiniteCollectionPosters({ collectionID, ...pageParam }),
    {
      enabled: enabled === undefined ? true : enabled,
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
