import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../supabaseClient';

type GetProductsByIDsQueries<F extends keyof Product> = {
  select?: F[];
  limit?: number;
  productIDs: number[];
};

type Res<F extends keyof Product> = PostgrestResponse<Pick<Product, F>>;

const getProductsByIDs = async <F extends keyof Product>({
  select,
  limit,
  productIDs,
}: GetProductsByIDsQueries<F>): Promise<Res<F>> => {
  const fields = select ? select.join(', ') : '*';
  const client = getSupabaseBrowserClient();
  const res: any = client
    .from('products')
    .select(fields)
    .in('product_id', productIDs)
    .limit(limit || Infinity);

  console.log('res', res);
  return res as Promise<Res<F>>;
};

export const useProductsByIDs = <F extends keyof Product>(
  queries: GetProductsByIDsQueries<F>,
  enabled?: boolean
) => {
  const { data, isLoading } = useQuery([queryKeys.products], () => getProductsByIDs(queries), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
