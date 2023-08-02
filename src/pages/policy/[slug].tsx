import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPoliciesWithSlug, getPostAndMorePosts } from '@/data/wordpressClient';
import { PolicyView } from '@/views';
import { LocaleType, PolicyCategory, PolicyType } from '@/types';
import nextI18NextConfig from '../../../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '@/constants';

// TODO : Post data doesnt pass here when generating pages fix it

export default function Policy({
  policy,
}: // posts,
  {
    policy: PolicyType;
  }) {
  console.log('postINNERRR', policy.title);
  const router = useRouter();
  if (!router.isFallback && !policy?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{(policy && policy.title) || ''}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PolicyView policy={policy} />
      </main>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticProps) {
  try {
    const { params, locale } = ctx as any;

    const allPolicies = await getAllPoliciesWithSlug();
    console.log('getStaticProps data', allPolicies);
    const policy = allPolicies.edges.find(({ node }: { node: PolicyType }) => node.slug === params.slug)?.node;

    
    return {
      props: {
        policy,
        ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        policy: {},
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  try {
    const allPolicies = await getAllPoliciesWithSlug();
    console.log('getStaticPaths data', allPolicies);

    const pathHandler = (policy: PolicyType) => {
      const categories: PolicyCategory[] = policy?.categories?.edges || [
        { node: { name: DEFAULT_LOCALE } },
      ];
      const category: PolicyCategory = categories[0];
      const policyLanguage: string | LocaleType =
        category?.node?.name.toLowerCase() || DEFAULT_LOCALE!;

      if (policyLanguage === DEFAULT_LOCALE) {
        return { params: { slug: policy.slug } };
      } else {
        return { params: { slug: policy.slug }, locale: policyLanguage };
      }
    };

    const paths = allPolicies.edges.map(({ node }: { node: PolicyType }) => pathHandler(node)) || [];
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}
