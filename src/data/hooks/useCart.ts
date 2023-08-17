import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getCart = async (cartId: string) => {
  const client = getSupabaseBrowserClient();
  return client.from('carts').select().eq('cart_id', cartId);
};

export const useCat = (cartId: string, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.cart, cartId], () => getCart(cartId), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data, isLoading };
};
