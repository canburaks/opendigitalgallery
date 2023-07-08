import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Pagination, Parallax, Scrollbar } from 'swiper';
import { PostPreview } from '@/types';
import { LinkComponent } from '@/components';

type Props = {
  posts: PostPreview[];
};

export function PostCarousel({ posts }: Props) {
  const swiperParameters = {
    modules: [A11y, Autoplay, Keyboard, Pagination, Parallax, Scrollbar],
    threshold: 5,
    speed: 1200,
    watchSlidesProgress: true,
    observer: true,
    grabCursor: true,
    observeParents: true,
    scrollbar: true,
    parallax: { enabled: true },
    pagination: true,
    autoplay: { enabled: true },
    keyboard: { enabled: true },
  };
  return (
    <>
      {/* @ts-ignore */}
      <Swiper {...swiperParameters}>
        {posts.map((post: PostPreview, ix: number) => (
          <SwiperSlide key={post.title.replaceAll(' ', '-' + +ix)}>
            <img
              className="swiper-slide-image mix-blend-overlay"
              data-swiper-parallax="42%"
              alt={post?.featuredImage?.node?.altText}
              src={post?.featuredImage?.node?.sourceUrl}
            />
            <div className="swiper-slide-content">
              <LinkComponent href={`/posts/${post.slug}`} className="z-10">
                <div className="swiper-slide-title" data-swiper-parallax="-420">
                  {post.title}
                </div>
              </LinkComponent>

              <div
                className="swiper-slide-text z-10"
                data-swiper-parallax="-840"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <LinkComponent
                href={`/posts/${post.slug}`}
                className="text-gray-200 no-underline cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 min-w-full bg-[rgba(0,0,0,0.2)] z-0"></div>
              </LinkComponent>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
