import { BodyL, Headline, SectionContainer } from '@/components';
import React, { FC } from 'react';
import cx from 'classnames';

interface HeroSectionProps {
  className?: string;
  headline: string;
  body: string;
}

export const HeroSection: FC<HeroSectionProps> = ({ headline, body, className }) => {
  return (
    <SectionContainer>
      <div className="text-center">
        <img
          src="images/hero2.webp"
          alt="hero"
          className={cx('w-full object-cover aspect-[946/400] bg-center', className)}
        />
        <Headline className="py-8">{headline}</Headline>
        <BodyL className="max-w-[900px] m-auto">{body}</BodyL>
      </div>
    </SectionContainer>
  );
};
