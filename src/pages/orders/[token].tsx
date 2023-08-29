import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType } from '@/types';
import { NextApiRequest } from 'next';
import { OrderView } from '@/views';

export default function OrderTokenPage() {
  return (
    <>
      <Head>
        <title>Open Digital Gallery</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Checkout screen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <OrderView />
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { req: NextApiRequest; locale: LocaleType }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
