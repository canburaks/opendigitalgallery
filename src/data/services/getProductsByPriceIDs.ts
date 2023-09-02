import { supabaseServer } from '../clients/supabaseServer';

export const PRODUCT_PRICE_QUERY = '*, products(*), product_options(*)';

export const getProductsByPriceIDs = async (priceIDs: number[]) => {
  return supabaseServer.from('prices').select(PRODUCT_PRICE_QUERY).in('price_id', priceIDs);
};

export type ProductsByPriceIDs = Awaited<ReturnType<typeof getProductsByPriceIDs>>;
export type ProductsByPriceIDsSuccess = ProductsByPriceIDs['data'];
