import React, { FC } from 'react';
import { BodyL, Headline, MyLink } from '../Atoms';

interface CollectionHeroProps {
  name: string;
  description: string;
  href: string;
  linkText: string;
  imgPath: string;
}

export const CollectionHero: FC<CollectionHeroProps> = ({
  name,
  description,
  href,
  linkText,
  imgPath,
}) => {
  return (
    <div className="flex items-center">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center text-center gap-5">
        <Headline>{name}</Headline>
        <BodyL className="max-w-[400px]">{description}</BodyL>
        <MyLink href={href} text={linkText} className="mt-5" />
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={imgPath}
          alt="product"
          className=" max-w-full  group-hover:scale-105 duration-1000"
        />
      </div>
    </div>
  );
};
