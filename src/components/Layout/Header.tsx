import React, { FC } from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { CartPopup } from '../Molecules';

export const Header: FC = () => {
  return (
    <header>
      <DesktopHeader className="break950:block hidden" />
      <MobileHeader className="break950:hidden" />
      <CartPopup />
    </header>
  );
};
