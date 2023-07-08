import { ProductCard, SectionContainer } from '@/components';
import { useInfinitePosters } from '@/data/hooks';
import React, { FC, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import map from 'lodash/map';
import { CircularProgress } from '@mui/material';
import { POSTERS_REFETCH_COUNT } from '@/constants';

export const ProductListSection: FC = () => {
  const {
    data: infinitePoster,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitePosters(POSTERS_REFETCH_COUNT);
  const products = useMemo(() => {
    return map(infinitePoster, 'data').flat();
  }, [infinitePoster]);

  const hasMoreProduct = useMemo(() => {
    const allTableLength = (infinitePoster && infinitePoster[0] && infinitePoster[0].count) || 0;

    if (allTableLength <= products.length) {
      return false;
    } else {
      return true;
    }
  }, [infinitePoster, products.length]);

  return (
    <SectionContainer>
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
    </SectionContainer>
  );
};
