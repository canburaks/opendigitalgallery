import Head from 'next/head';
import { getAllPostsForHome } from '@/data/clients/wordpressClient';
import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
import { TRX } from '@/constants';
import { PostsView } from '@/views';
import { LocaleType } from '@/types';
import nextI18NextConfig from '../../../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Index({ allPosts: { edges } }: any) {
  // const { locale = DEFAULT_LOCALE } = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t(TRX.BLOG.META_TITLE)!}</title>
        <meta name="description" content={t(TRX.BLOG.META_DESCRIPTION)!} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PostsView posts={edges} />
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: LocaleType }) => {
  // console.log('locale', locale);
  const allPosts = await getAllPostsForHome(false, locale as LocaleType);

  return {
    props: {
      allPosts,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 10,
  };
};
