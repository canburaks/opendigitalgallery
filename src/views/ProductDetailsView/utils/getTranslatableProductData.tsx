import { LocaleType, ProductDetails, TranslatableFields } from '@/types';
import { DEFAULT_LOCALE } from '@/constants';

export function getTranslatableProductData(
  product: Partial<ProductDetails>,
  locale: LocaleType
): TranslatableFields {
  {
    const currentTranslation: TranslatableFields | any = product?.translations?.find(
      (t) => t.translation_language === locale
    );

    if (currentTranslation !== undefined) {
      return currentTranslation;
    }
    return {
      product_id: product.product_id!,
      title: product.title!,
      description: product.default_description_html || product.default_description!,
      translation_language: DEFAULT_LOCALE!,
      meta_description: product.default_meta_description!,
      meta_title: product.default_meta_title!,
      created_at: product.created_at!,
      updated_at: product.updated_at!,
    };
  }
}
