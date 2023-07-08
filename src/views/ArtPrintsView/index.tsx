import React from 'react';
import { HeroSection } from '@/components';
import { ProductListSection } from './sections';

export const ArtPrintsView = () => {
  return (
    <>
      <HeroSection
        className="!h-100"
        headline="Art Print Posters"
        body="A collection of all fine art prints of us chosen from the finest artworks. We carefully
          selected the artworks while keeping the product range-wide. The collection also includes
          art pieces from famous artists, such as Monet Van Gogh, and masterpieces of poster art."
      />
      <ProductListSection />
    </>
  );
};
