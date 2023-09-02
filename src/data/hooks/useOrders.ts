import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
import { ORDER_QUERY } from '../queries/orderQueries';

export async function getOrders(token: string | undefined) {
  const client = getSupabaseBrowserClient();
  return await client.from('orders').select(ORDER_QUERY).eq('payment_provider_token', token!);
}

export function useOrders(token: string | undefined, enabled?: boolean) {
  const { data, isLoading } = useQuery(
    [queryKeys.ordersByToken, token],
    () => getOrders(token || ''),
    {
      enabled: enabled !== false && token ? true : enabled,
    }
  );
  return { data: data, isLoading };
}
