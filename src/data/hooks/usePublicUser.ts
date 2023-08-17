import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../clients/supabaseClient';

export const getUser = async (id?: string | null) => {
  const client = getSupabaseBrowserClient();
  return client.from('users').select().eq('uid', id);
};

export const usePublicUser = (id?: string | null, enabled?: boolean) => {
  const { data, isLoading } = useQuery([queryKeys.users, id], () => getUser(id), {
    enabled: enabled === undefined ? true : enabled,
  });
  return { data: data && data.data ? data.data[0] : undefined, isLoading };
};
