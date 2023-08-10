import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Country } from '@/types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

// This is used for getting country name
export type GetCountryQueries<F extends keyof Country> = {
  select?: F[];
  limit?: number;
  countryId: number;
};

type Res<F extends keyof Country> = PostgrestResponse<Pick<Country, F>>;

export const getCountry = async <F extends keyof Country>({
  select,
  countryId,
  limit,
}: GetCountryQueries<F>): Promise<Res<F>> => {
  const fields = select ? select.join(', ') : '*';
  const client = getSupabaseBrowserClient();

  const res: any = client // eslint-disable-line
    .from('countries')
    .select(fields)
    .eq('country_id', { country_id: countryId })
    .limit(limit || Infinity);
  return res as Promise<Res<F>>;
};

export const useCountry = <F extends keyof Country>(
  queries: GetCountryQueries<F>,
  enabled?: boolean
) => {
  const { data, isLoading } = useQuery([queryKeys.country, queries], () => getCountry(queries), {
    enabled: enabled === undefined ? true : enabled,
  });

  return { data: data, isLoading };
};
