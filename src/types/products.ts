import { InstaprintFrameOptionsEnum } from '@/constants';
/*
 * MERGED PRODUCT OPTION
 * This is the interface for the merged product option.
 * The merged product is enhanced/merged version of country_product_option with default product options
 * */
export interface MergedProductOption {
  price_id: number;
  country_id: number;
  product_option_id: number;
  product_id: number;
  price: number;
  currency: string;
  option_name: string;
  option_value: string;
  option_description?: string;
  shipping_cost: number;
}

/*
 * CART PRODUCT
 * This interface is used to store the cart products in the localStorage
 * @productId: The id of the product
 * @productOptionId: The id of the product option (Example: [1,2,3,4] --> 70x50, 50x40...)
 * @frameOptionId: The id of the frame option: Same as product option id for frames [1,2,3,4]
 * @quantity: The quantity of the product
 *
 * */

export type FrameOptionsSelectUnionType = keyof typeof InstaprintFrameOptionsEnum

export interface CartProduct {
  /* NECESSARY INFORMATIONS FOR BACKEND*/
  productId: number;
  priceId: number;
  quantity: number;
};

/*
 * TRANSLATABLE FIELDS
 * */
export interface TranslatableFields {
  product_id: number;
  product_translation_id?: number;
  translation_language?: string;
  title: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}
