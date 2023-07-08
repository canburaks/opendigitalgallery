import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../supabaseClient';

export const getAddress = async (userId: string) => {
  const client = getSupabaseBrowserClient();
  return client.from('addresses').select('*').eq('uid', userId);
};

export const useAddresses = (userId: string, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.addresses, userId], () => getAddress(userId), {
    enabled: enabled === undefined ? true : enabled,
    staleTime: 0,
  });

  return { data: data, isLoading };
};
