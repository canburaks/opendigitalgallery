import { queryKeys } from '@/constants';
import { OrderData } from '@/pages/api/orderData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function getOrderData(token: string | undefined) {
  return await axios.post<OrderData>('/api/orderData', { token });
}

export function useOrderService(token: string | undefined, enabled?: boolean) {
  const { data, isLoading } = useQuery(
    [queryKeys.ordersByTokenService, token],
    () => getOrderData(token || ''),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
}
