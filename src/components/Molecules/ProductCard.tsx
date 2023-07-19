import React, { FC } from 'react';
import { Body, BodyL } from '../Atoms/Typographies';
import { LinkComponent } from '../Atoms/LinkComponent';
import { Price, Product } from '@/types';
import { getLocaleValues } from '@/constants';
import { ImageWithFallback } from '../Atoms';

type ProductCard = {
  prices: Price[];
} & Partial<Product>;

export const ProductCard: FC<ProductCard> = ({
  prices,
  default_image_url,
  default_image_alt,
  handle,
  title,
}) => {
  const minPrice =
    prices && prices.length > 0 ? Math.min(...prices.map((item) => item.price)) : null;
  const { currency } = getLocaleValues();

  return (
    <LinkComponent className="w-full group  overflow-hidden" href={'/products/' + handle}>
      <>
        {/* Images */}
        <div className="relative break1000:h-[350px] break650:h-[300px] h-[200px]  overflow-hidden border-1 border-solid border-gray-100 ">
          <ImageWithFallback
            src={default_image_url || ''}
            alt={default_image_alt || ''}
            sizes="(max-width: 400px) 150px, (max-width: 650px) 200px, 300px"
            fill
            className="w-full object-contain group-hover:h-0 group-hover:opacity-0"
          />
          <ImageWithFallback
            src={default_image_url || ''}
            alt={default_image_alt || ''}
            sizes="(max-width: 400px) 150px, (max-width: 650px) 200px, 300px"
            fill
            className="h-0 group-hover:h-[unset] w-full object-contain group-hover:scale-105 duration-1000"
          />
        </div>

        {/* Price and Name */}
        <BodyL className="mt-2 border-1 border-white group-hover:border-black border-solid border-t-0 border-x-0 ">
          {title}
        </BodyL>
        {minPrice && (
          <Body className="mt-1">
            Başlangıç Fiyatı: {minPrice} {currency}
          </Body>
        )}
      </>
    </LinkComponent>
  );
};
