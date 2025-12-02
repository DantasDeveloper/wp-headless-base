// WordPress API Types

export interface WPRendered {
  rendered: string;
}

export interface WPFeaturedMedia {
  source_url: string;
  alt_text?: string;
  media_details?: {
    width: number;
    height: number;
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: {
    [key: string]: string;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
}

export interface WPEmbedded {
  "wp:featuredmedia"?: WPFeaturedMedia[];
  "wp:term"?: WPCategory[][];
  author?: WPAuthor[];
}

export interface WPPost {
  id: number;
  slug: string;
  title: WPRendered;
  excerpt: WPRendered;
  content?: WPRendered;
  date: string;
  modified?: string;
  author?: number;
  featured_media?: number;
  categories?: number[];
  tags?: number[];
  _embedded?: WPEmbedded;
}

export interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  date: string;
  modified?: string;
  _embedded?: WPEmbedded;
}

// Helper type for pagination
export interface WPPaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
}
