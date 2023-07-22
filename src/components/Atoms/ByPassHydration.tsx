import { getInitialCartProducts } from '@/data/stores';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

export const ByPassHydration: FC<PropsWithChildren> = ({ children }) => {
  const supabaseClient = useSupabaseClient();
  const [isHydrated, setIsHydrated] = useState(false);
  const [callCartSync, setCallCartSync] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (callCartSync) {
      getInitialCartProducts();
    }
  }, [callCartSync]);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (e) => {
      if (e === 'SIGNED_IN') {
        setCallCartSync(true);
      }
      if (e === 'SIGNED_OUT') {
        setCallCartSync(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};
