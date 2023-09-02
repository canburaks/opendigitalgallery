import { BodyL, Headline, Loading, ProductCard, SectionContainer } from '@/components';
import { useFrames } from '@/data/hooks';
import React from 'react';

export const FramesView = () => {
  const { data: frames, isLoading } = useFrames();
  return (
    <SectionContainer>
      <img src="images/hero2.webp" alt="hero" className="w-full bg-center h-100 object-cover" />
      <div className="text-center">
        <Headline className="py-8">Frames</Headline>
        <BodyL className="max-w-[900px] m-auto">
          Our frames are of high quality handmade and available in sizes 21x30, 30x40, 40x50, 50x70
          and 60x90 cm. The picture frames are available in white and black plastic and also in 3
          different shade of brown in wood. You can mix sizes and colours to create a more exciting
          poster wall. All frame sizes correspond to the available sizes of our posters.
        </BodyL>
        <div className="grid grid-cols-3 gap-8 pt-10 py-20">
          {frames &&
            frames &&
            frames.map((product: any) => <ProductCard key={product.product_id} {...product} />)}
        </div>
      </div>
      {isLoading && <Loading />}
    </SectionContainer>
  );
};
