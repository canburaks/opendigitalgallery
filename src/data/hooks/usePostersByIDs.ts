import { ProductType, queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../supabaseClient';

export type GetProductsByIDsQueries<F extends keyof Product> = {
  select?: F[];
  limit?: number;
  productIDs: string[];
};

type Res<F extends keyof Product> = PostgrestResponse<Pick<Product, F>>;

export const getPostersByIDs = async <F extends keyof Product>({
  select,
  limit,
  productIDs,
}: GetProductsByIDsQueries<F>): Promise<Res<F>> => {
  const fields = select ? select.join(', ') : '*';
  const client = getSupabaseBrowserClient();
  const res: any = client
    .from('products')
    .select(fields)
    .eq('product_type_id', ProductType.POSTER)
    .in('product_id', productIDs)
    .limit(limit || Infinity);
  return res as Promise<Res<F>>;
};

export const usePostersByIDs = <F extends keyof Product>(
  queries: GetProductsByIDsQueries<F>,
  enabled?: boolean
) => {
  const { data, isLoading } = useQuery(
    [queryKeys.posters, queries],
    () => getPostersByIDs(queries),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );

  return { data: data?.data, isLoading };
};
