import React, { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnnouncementBanner } from '../Molecules';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      {children}
      <Footer />
    </>
  );
};
