import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/data/wordpressClient';
import { PostView } from '@/views';
import { LocaleType, PostCategory, PostType } from '@/types';
import nextI18NextConfig from '../../../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '@/constants';

// TODO : Post data doesnt pass here when generating pages fix it

export default function Post({
  post,
}: // posts,
{
  post: PostType;
}) {
  console.log('postINNERRR', post.title);
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{(post && post.title) || ''}</title>
        <meta name="description" content={(post && post.excerpt) || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PostView post={post} />
      </main>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticProps) {
  try {
    const { params, locale } = ctx as any;
    const data = await getPostAndMorePosts(params.slug, locale, false);
    return {
      props: {
        post: data.post,
        ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        post: {},
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  try {
    const allPosts = await getAllPostsWithSlug();
    console.log('getStaticPaths data', allPosts);

    const pathHandler = (post: PostType) => {
      const categories: PostCategory[] = post?.categories?.edges || [
        { node: { name: DEFAULT_LOCALE } },
      ];
      const category: PostCategory = categories[0];
      const postLanguage: string | LocaleType =
        category?.node?.name.toLowerCase() || DEFAULT_LOCALE!;

      if (postLanguage === DEFAULT_LOCALE) {
        return { params: { slug: post.slug } };
      } else {
        return { params: { slug: post.slug }, locale: postLanguage };
      }
    };

    const paths = allPosts.edges.map(({ node }: { node: any }) => pathHandler(node)) || [];
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
