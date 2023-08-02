import Head from 'next/head';
import { getAllPoliciesForHome } from '@/data/wordpressClient';
import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
import { TRX } from '@/constants';
import { PoliciesView } from '@/views';
import { LocaleType } from '@/types';
import nextI18NextConfig from '../../../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PoliciesIndex({ policies: { edges } }: any) {
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
        <PoliciesView policies={edges} />
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: LocaleType }) => {
  // console.log('locale', locale);
  const policies = await getAllPoliciesForHome(false, locale as LocaleType);

  return {
    props: {
      policies,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 10,
  };
};
