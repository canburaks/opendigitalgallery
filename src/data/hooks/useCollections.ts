import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '../supabaseClient';

export const getCollections = async () => {
  const client = getSupabaseBrowserClient();
  return client.from('collections').select('*');
};

export const useCollections = (enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.collections], () => getCollections(), {
    enabled: enabled === undefined ? true : enabled,
  });

  return { data: data, isLoading };
};
