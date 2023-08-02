import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPoliciesWithSlug, getAllPoliciesByLanguage } from '@/data/wordpressClient';
import { PolicyView } from '@/views';
import { LocaleType, PolicyCategory, PolicyType, PolicyConnection, PolicyNode } from '@/types';
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

    let policies = await getAllPoliciesWithSlug();
    policies = modifySlugs(policies)
    //console.log('\n\ngetStaticPaths data', JSON.stringify(policies));

    const policiesWithSameSlug = policies.edges.filter(({ node }: { node: PolicyType }) => node.slug === params.slug);
    const policy = policiesWithSameSlug.find((pn: PolicyNode) => pn.node.categories.edges[0].node.name.toLowerCase() === locale.toLowerCase())


    return {
      props: {
        policy: policy.node,
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
    let policies = await getAllPoliciesWithSlug();


    policies = modifySlugs(policies)

    const pathHandler = (policy: PolicyType) => {
      const categories: PolicyCategory[] = policy?.categories?.edges;
      const category: PolicyCategory = categories[0];
      const policyLanguage: string | LocaleType =
        category?.node?.name.toLowerCase() || DEFAULT_LOCALE!;

      if (policyLanguage === DEFAULT_LOCALE) {
        return { params: { slug: policy.slug } };
      } else {
        return { params: { slug: policy.slug }, locale: policyLanguage };
      }
    };

    const paths = policies.edges.map(({ node }: { node: PolicyType }) => pathHandler(node)) || [];
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

      const slugTagNode = pn?.node?.tags?.edges.find((t: any) => t.node.name.startsWith('policy-'));

      return {
        node: {
          ...(pn.node as PolicyType),
          ...(slugTagNode && ({ slug: slugTagNode.node.name }))
        }
      }
    })
  }
}