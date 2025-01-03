import type { PostCategory } from '@/types';
import type { PostIdType, LocaleType } from '@/types';
import { DEFAULT_LOCALE } from '@/constants';
import { PostPreviewNode } from '@/types';

const API_URL: string = process.env.WORDPRESS_API_URL!;

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  // console.log('json', json);
  if (json.errors) {
    console.error(json.errors, json.errors[0].locations);
    throw new Error('Failed to fetch API');
  }
  // console.log('json.data', json);
  return json.data;
}

export async function getPreviewPost(id: string | string[], idType: PostIdType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
        categories {edges{node{name}}}
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug(): Promise<{
  edges: { node: { slug: string; categories: { edges: PostCategory[] } } }[];
}> {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
            categories {edges{node{name}}}
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview: boolean, locale?: LocaleType) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, categoryName: "${
        locale || DEFAULT_LOCALE
      }" }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            categories {edges{node{name}}}
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(
  slug: string,
  locale: LocaleType,
  /// @ts-nocheck
  preview: Boolean,
  previewData?: PostPreviewNode
) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId ? Number(slug) === postPreview?.databaseId : slug === postPreview?.slug;
  const isDraft = isSamePost && postPreview?.status === 'draft';
  const isRevision = isSamePost && postPreview && postPreview.status === 'publish';
  // console.log('isRevision', isRevision, isDraft);
  // console.log('params', {
  //   id: isDraft ? postPreview.id : slug,
  //   idType: isDraft ? 'DATABASE_ID' : 'SLUG',
  // });
  const data = await fetchAPI(
    `fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            height
            width
          }
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  );
  // console.log('data12', data);

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }: { node: any }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
