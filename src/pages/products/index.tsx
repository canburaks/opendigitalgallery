import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { queryKeys } from '@/constants';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSearchPosters } from '@/data/hooks';
import { GetServerSideProps } from 'next';
import { SearchProductsView } from '@/views';

export default function Products() {
  return (
    <>
      <Head>
        <title>Search Results</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchProductsView />
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSideProps) => {
  const { locale, query } = ctx as any;
  const queryClient = new QueryClient();
  try {
    // Populate Cache : Lists
    await queryClient.prefetchQuery([queryKeys.searchPosters, query.search], () =>
      getSearchPosters(query.search)
    );
  } catch {
    return {
      redirect: {
        destination: '/404',
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};
