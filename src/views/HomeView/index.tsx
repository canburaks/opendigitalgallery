import React from 'react';
import { HeroSection, ProductListSection } from '@/views/HomeView/sections';
import { CollectionListSection } from './sections/CollectionListSection';

export const HomeView = () => {
  return (
    <>
      <HeroSection />
      <ProductListSection />
      <CollectionListSection />
    </>
  );
};
