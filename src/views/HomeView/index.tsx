import React from 'react';
import { HeroSection, ProductListSection } from '@/views/HomeView/sections';
import { CollectionListSection } from './sections/CollectionListSection';

export const HomeView = () => {
  return (
    <>
      <HeroSection />
      <ProductListSection />
      <CollectionListSection />
      {/* <NewsletterBanner
        headline="Yeni çıkan ürünlerden ilk sizin haberiniz olsun."
        description="Eposta bültenimize katılın, en yeni art print ve posterlerden ilk sizin haberiniz olsun."
      /> */}
    </>
  );
};
