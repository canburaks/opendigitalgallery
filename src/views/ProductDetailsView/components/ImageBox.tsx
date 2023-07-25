import React from 'react';
import {
  PRODUCT_IMAGE_RATIO,
  PRODUCT_MAIN_IMAGE_WIDTH,
  PRODUCT_THUMB_IMAGE_WIDTH,
} from '@/constants';
import { Tab } from '@headlessui/react';
import { ProductImage } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '@/components';
import { PRODUCT_IMAGE_PLACEHOLDER, PRODUCT_IMAGE_ALT, PRODUCT_THUMB_IMAGE_HEIGHT } from '@/constants';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  productId?: number;
  images: ProductImage[];
  defaultAltText?: string;
};

const ImageBoxComponent = ({ productId, images, defaultAltText }: Props) => (
  <Tab.Group as="div" className="flex flex-col-reverse min-h-full">
    {/* Image selector */}
    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
      <Tab.List className="grid grid-cols-5 gap-4" style={{width: PRODUCT_MAIN_IMAGE_WIDTH}}>
        {images.map((image, ix: number) => (
          <Tab
            key={`${image.product_image_id}-pi-${ix}-${productId}`}
            className="relative flex min-h-32 h-full cursor-pointer items-center justify-center rounded-sm bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
          >
            {({ selected }) => (
              <>
                <span className="sr-only"> {image.alt} </span>
                <span className="absolute inset-0 overflow-hidden rounded-sm flex justify-center items-center">
                  <ImageWithFallback
                    width={PRODUCT_THUMB_IMAGE_WIDTH}
                    height={PRODUCT_THUMB_IMAGE_HEIGHT}
                    src={image.url}
                    style={{maxWidth: PRODUCT_THUMB_IMAGE_WIDTH}}
                    alt={image.alt || `${defaultAltText} ${ix + 1}`}
                    className="h-full object-cover object-center"
                  />
                </span>
                <span
                  className={classNames(
                    selected ? 'ring-indigo-500' : 'ring-transparent',
                    'pointer-events-none absolute inset-0  ring-2 ring-offset-2'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Tab>
        ))}
      </Tab.List>
    </div>

    <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
      <AnimatePresence>
        {images.map((image, ix: number) => (
          <Tab.Panel 
            key={`${image.product_image_id}--thumb-${ix}`} className="min-h-full flex justify-center items-center" 
            style={{width: PRODUCT_MAIN_IMAGE_WIDTH}}
          >
            <TabImage 
              src={image.url} 
              alt={image.alt || PRODUCT_IMAGE_ALT}
            />
            {/* <ImageWithFallback
              width={PRODUCT_MAIN_IMAGE_WIDTH}
              height={PRODUCT_MAIN_IMAGE_WIDTH / PRODUCT_IMAGE_RATIO }
              src={image.url}
              alt={image.alt || `${defaultAltText} ${ix + 1}`}
              className="h-full object-cover object-center"
            /> */}
            {/* <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={image.url || '/product-placeholder.svg'}
              alt={image.alt || defaultAltText}
              className="h-full w-full object-cover object-center sm:rounded-lg  min-h-full min-w-full"
              style={{ minHeight: PRODUCT_MAIN_IMAGE_WIDTH / PRODUCT_IMAGE_RATIO }}
            /> */}
          </Tab.Panel>
        ))}
      </AnimatePresence>
    </Tab.Panels>
  </Tab.Group>
);

const TabImage = ({ src, alt }: { src: string, alt?: string }) => {
  const [imageSrc, setImageSrc] = React.useState<string>(src);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{width:PRODUCT_MAIN_IMAGE_WIDTH, height: "100%" }} className='min-h-full'
    >

    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      src={imageSrc || PRODUCT_IMAGE_PLACEHOLDER}
      alt={alt}
      onError={() => setImageSrc(PRODUCT_IMAGE_PLACEHOLDER)}
      className="h-full w-full object-cover object-center sm:rounded-lg  min-h-full min-w-full"
      style={{ height: PRODUCT_MAIN_IMAGE_WIDTH / PRODUCT_IMAGE_RATIO }}
      />
      </motion.div>
      )
}

export const ImageBox = React.memo(
  ImageBoxComponent,
  (prevProps, nextProps) => prevProps.productId === nextProps.productId
);
