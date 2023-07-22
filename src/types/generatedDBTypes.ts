import { getProductTranslations } from '@/data/hooks';
import { Database } from './database';
import { MergedProductOption } from '@/types/products';
import { getProductImages } from '@/data/hooks/useProductImages';
import { getProductPrices } from '@/data/hooks/useProductPrices';
import { getProductOptions } from '@/data/hooks/useProductOptions';
import { getOrders } from '@/data/hooks/useOrders';

// Common
export type Tables = Database['public'];

// Table: Products
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductOptions = Database['public']['Tables']['product_options']['Row'];
export type ProductImage = Database['public']['Tables']['product_images']['Row'];
export type ProductTranslations = Database['public']['Tables']['product_translations']['Row'];
export type ProductPriceOptions = Database['public']['Tables']['prices']['Row'];
export type ProductTable = Database['public']['Tables']['products'];

export type ProductImageResponse = Awaited<ReturnType<typeof getProductImages>>;
export type ProductImageResponseSuccess = ProductImageResponse['data'];
export type ProductImageResponseError = ProductImageResponse['error'];

export type ProductTranslationsResponse = Awaited<ReturnType<typeof getProductTranslations>>;
export type ProductTranslationsResponseSuccess = ProductTranslationsResponse['data'];
export type ProductTranslationsResponseError = ProductTranslationsResponse['error'];

export interface ProductDetails extends Partial<Product> {
  images?: ProductImage[];
  translations?: ProductTranslations[];
  prices?: ProductPriceOptions[];
  options?: MergedProductOption[];
  frames?: Product[];
}
// Table: Countries
export type Country = Database['public']['Tables']['countries']['Row'];
export type CountrTable = Database['public']['Tables']['countries'];
export type Countries = Country[];

// Table: Addresses
export type Address = Database['public']['Tables']['addresses']['Row'];
export type AddressTable = Database['public']['Tables']['addresses'];
export type Addresses = Address[];

// Table: Collections
export type Collection = Database['public']['Tables']['collections']['Row'];
export type CollectionTable = Database['public']['Tables']['collections'];
export type Collections = Collection[];

// Table: Prices
export type Price = Database['public']['Tables']['prices']['Row'];
export type Prices = Price[];

export type ProductPricesResponse = Awaited<ReturnType<typeof getProductPrices>>;
export type ProductPricesResponseSuccess = ProductPricesResponse['data'];
export type ProductPricesResponseError = ProductPricesResponse['error'];
export type ProductOptionsResponse = Awaited<ReturnType<typeof getProductOptions>>;

export type OrderType = Database['public']['Tables']['orders']['Row'];
export type OrderInsertType = Database['public']['Tables']['orders']['Insert'];
export type OrderResponseType = Awaited<ReturnType<typeof getOrders>>;
export type OrderResponseSuccess = OrderResponseType['data'];
export type OrderResponseError = OrderResponseType['error'];

// Table: Cart
export type Cart = Database['public']['Tables']['carts']['Row'];

// Table: Cart Details
export type CartDetail = Database['public']['Tables']['cart_details']['Row'];
