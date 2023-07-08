import type { QueryState, Query } from '@tanstack/react-query';
import type { ProductDetails } from '@/types/generatedDBTypes';
import { queryKeys } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { QueryCache } from '@tanstack/react-query';
import { merger } from '@/views/ProductDetailsView/utils';

interface FrameQuery extends Query {
  state: QueryState<any, any>;
}

type Props = {
  productOptionIds: number[];
};

export function useFrameDataFromQuery(props: Props): ProductDetails[] {
  const queryClient = useQueryClient();
  const queryCache: QueryCache = queryClient.getQueryCache();
  const frameQuery: FrameQuery | undefined = queryCache.find([queryKeys.frames]);
  const optionsQuery: FrameQuery | undefined = queryCache.find([queryKeys.productOptions]);

  if (frameQuery && optionsQuery) {
    return frameQuery.state.data.data.map((frame: ProductDetails) =>
      merger(frame, optionsQuery.state.data.data, props.productOptionIds)
    );
  }
  return [];
}

//
// export function useFrameDataFromQuery(
//   dehydratedState: DehydratedState
// ): ProductDetails[] | undefined {
//   const frameData: DehydratedQuery | undefined = dehydratedState?.queries.find(
//     (query) => query.queryKey[0] === queryKeys.frames
//   );
//
//   try {
//     if (frameData && frameData.state.data) {
//       return frameData.state.data.data;
//     } else return [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
