import { Body, Button } from '@/components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react';

export const Profile = () => {
  const supabase = useSupabaseClient();

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <Body>User Profile Section</Body>
      <Button className="w-30" onClick={onSignOut}>
        <Body>Sign Out</Body>
      </Button>
    </div>
  );
};
