import invariant from 'tiny-invariant';
import { Database } from '@/types/database';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
// Normaly there is a pre-built useSupabase hook for client in supabase library please use it instead of this. This custom client is created for the services. Services are seperated from fetch react query hook to make the switching between rest-grapqhl easier.

// This client is created to be used ONLY in services only.

export function getSupabaseBrowserClient() {
  // Get the environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  invariant(url, 'Supabase URL was not provided');

  return createBrowserSupabaseClient<Database>({
    supabaseUrl: url,
  });
}
