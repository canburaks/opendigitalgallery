import { BodyL, Headline, Loading, ProductCard, SectionContainer } from '@/components';
import { useCollection, useInfiniteCollectionPosters } from '@/data/hooks';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import map from 'lodash/map';
import InfiniteScroll from 'react-infinite-scroller';
import { DEFAULT_LOCALE, POSTERS_REFETCH_COUNT } from '@/constants';

export const CollectionDetailView = () => {
  const router = useRouter();
  const handle = router.query.handle as string;
  const { data: collectionData } = useCollection(handle, Boolean(handle));

  const collectionID = collectionData?.data && collectionData?.data[0].collection_id;

  const {
    data: infinitePosters,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteCollectionPosters(collectionID || 1, POSTERS_REFETCH_COUNT, Boolean(collectionID));

  const products = useMemo(() => {
    const list = map(infinitePosters, 'data').flat();
    return map(list, 'products');
  }, [infinitePosters]);

  if (!collectionData || !collectionData.data) {
    return null;
  }

  const countt = infinitePosters[0].count;

  return (
    <SectionContainer>
      {/* Headline */}
      <div className="mb-8 text-center">
        <Headline className="pt-6 pb-10">{collectionData.data[0].description} Collection</Headline>
        <BodyL>
          {router.locale === DEFAULT_LOCALE
            ? collectionData.data[0].detailed_description_en || ''
            : collectionData.data[0].detailed_description_tr || ''}
        </BodyL>
      </div>
      <InfiniteScroll
        loadMore={() => countt && countt > 0 && fetchNextPage()}
        hasMore={
          products.length < ((infinitePosters[0] && infinitePosters[0].count) || 50) || false
        }
      >
        <div className="grid break1000:grid-cols-4 break650:grid-cols-3 grid-cols-2 gap-8">
          {products.map((product) => {
            if (!product) {
              return null;
            }
            return <ProductCard key={product.handle} {...product} />;
          })}
        </div>
      </InfiniteScroll>
      {isFetchingNextPage && <Loading />}
    </SectionContainer>
  );
};
