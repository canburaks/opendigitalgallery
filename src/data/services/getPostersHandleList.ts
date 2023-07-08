import { ProductType } from '@/constants';
import { getSupabaseBrowserClient } from '../supabaseClient';

export const getPostersHandleList = async () => {
  const client = getSupabaseBrowserClient();
  return client.from('products').select('handle').eq('product_type_id', ProductType.POSTER);
};
