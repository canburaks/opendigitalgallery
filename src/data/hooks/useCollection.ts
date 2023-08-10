import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getCollection = async (handle: string) => {
  const client = getSupabaseBrowserClient();
  return client.from('collections').select().eq('handle', handle);
};

export const useCollection = (handle: string, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [queryKeys.collections, handle],
    () => getCollection(handle),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );
  return { data: data, isLoading };
};
