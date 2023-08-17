import type { ProductDetails } from '@/types/generatedDBTypes';
import type { QueryState, Query } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { QueryCache } from '@tanstack/react-query';
import { merger } from '@/views/ProductDetailsView/utils';

interface ProductQuery extends Query {
  state: QueryState<any, any>;
}

export function useProductDataFromQuery(slug: string): ProductDetails | undefined {
  const queryClient = useQueryClient();
  const queryCache: QueryCache = queryClient.getQueryCache();
  const optionsQuery: ProductQuery | undefined = queryCache.find([queryKeys.productOptions]);
  const productQuery: ProductQuery | undefined = queryCache.find([slug]);

  try {
    if (productQuery && optionsQuery) {
      return merger(productQuery.state.data.data[0], optionsQuery.state.data.data);
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
