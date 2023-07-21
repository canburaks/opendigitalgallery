import { InstaprintFrameOptionsEnum } from '@/constants';
import { ProductType } from './products';
import { CartProduct, FrameOptionsSelectUnionType } from '../types';

export const INSTAPRINT_PRODUCT_ID = 216;
export const IG_BACKEND_ACCESS_TOKEN_ENDPOINT = '/api/instaprint/get-access-token';
export const IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'instaUserAccessToken';
export const IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY = 'instaUserMediaData';

export const INSTAPRINT_PRODUCT_PLACEHOLDER: CartProduct = {
  productTitle: 'Instaprint',
  productId: INSTAPRINT_PRODUCT_ID,
  quantity: 1,
  productType: ProductType.INSTAPRINT,
  instaprint: {
    mat: "",
    frame: InstaprintFrameOptionsEnum.NO_FRAME,
  },
};

// SIZING
export const UNIT_WIDTH_CM = 10;
export const FRAME_THICKNESS = 2 * UNIT_WIDTH_CM;
export const MAT_THICKNESS = 5 * UNIT_WIDTH_CM;
export const PRINT_WIDTH_CM = 20 * UNIT_WIDTH_CM;
export const PRINT_HEIGHT_CM = 20 * UNIT_WIDTH_CM;
export const PRINT_HEIGHT_CM2 = 25 * UNIT_WIDTH_CM;