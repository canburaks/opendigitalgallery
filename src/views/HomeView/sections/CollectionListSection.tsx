import { CollectionCard, SectionContainer } from '@/components';
import { useCollections } from '@/data/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export const CollectionListSection = () => {
  const { data: collectionData, isLoading } = useCollections();

  if (!collectionData || collectionData.error) {
    return null;
  }

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 break600:grid-cols-2 gap-8 pt-10 pb-20 max-w-[1000px] m-auto">
        {collectionData?.data?.map((collection) => (
          <CollectionCard key={collection.collection_id} {...collection} />
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center p-10">
          <CircularProgress />
        </div>
      )}
    </SectionContainer>
  );
};
