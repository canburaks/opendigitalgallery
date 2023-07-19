import Image, { ImageProps } from 'next/image';
import { FC, useEffect, useState } from 'react';

const fallbackSrc = '/images/fallback.jpg';
export const ImageWithFallback: FC<ImageProps> = ({ src, ...rest }) => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={rest.alt || 'image'}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
    />
  );
};
