import { CartProduct, Price } from '@/types';
import { InstaprintFrameOptionsEnum } from '@/constants';

export type InstagramTokenFunctionParams = {
  code: string;
  client_id: number | string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
};

export type IGMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
};

export interface InstaprintProduct extends CartProduct {
  /* NECESSARY INFORMATIONS FOR BACKEND*/
  productId: number;
  priceId: number;
  quantity: number;

  priceText?: string;
  priceNumber?: number;
  priceCurrency?: string;

  productPrice?: Partial<Price>;
  framePrice?: Partial<Price>;

  frameShippingPrice?: number;
  productShippingPrice?: number;

  frameProductId?: number;
  framePriceId?: number;
  instaprint?: {
    mediaId?: string;
    mediaUrl?: string;
    mat?: string | boolean;
    frame?: InstaprintFrameOptionsEnum;
    ratio?: number;
  };
}
