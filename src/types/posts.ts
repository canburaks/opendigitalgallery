import { LocaleType } from '@/types/locale';

interface Node {
  id: string;
}

export type PostIdType = 'DATABASE_ID' | 'SLUG';

export type RequestQuery = {
  secret: string | string[];
  id: string | string[];
  slug: string | string[];
};

export type PostStatus = 'publish' | 'draft' | 'future' | 'pending' | 'private';

/*
 * IMPORTANT
 * There should be only one post category and
 * the name value of it must only be one of the locales.
 * */
export interface PostCategory {
  node: PostCategoryNode;
}
export interface PostCategoryNode {
  name: LocaleType;
}

export type PostPreviewNode = {
  post: PostPreview;
};

export interface PostPreview extends Node {
  id: string;
  author: {
    node: {
      name: string;
      firstName: string;
      lastName: string;
      avatar: {
        url: string;
      };
    };
  };
  title: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  databaseId: number;
  slug: string;
  status: PostStatus;
}

export interface PostConnection {
  edges: PostNode[];
}

export interface PostNode extends Node {
  node: PostType;
}

export type PostType = {
  id: string;
  author?: {
    node: {
      name: string;
      firstName: string;
      lastName: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: { edges: PostCategory[] };
  databaseId?: number;
  date?: string;
  excerpt: string;
  slug: string;
  status: PostStatus;
  tags?: { edges: { node: { name: string } }[] };
  title: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  postId?: number;
};
