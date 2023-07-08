import { Container } from '@mui/material';
// import { DEFAULT_LOCALE } from '@/constants';
// import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
import { PostCarousel, PostCard } from '@/views/BlogView/components';

type Props = {
  posts: any[];
};

export function PostsView({ posts }: Props) {
  // const { locale = DEFAULT_LOCALE } = useRouter();
  // const { t } = useTranslation('common');
  // const heroPost = posts[0]?.node;
  const carouselPosts = posts.map((p) => p.node);
  return (
    <div>
      <Container>
        <Container>
          {/*<Headline className="my-8 mt-12 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">*/}
          {/*  {t(TRX.BLOG.TITLE)}*/}
          {/*</Headline>*/}
          {/*<BodyX>{t(TRX.BLOG.DESCRIPTION)}</BodyX>*/}
          <PostCarousel posts={carouselPosts} />
          {posts.length > 0 && (
            <section className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:16 gap-y-20 md:gap-y-32 mb-32">
                {posts.map(({ node }: { node: any }) => (
                  <PostCard post={node} key={`post-${node.slug}`} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </Container>
    </div>
  );
}
