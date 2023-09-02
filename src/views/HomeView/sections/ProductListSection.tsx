import { BodyL, MyLink, ProductCard, SectionContainer } from '@/components';
import { useInfiniteFeaturedPosters } from '@/data/hooks';
import React, { FC, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import map from 'lodash/map';
import { CircularProgress } from '@mui/material';
import { FEATURED_PRODUCT_REFETCH_COUNT } from '@/constants';

export const ProductListSection: FC = () => {
  const {
    data: infinitePoster,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteFeaturedPosters(FEATURED_PRODUCT_REFETCH_COUNT);

  const products = useMemo(() => {
    return map(infinitePoster, 'data').flat();
  }, [infinitePoster]);

  const hasMoreProduct = useMemo(() => {
    const allTableLength = (infinitePoster && infinitePoster[0] && infinitePoster[0].count) || 0;
    if (allTableLength <= products.length || products.length > 50) {
      return false;
    } else {
      return true;
    }
  }, [infinitePoster, products.length]);

  return (
    <SectionContainer>
      <div className="text-center mt-8 flex max-w-[600px] m-auto flex-col">
        <BodyL>
          Open Digital Gallery is a platform where art lovers can find original works for their
          daily living spaces. Explore the collections we have prepared for you now.
        </BodyL>
      </div>
      <MyLink
        text="Explore the collections"
        href="/collections"
        variant="dark"
        className="w-70 m-auto my-12"
      />

      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasMoreProduct}>
        <div className="grid break1000:grid-cols-4 break650:grid-cols-3 grid-cols-2 gap-8">
          {products.map((product: any) => {
            if (!product) {
              return null;
            }
            return <ProductCard key={product.product_id} {...product} />;
          })}
        </div>
      </InfiniteScroll>
      {isFetchingNextPage && (
        <div className="flex justify-center w-full py-20">
          <CircularProgress />
        </div>
      )}

      <MyLink href="/art-prints" text="Tümünü görüntüle" className="w-70 m-auto my-16" />
    </SectionContainer>
  );
};
