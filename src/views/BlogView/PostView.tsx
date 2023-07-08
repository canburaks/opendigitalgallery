import { Container } from '@mui/material';
import { PostType } from '@/types';
import { HeadlineX } from '@/components';
import { motion } from 'framer-motion';

type Props = {
  post: PostType;
};

export function PostView({ post }: Props) {
  return (
    <Container className="mt-16 w-full flex flex-col items-center">
      <Container className="flex-col max-w-[720px]">
        <article className="mb-40 blog-post">
          <header className="my-4 flex flex-col items-center">
            <HeadlineX className="text-center !text-6xl font-black tracking-tighter leading-tight mb-1">
              {post.title}
            </HeadlineX>
            {/*<div className="flex justify-center items-center mt-4">*/}
            {/*  {post?.tags?.edges.map((tn) => tn.node.name)}*/}
            {/*</div>*/}
            <time className="text-center" dateTime={post.date}>
              {post.date && new Date(post?.date).toLocaleDateString()}
            </time>
            <div className="flex flex-col justify-center items-center">
              <div
                className="my-4 text-gray-800 text-center"
                dangerouslySetInnerHTML={{ __html: post?.excerpt }}
              />
            </div>
          </header>
          <motion.img
            initial={{ opacity: 0, y: 400 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-auto rounded-xl duration-500 ease-out mb-2 post-cover"
            style={{ width: '120%', marginLeft: '-10%' }}
            src={post.featuredImage?.node?.sourceUrl}
            alt={post.featuredImage?.node?.altText}
          />
          <div className="my-8 text-gray-800" dangerouslySetInnerHTML={{ __html: post.content! }} />
        </article>
      </Container>
    </Container>
  );
}
