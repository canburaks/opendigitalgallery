import React from 'react';
import Head from 'next/head';
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
