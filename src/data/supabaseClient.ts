import { createClient } from '@supabase/supabase-js';
import invariant from 'tiny-invariant';
import { Database } from '@/types/database';

// Normaly there is a pre-built useSupabase hook for client in supabase library please use it instead of this. This custom client is created for the services. Services are seperated from fetch react query hook to make the switching between rest-grapqhl easier.

// This client is created to be used ONLY in services only.

export function getSupabaseBrowserClient() {
  // Get the environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  invariant(url, 'Supabase URL was not provided');
  invariant(anon, 'Supabase Anon key was not provided');

  return createClient<Database>(url, anon);
}
