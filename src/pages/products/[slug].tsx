import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { ProductDetailsView } from '@/views/ProductDetailsView';

import { LOCALES_LIST, I18N, queryKeys, DEFAULT_LOCALE } from '@/constants';
import type { ProductDetails } from '@/types';
import { dehydrate, QueryClient, DehydratedState } from '@tanstack/react-query';
import {
  useProductDataFromQuery,
  getTranslatableProductData,
} from '@/views/ProductDetailsView/utils';
import { LocaleType, TranslatableFields } from '@/types';
import { useRouter } from 'next/router';
import { getProductOptions } from '@/data/hooks/useProductOptions';
import { getFrames } from '@/data/hooks';
import { getProductDetailByHandle } from '@/data/hooks/useProductDetailByHandle';
import { getPostersHandleList } from '@/data/services';

type Props = {
  slug: string;
  product?: ProductDetails;
  dehydratedState: DehydratedState;
  _nextI18Next: typeof nextI18NextConfig;
};

export default function ProductDetailsPage(props: Props) {
  const { locale = DEFAULT_LOCALE } = useRouter();
  const product = useProductDataFromQuery(props.slug);

  const translatedProduct: TranslatableFields | Partial<TranslatableFields> = product
    ? getTranslatableProductData(product, locale as LocaleType)
    : {};

  return (
    <>
      <Head>
        <title>{translatedProduct.meta_title}</title>
        <meta name="description" content={translatedProduct.meta_description || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{product && <ProductDetailsView />}</main>
    </>
  );
}

export const getStaticProps = async ({
  locale,
  params: { slug },
}: {
  locale: LocaleType;
  params: { slug: string };
}) => {
  const localeValues = locale === LOCALES_LIST[0] ? I18N[LOCALES_LIST[0]] : I18N[LOCALES_LIST[1]];
  const queryClient = new QueryClient();

  try {
    // Populate Cache : Lists
    await queryClient.prefetchQuery([slug], () =>
      getProductDetailByHandle(slug, localeValues.code)
    );
    await queryClient.prefetchQuery([queryKeys.productOptions], () => getProductOptions());
    await queryClient.prefetchQuery([queryKeys.frames], () => getFrames());
  } catch {
    return {
      redirect: {
        destination: '/404',
      },
    };
  }

  // const productData = product?.data?.length ? product.data[0] : {};
  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};

export const getI18nPaths = (slug: string) =>
  nextI18NextConfig.i18n.locales.map((lang: string) => ({
    locale: lang,
    params: {
      slug: slug,
    },
  }));

export const getStaticPaths = async () => {
  const products = await getPostersHandleList();
  const paths = products?.data?.map((product) => getI18nPaths(product.handle)).flat();
  return {
    paths,
    fallback: true,
  };
};
