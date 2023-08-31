import { Body, Button, SectionContainer } from '@/components';
import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import cx from 'classnames';
import { useState } from 'react';
import { Profile } from './sections/Profile';
import { Orders } from './sections/Orders';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

type MenuTypes = 'profile' | 'orders' | 'notifications';

const menu: Record<string, MenuTypes> = {
  profile: 'profile',
  orders: 'orders',
};

export const ProfileView = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuTypes>('profile');
  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <SectionContainer className=" overflow-auto relative">
      <div className="flex flex-col gap-4 max-w-[1000px] m-auto">
        {/* Sidebar */}
        <div className="flex sticky justify-between flex-[2] ">
          <div className="flex flex-row gap-2 items-start ">
            {Object.values(menu).map((item) => {
              return (
                <MuiButton
                  key={item}
                  onClick={() => setSelectedMenu(item)}
                  className={cx('py-2 px-4 rounded-none', {
                    'border-myBlack-200 border-l-2 border-solid': selectedMenu === item,
                  })}
                >
                  <Body className={cx('text-myBlack-200 capitalize')}>{item}</Body>
                </MuiButton>
              );
            })}
          </div>
          <Button onClick={onSignOut}>Sign Out</Button>
        </div>
        <div className="w-1 ml-8 bg-gray-100" />
        {/* Menu Contents */}
        <div className=" flex-[10] max-h-[calc(100vh-250px)] overflow-scroll">
          {selectedMenu === 'profile' && <Profile />}
          {selectedMenu === 'orders' && <Orders />}
        </div>
      </div>
    </SectionContainer>
  );
};
