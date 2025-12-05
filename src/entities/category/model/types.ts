export type CategorySlug = 'cases' | 'audio' | 'glass' | 'chargers' | 'other';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description?: string;
  parentId?: string | null;
}
