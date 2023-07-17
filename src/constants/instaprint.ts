import { ProductType } from './products';
import {CartProduct} from '../types/products';

export const INSTAPRINT_PRODUCT_ID = 216;
export const IG_BACKEND_ACCESS_TOKEN_ENDPOINT = '/api/instaprint/get-access-token';
export const IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'instaUserAccessToken';
export const IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY = 'instaUserMediaData';
export const INSTAPRINT_PRODUCT_PLACEHOLDER:CartProduct = {
  productTitle: 'Instaprint',
  productId: INSTAPRINT_PRODUCT_ID,
  quantity: 1,
  productType: ProductType.INSTAPRINT,
  instaprint: {
    media_id: null,
    mat: false,
    frame: true,
  },
};
