import { useSupabaseClient, User } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export const useUser = () => {
  const supabaseClient = useSupabaseClient();
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const supabaseSession = await supabaseClient.auth.getSession();
      if (supabaseSession) {
        setUser(supabaseSession.data.session?.user);
        setToken(supabaseSession.data.session?.access_token);
      }
      setLoading(false);
    };

    fetchUser();
  }, [supabaseClient]);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user?.id) {
          setUser(session.user);
          setToken(session.access_token);
        } else {
          setUser(undefined);
          setToken(undefined);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  return {
    user,
    isLoading,
    token,
  };
};
