import { ProductDetails } from '@/types';

export const PRODUCT_IMAGE_RATIO = 3 / 4; // w/h
export const PRODUCT_MAIN_IMAGE_WIDTH = 400;
export const PRODUCT_THUMB_IMAGE_WIDTH = 80;
export const PRODUCT_THUMB_IMAGE_HEIGHT = 120;
export const PRODUCT_DIMENSION_UNIT = 'cm';
// TODO: Change this placeholder image
export const PRODUCT_IMAGE_PLACEHOLDER = '/images/fallback-poster.avif';

export const FRAME_IMAGE_PLACEHOLDER =
  'https://verxgygbyoarytwtzexz.supabase.co/storage/v1/object/public/product-images-v2/black-frame-wood/black-frame-wood-1.jpg';

export const PRODUCT_IMAGE_ALT = 'Art prints and frame products';
/*
 * PRODUCT SIZE
 * We currently have only one option for a poster which is the size
 * */
export const PRODUCT_OPTION_TYPE = {
  SIZE: 'Size',
};

/*
 * PRODUCT TYPE
 * We currently have two types of products: POSTER and FRAME
 * */
export enum ProductType {
  POSTER = 1,
  FRAME = 2,
  INSTAPRINT = 3
}
export enum InstaprintFrameOptionsEnum {
  NO_FRAME = "NO_FRAME",
  BLACK = "BLACK",
  DARK_BROWN = "DARK_BROWN", 
  NATURAL = "NATURAL"
}

export const ProductBulkPurchaseLimits = [1, 2, 3, 4];

// If user doesn't want any frame, this is the default frame
export const NO_FRAME_PRODUCT: Partial<ProductDetails> = {
  product_id: -1,
  title: 'No frame',
  options: [
    {
      country_id: -1,
      product_id: -1,
      product_option_id: 1,
      price_id: -1,
      currency: '',
      price: 0,
      option_name: 'No frame',
      option_value: 'No frame',
      shipping_cost: 10,
    },
    {
      country_id: -1,
      product_id: -1,
      product_option_id: 2,
      price_id: -1,
      currency: '',
      price: 0,
      option_name: 'No frame',
      option_value: 'No frame',
      shipping_cost: 10,
    },
    {
      country_id: -1,
      product_id: -1,
      product_option_id: 3,
      price_id: -1,
      currency: '',
      price: 0,
      option_name: 'No frame',
      option_value: 'No frame',
      shipping_cost: 10,
    },
    {
      country_id: -1,
      product_id: -1,
      product_option_id: 4,
      price_id: -1,
      currency: '',
      price: 0,
      option_name: 'No frame',
      option_value: 'No frame',
      shipping_cost: 10,
    },
  ],
};


export const FRAME_PRODUCT_MAP = {
  [InstaprintFrameOptionsEnum.NO_FRAME]: NO_FRAME_PRODUCT,
  [InstaprintFrameOptionsEnum.BLACK]: {product_id: 213, handle: "black-frame-wood"},
  [InstaprintFrameOptionsEnum.DARK_BROWN]: {product_id: 214, handle: "dark-brown-frame-wood"},
  [InstaprintFrameOptionsEnum.NATURAL]: {product_id: 215, handle: "natural-frame-wood"},
}