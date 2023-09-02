import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType /*OrderQueryApiResponse*/ } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { IYZICO_LOCAL_STORAGE_TOKEN, IYZICO_QUERY_RESPONSE_ENDPOINT } from '@/constants';
import { getUrl } from '@/utils';
import { OrderCallbackView } from '@/views';

export interface CallbackProps {
  token: string | undefined;
}

export default function Callback(props: CallbackProps) {
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
        <OrderCallbackView {...props} />
      </main>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  locale,
}: {
  req: NextApiRequest;
  locale: LocaleType;
  res: NextApiResponse;
}) => {
  const token = req.cookies[IYZICO_LOCAL_STORAGE_TOKEN];

  if (token) {
    fetch(getUrl() + IYZICO_QUERY_RESPONSE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }).then((res: Response) => res.json());
    return {
      props: {
        token: token,
        ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      },
    };
  }
  return {
    token: undefined,
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  };
};
