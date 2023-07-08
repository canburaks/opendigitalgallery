import React from 'react';
import { LinkComponent } from '@/components';
import { PostType } from '@/types';
import { motion } from 'framer-motion';

type Props = {
  post: PostType;
};

const variants = {
  hover: { y: -10, opacity: 1 },
  notHover: { y: 20, opacity: 0 },
};
const variantsTitle = {
  hover: { y: -10, opacity: 1 },
  notHover: { y: 10, opacity: 1 },
};

export function PostCard({ post }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const hovering = React.useCallback(() => setIsHovered(true), []);
  const notHovering = React.useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      onHoverStart={hovering}
      onHoverEnd={notHovering}
      className="post-card overflow-x-hidden relative group"
    >
      <img
        src={post?.featuredImage?.node?.sourceUrl}
        alt={post?.featuredImage?.node?.altText}
        className="min-w-full h-80 z-0"
      />

      <motion.div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-end p-4  rounded-md shadow-md">
        <LinkComponent
          href={`/posts/${post.slug}`}
          className="text-gray-200 no-underline cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 min-w-full min-h-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent z-0"></div>
        </LinkComponent>
        <motion.h3
          className="text-gray-200"
          variants={variantsTitle}
          animate={isHovered ? 'hover' : 'notHover'}
          initial="notHover"
        >
          <LinkComponent href={`/posts/${post.slug}`} className="text-gray-200 no-underline">
            {post.title}
          </LinkComponent>
        </motion.h3>
        <motion.div
          variants={variants}
          animate={isHovered ? 'hover' : 'notHover'}
          initial="notHover"
          className="text-gray-200 relative "
          dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0, 40) }}
        />
      </motion.div>
    </motion.div>
  );
}
