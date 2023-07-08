import { queryKeys } from '@/constants';
import { getCountries } from '@/data/hooks';
import { ProfileView } from '@/views';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProfileView />
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKeys.countries], () =>
    getCountries({ select: ['name', 'country_id'] })
  );

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
