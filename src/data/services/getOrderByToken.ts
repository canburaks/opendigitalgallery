import { supabaseServer } from '../clients/supabaseServer';
import { ORDER_QUERY } from '../queries/productQueries';

export const getOrderByToken = async (token: string) => {
  return supabaseServer.from('orders').select(ORDER_QUERY).eq('payment_provider_token', token);
};

export type OrderByTokenResponse = Awaited<ReturnType<typeof getOrderByToken>>;
export type OrdeByTokenResponseSuccess = OrderByTokenResponse['data'];
