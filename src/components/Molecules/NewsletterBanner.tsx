import React, { FC } from 'react';
import { Body, Headline } from '../Atoms';

interface NewsletterBannerProps {
  headline: string;
  description: string;
}

export const NewsletterBanner: FC<NewsletterBannerProps> = ({ headline, description }) => {
  return (
    <div className="w-full bg-myGray-100 text-center py-16">
      <Headline className=" font-normal">{headline}</Headline>
      <Body className="mt-8 mb-4 text-myBlack">{description}</Body>
      <input
        placeholder="Email"
        className="h-12 w-[300px] px-3 outline-none border-gray-300 border-solid hover:border-gray-700"
      />
    </div>
  );
};
