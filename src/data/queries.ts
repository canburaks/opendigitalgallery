// Products
export const PRODUCT_FULL_QUERY_SELECT =
  '*, prices(*), images:product_images(*), translations:product_translations(*)';

export const PRODUCT_LIST_ITEM_QUERY_SELECT =
  'handle, default_image_url, default_image_alt, product_id, title, prices(*)';

export const COLLECTION_PRODUCT_LIST_ITEM_QUERY_SELECT =
  'collections(*), products(title, handle,default_image_url,created_at), collection_id, product_id';

export const SEARCH_POSTERS_INCLUDED_COLUMNS = 'title';

export const ORDER_QUERY = '*, order_status(order_status_id, description)';

export const INSTAPRINT_PRODUCT_QUERY_SELECT = 'handle, product_id, tags, title, product_type_id, prices(country_id, price_id, product_id, product_option_id, is_active, price, currency, shipping_cost)';