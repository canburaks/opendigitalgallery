import Head from 'next/head';
import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import {
  POSTERS_REFETCH_COUNT,
  queryKeys,
  queryStaleDuration,
  revalidateDuration,
} from '@/constants';
import { CollectionDetailView } from '@/views';
import { getCollection, getCollections, getInfiniteCollectionPosters } from '@/data/hooks';

const CollectionDetail = () => {
  return (
    <>
      <Head>
        <title>Collection</title>
        <meta name="description" content="Gradoo Blog Detail Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <CollectionDetailView />
      </main>
    </>
  );
};

export async function getStaticProps(context: GetStaticProps) {
  // eslint-disable-next-line
  const ctx: any = context; // can't fix. Generics doesn't work as it suppose to
  const handle = ctx.params.handle;

  try {
    const queryClient = new QueryClient();

    const collection = await getCollection(handle);

    if (!collection || collection.error) {
      return { redirect: { destination: '/' } };
    }
    const collectionID = collection.data[0].collection_id;

    // Populate Cache : Collection Data
    await queryClient.prefetchQuery([queryKeys.collections, handle], () => getCollection(handle));

    // Populate Cache: Collection Products
    await queryClient.prefetchInfiniteQuery(
      [queryKeys.collectionPosters, collectionID],
      () =>
        getInfiniteCollectionPosters({
          from: 0,
          to: POSTERS_REFETCH_COUNT - 1,
          collectionID,
        }),

      {
        staleTime: queryStaleDuration,
      }
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        revalidate: revalidateDuration,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
}

export default CollectionDetail;

export async function getStaticPaths() {
  try {
    const collectionHandles = await getCollections();

    if (!collectionHandles || !collectionHandles.data) return { paths: [], fallback: true };

    const paths = collectionHandles.data.map((collection) => {
      return {
        params: { handle: collection.handle },
      };
    });

    return { paths, fallback: true };
  } catch {
    return { paths: [], fallback: true };
  }
}
