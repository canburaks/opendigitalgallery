import { supabaseServer } from '../clients/supabaseServer';

export const CART_DETAILS_QUERY = '*, prices(*)';

export const getCartDetails = async (cartID: number) => {
  return supabaseServer.from('cart_details').select(CART_DETAILS_QUERY).eq('cart_id', cartID);
};

export type CartDetailsResponse = Awaited<ReturnType<typeof getCartDetails>>;
export type CartDetailsResponseSuccess = CartDetailsResponse['data'];
