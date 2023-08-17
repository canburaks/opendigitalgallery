import Head from 'next/head';
import { getAllPoliciesByLanguage } from '@/data/clients/wordpressClient';
import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
import { TRX } from '@/constants';
import { PoliciesView } from '@/views';
import { LocaleType, PolicyNode, PolicyType, PolicyConnection } from '@/types';
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
  let policies = await getAllPoliciesByLanguage(false, locale as LocaleType);
  function modifySlugs(policies: PolicyConnection) {
    return {
      ...policies,
      edges: policies.edges.map((pn: PolicyNode) => {
        /**
         * Because we can not set the same slug for a policy with different language in WordPress
         * We must set the same slug for all languages in WordPress.
         *
         * For example: Gizliliz Politikası and Privacy Policy have different slug value in WordPress.
         * In order to language changes to be set effectively, we must set the same slug.
         * Let say 'privacy-policy', for those two policies.
         *
         * General tagging pattern in WordPress CMS for policies is like that
         * Every policy page has exactly two tags:
         * - The first tag for any policy page is 'policy'
         * - The second tag starts with 'policy-' and ends with the same suffix for the same policies but with different languages.
         *   'policy-privacy' is the tag name for those two policies above. Others are: 'policy-tos', 'policy-distant-selling', etc..
         */

        const slugTagNode = pn?.node?.tags?.edges.find((t: any) =>
          t.node.name.startsWith('policy-')
        );

        return {
          node: {
            ...(pn.node as PolicyType),
            ...(slugTagNode && { slug: slugTagNode.node.name }),
          },
        };
      }),
    };
  }
  policies = modifySlugs(policies);

  return {
    props: {
      policies,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 10,
  };
};
