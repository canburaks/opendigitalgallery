import { MyLink, SectionContainer } from '@/components';
import React from 'react';
import Image from 'next/image';
import heroImage from '../../../../public/images/hero2.webp';

export const HeroSection = () => {
  return (
    <SectionContainer>
      <div className="relative flex justify-center m-auto">
        <div className="relative h-[calc(100vw*0.58)] w-full">
          <Image
            priority
            src={heroImage}
            fill
            alt="hero"
            sizes="100vw-50px"
            className="object-contain w-full"
          />
        </div>
        <MyLink
          variant="light"
          href="/"
          className="absolute sm:bottom-10 bottom-5  px-10 max-w-55 text-center w-full  ml-auto left-[50%] -translate-x-[50%]"
        >
          Discover Gallery
        </MyLink>
      </div>
    </SectionContainer>
  );
};
