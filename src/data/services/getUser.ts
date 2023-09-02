import { supabaseServer } from '../clients/supabaseServer';

export const USER_QUERY = '*';

export const getUser = async (userId: string) => {
  return supabaseServer.from('users').select(USER_QUERY).eq('uid', userId);
};

export type UserReponse = Awaited<ReturnType<typeof getUser>>;
export type UserReponseSuccess = UserReponse['data'];
