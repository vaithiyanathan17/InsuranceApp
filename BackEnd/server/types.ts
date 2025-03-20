export interface SQLOperator {
    eq?: any;
    ne?: any;
    lt?: any;
    lte?: any;
    gt?: any;
    gte?: any;
  }
  
export interface PaginationOptions {
    page?: number;
    limit?: number;
    sort?: [string, 'ASC' | 'DESC'][];
  }
  
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;


export type QueryParams = {
  filter?: {
    name?: {
      eq?: string;
      ne?: string;
    };
    premium?: {
      eq?: number;
      ne?: number;
      gt?: number;
      gte?: number;
      lt?: number;
      lte?: number;
    };
    policyType?: {
      eq?: string;
      ne?: string;
    };
    coverage?: {
      eq?: number;
      ne?: number;
      gt?: number;
      gte?: number;
      lt?: number;
      lte?: number;
    };
  };
  page?: number;
  limit?: number;
  order?: string;
};


export type Link = string | null;

export interface LinkBuilder {
	getLink(page: number | null): Link;
}

export interface PaginatorOptions {
	page?: number;
	pageSize?: number;
	linkBuilder?: LinkBuilder;
}
export interface Pagination {
	totalResults: number;
	page: number;
	totalPages: number;
	resultsPerPage: number;
}

export interface Links {
	prev: Link;
	next: Link;
	first: Link;
	last: Link;
}

export interface Navigation {
	pagination: Pagination;
	links: Links;
}

export interface Result<T> {
	data: T[];
	totalCount: number;
}

export interface policy {
  id: number,
  name: string,
  type: string,
  premium: string,
  coverage: string
}