import { InstaprintFrameOptionsEnum } from '@/constants';
// import { ProductType } from './products';
import { InstaprintProduct } from '../types';

export const INSTAPRINT_PRODUCT_HANDLE = 'instaprint';
export const INSTAPRINT_PRODUCT_ID = 216;
export const IG_BACKEND_ACCESS_TOKEN_ENDPOINT = '/api/instaprint/get-access-token';
export const IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'instaUserAccessToken';
export const IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY = 'instaUserMediaData';

// SIZING
export const UNIT_WIDTH_CM = 10; // 1 unit width = 1 cm
export const FRAME_THICKNESS = 1.5 * UNIT_WIDTH_CM;
export const MAT_THICKNESS = 5 * UNIT_WIDTH_CM;
export const PRINT_WIDTH_CM = 20 * UNIT_WIDTH_CM;
export const PRINT_HEIGHT_CM = 20 * UNIT_WIDTH_CM;
export const PRINT_HEIGHT_CM2 = 25 * UNIT_WIDTH_CM;

// Those product option id's are specific for instaprint product
export const INSTAPRINT_PRODUCT_OPTION_IDS = [5, 6, 7, 8];

export const INSTAPRINT_PRODUCT_OPTIONS_MAP = {
  SQUARE: 5,
  RECTANGLE: 6,
};

export const INSTAPRINT_FRAME_OPTIONS_MAP = {
  SQUARE: INSTAPRINT_PRODUCT_OPTIONS_MAP.SQUARE,
  RECTANGLE: INSTAPRINT_PRODUCT_OPTIONS_MAP.RECTANGLE,
  MAT_SQUARE: 7,
  MAT_RECTANGLE: 8,
};

export const INSTAPRINT_PRODUCT_PLACEHOLDER: InstaprintProduct = {
  // productTitle: 'Instaprint',
  productId: INSTAPRINT_PRODUCT_ID,
  priceId: -1,
  quantity: 1,
  instaprint: {
    mat: '',
    frame: InstaprintFrameOptionsEnum.NO_FRAME,
    ratio: 1,
  },
};
