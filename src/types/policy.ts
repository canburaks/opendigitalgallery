import { LocaleType } from '@/types/locale';

interface Node {
  id: string;
}

export type PolicyIdType = 'DATABASE_ID' | 'SLUG';

export type PolicyStatus = 'publish' | 'draft' | 'future' | 'pending' | 'private';

/*
 * IMPORTANT
 * There should be only one Policy category and
 * the name value of it must only be one of the locales.
 * */
export interface PolicyCategoryConnection {
  edges: PolicyCategoryNode[];
}

export interface PolicyCategory {
  node: PolicyCategoryNode;
}
export interface PolicyCategoryNode {
  id?: string;
  name: LocaleType;
}

export type PolicyPreviewNode = {
  Policy: PolicyPreview;
};

export interface PolicyPreview extends Node {
  id: string;
  title: string;
  databaseId: number;
  slug: string;
  status: PolicyStatus;
}

export interface PolicyConnection {
  edges: PolicyNode[];
}

export interface PolicyNode extends Node {
  node: PolicyType;
}

export type PolicyType = {
  id?: string;
  categories: { edges: { node: { name: LocaleType; id: string } }[] };
  slug: string;
  tags: { edges: { node: { name: string; id: string } }[] };
  title: string;
  content: string;
};
