import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType, OrderQueryApiResponse } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { IYZICO_LOCAL_STORAGE_TOKEN, IYZICO_QUERY_RESPONSE_ENDPOINT } from '@/constants';
import { getUrl, parseOrderFromIyzicoResponse } from '@/utils';
import { getSupabaseBrowserClient } from '@/data/supabaseClient';
import { OrderCallbackView } from '@/views';
// import { loggerServer as logger } from '@/utils/logger/server';
export default function CheckoutCallback(props: { token: string | undefined }) {
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
    // Save the returned data to Supabase
    const setOrderResponse = (token: string, orderResponse: OrderQueryApiResponse) => {
      const orderData = parseOrderFromIyzicoResponse(orderResponse);
      if (orderData) {
        const client = getSupabaseBrowserClient();
        return client.from('orders').upsert(orderData).select('*');
      }
    };
    return fetch(getUrl() + IYZICO_QUERY_RESPONSE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }).then((res: Response) => res.json())
      .then((res: OrderQueryApiResponse | { [message: string]: string }) => {
        // console.log(`api response order query response: ${JSON.stringify(res)}`);
        /**
         * Save the returned data to Supabase
         * We redirect user to the corresponding checkout/token page.
         */
        return setOrderResponse(res.token, res)!
          .then((orderSetResponse) => {
            console.log("orderSetResponse", orderSetResponse);
            return {
              props: {
                token: token,
                ...(serverSideTranslations(locale, ['common'], nextI18NextConfig)),
              },
            }
          })
      })
      .catch(async (e) => {
        // console.error('Callback page server props token error:', e);
        console.log("callback page server props token error: ", e);
      })
      // .finally(() => {
      //   return {
      //     props: {
      //       token: token,
      //       ...(serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      //     },
      //   };
      // })
  }
  return {
    token: undefined,
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  };
};
