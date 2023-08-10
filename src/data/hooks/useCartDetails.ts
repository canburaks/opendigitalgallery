import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { CART_DETAILS_QUERY } from '../queries/cartDetailsQueries';

export const getCartDetails = async (cartId?: number | null) => {
  const client = getSupabaseBrowserClient();
  return client.from('cart_details').select(CART_DETAILS_QUERY).eq('cart_id', cartId);
};

export const useCartDetails = (cartId?: number | null, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.cartDetails, cartId],
    () => getCartDetails(cartId),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
};
