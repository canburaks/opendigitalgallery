import { DehydratedState } from '@tanstack/react-query';
import type { QueryState } from '@tanstack/react-query';
import type { ProductOptions } from '@/types/generatedDBTypes';
import { queryKeys } from '@/constants';

interface DehydratedQuery {
  state: QueryState<any, any>;
}

export function getProductOptionsDataFromQuery(
  dehydratedState: DehydratedState
): ProductOptions[] | undefined {
  const productOptions: DehydratedQuery | undefined = dehydratedState?.queries.find(
    (query) => query.queryKey[0] === queryKeys.productOptions
  );

  try {
    if (productOptions && productOptions.state.data) {
      return productOptions.state.data.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
