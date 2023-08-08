import { authChangeTriggerCartState } from '@/data/stores';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
export const ByPassHydration: FC<PropsWithChildren> = ({ children }) => {
  const supabaseClient = useSupabaseClient();
  const [isHydrated, setIsHydrated] = useState(false);
  const [callCartSync, setCallCartSync] = useState<string | null>(null);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (callCartSync) {
      authChangeTriggerCartState();
    }
  }, [callCartSync]);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (e) => {
      if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') {
        setCallCartSync('SIGNED_IN');
      }
      if (e === 'SIGNED_OUT') {
        setCallCartSync('SIGNED_OUT');
      }
      if (e !== 'SIGNED_IN' && e !== 'SIGNED_OUT') {
        setCallCartSync(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};
