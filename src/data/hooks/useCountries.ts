import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Country } from '@/types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';

// This is used for listing the countries for address select in profile page

export type GetCountriesQueries<F extends keyof Country> = {
  select?: F[];
  limit?: number;
};

type Res<F extends keyof Country> = PostgrestResponse<Pick<Country, F>>;

export const getCountries = async <F extends keyof Country>({
  select,
  limit,
}: GetCountriesQueries<F>): Promise<Res<F>> => {
  const fields = select ? select.join(', ') : '*';
  const client = getSupabaseBrowserClient();
  const res: any = client // eslint-disable-line
    .from('countries')
    .select(fields)
    .limit(limit || Infinity);
  return res as Promise<Res<F>>;
};

export const useCountries = <F extends keyof Country>(
  queries: GetCountriesQueries<F>,
  enabled?: boolean
) => {
  const { data, isLoading } = useQuery(
    [queryKeys.countries, queries],
    () => getCountries(queries),
    {
      enabled: enabled === undefined ? true : enabled,
    }
  );

  return { data: data, isLoading };
};
