import { WebLinkBuilder } from "./link-builder.js";
import { DEFAULT_LIMIT, DEFAULT_PAGE, Link, LinkBuilder, Links, MAX_LIMIT, Navigation, PaginationOptions, PaginatorOptions } from "./types.js";

export function buildPagination(options: PaginationOptions): {
  limit: number;
  offset: number;
  order: string;
} {
  const page = Math.max(DEFAULT_PAGE, Number(options.page) || DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(DEFAULT_LIMIT, Number(options.limit) || DEFAULT_LIMIT)
  );
  const offset = (page - 1) * limit;

  const order = options.sort?.length && options.sort[0][0]
    ? options.sort
        .map(([col, dir]) => `${col.toLowerCase()} ${dir}`)
        .join(", ")
    : "id ASC";

  return { limit, offset, order };
}

const getLinks = (
	previous: number | null,
	next: number | null,
	first = DEFAULT_PAGE,
	last: number | null,
	linkBuilder: LinkBuilder
): Links => {
	return {
		prev: linkBuilder.getLink(previous),
		next: linkBuilder.getLink(next),
		first: linkBuilder.getLink(first),
		last: linkBuilder.getLink(last)
	};
};

export const getNavigation = (
	totalRecords: number,
	resultsPerPage: number,
	paginatorOptions: PaginatorOptions,
  queryLimit?: number
): Navigation => {
	const {
		page = DEFAULT_PAGE,
		pageSize = DEFAULT_LIMIT,
		linkBuilder
	} = paginatorOptions;

	const _page = Number(page);
	const _pageSize = Math.min(queryLimit || pageSize, MAX_LIMIT);;

	const first = DEFAULT_PAGE;
	const last = Math.abs(Math.ceil(totalRecords / pageSize));
	const previous = _page - 1 >= first ? _page - 1 : null;
	const next = _page + 1 <= last ? _page + 1 : null;

	return {
		pagination: {
      totalResults: totalRecords,
      page: _page,
      totalPages: last,
      resultsPerPage
    },
		links: getLinks(previous, next, first, last, linkBuilder)
	};
};

export const getPaginatorOptions = (originalUrl: string, page: number, pageSize: number) => {
	return originalUrl
		? {
				page,
				pageSize,
				linkBuilder: new WebLinkBuilder(originalUrl)
			}
		: {};
};