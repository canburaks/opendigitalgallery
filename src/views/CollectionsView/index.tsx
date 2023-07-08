import { CollectionCard, Headline, SectionContainer } from '@/components';
import { useCollections } from '@/data/hooks';
import React from 'react';

export const CollectionsView = () => {
  const { data: collectionsData } = useCollections();

  return (
    <SectionContainer>
      <Headline className="pt-6 pb-10 text-center">Collections</Headline>
      <div className="grid break1000:grid-cols-3 break600:grid-cols-2  gap-8 ">
        {collectionsData?.data?.map((collection) => (
          <CollectionCard key={collection.collection_id} {...collection} />
        ))}
      </div>
    </SectionContainer>
  );
};
