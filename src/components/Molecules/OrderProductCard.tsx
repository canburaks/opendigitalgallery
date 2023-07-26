import React, { FC } from 'react';
import { BodyS, ImageWithFallback } from '../Atoms';
import cx from 'classnames';
import { PRODUCT_IMAGE_RATIO } from '@/constants';
import { Product } from '@/types';

type CartProductListProps = {
  className?: string;
  size?: string;
  quantity: number;
  price?: number;
  layout?: 'vertical' | 'horizontal';
  currency?: string;
} & Partial<Product>;

export const OrderProductCard: FC<CartProductListProps> = ({
  layout = 'horizontal',
  className,
  default_image_url,
  default_image_alt,
  price,
  title,
  size,
  quantity,
  currency,
}) => {
  return (
    <div className={cx('flex flex-col gap-8', className)}>
      <div>
        <div className="flex gap-8 items-center w-full">
          <ImageWithFallback
            src={default_image_url || ''}
            alt={default_image_alt || ''}
            className="flex-[1]"
            width={60 * PRODUCT_IMAGE_RATIO}
            height={60}
          />
          <div className="flex flex-col justify-between flex-[4]">
            <BodyS>{title}</BodyS>
            {size && <BodyS>Size: {size}</BodyS>}
          </div>
          <div
            className={cx('flex-[3] hidden', {
              ' !flex': layout === 'vertical',
            })}
          ></div>
          <BodyS
            className={cx('flex-[1] ', {
              'text-lg': layout === 'horizontal',
            })}
          >
            {price && price * quantity} {currency}
          </BodyS>
        </div>
        <div
          className={cx('flex-[3] flex justify-end', {
            hidden: layout === 'vertical',
          })}
        >
          {quantity}
        </div>
      </div>
    </div>
  );
};
