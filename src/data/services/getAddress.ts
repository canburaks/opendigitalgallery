import { supabaseServer } from '../clients/supabaseServer';

export const ADDRESS_QUERY = '*, countries(*)';

export const getAddress = async (uid: string) => {
  return supabaseServer.from('addresses').select(ADDRESS_QUERY).eq('uid', uid);
};

export type AddressResponse = Awaited<ReturnType<typeof getAddress>>;
export type AddressResponseSuccess = AddressResponse['data'];
