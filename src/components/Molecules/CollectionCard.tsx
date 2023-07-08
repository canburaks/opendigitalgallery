import React, { FC } from 'react';
import { BodyL } from '../Atoms/Typographies';
import { Collection } from '@/types';
import { LinkComponent } from '../Atoms';
import Image from 'next/image';

export const CollectionCard: FC<Collection> = ({
  default_image_alt,
  default_image_url,
  description,
}) => {
  return (
    <LinkComponent className="w-full group">
      <div className="border-1 border-solid border-gray-100">
        <div className="w-full relative h-[300px] break500:h-[500px] break1000:h-[800px] overflow-hidden mb-2  ">
          <Image
            src={default_image_url || ''}
            alt={default_image_alt || ''}
            sizes="800px"
            fill
            className="w-full object-contain  group-hover:scale-105 duration-1000"
          />
        </div>
        <BodyL className="px-7 py-5 bg-gray-200">{description}</BodyL>
      </div>
    </LinkComponent>
  );
};
