import { URLSearchParams } from 'url';
import { Link } from './types.js';

const PAGE_NUMBER_PARAM_KEY = 'page';

export class WebLinkBuilder {
	private params: string;
	private urlWithNoParams: string;

	constructor(url: string) {
		[this.urlWithNoParams, this.params] = url.split('?');
	}

	getLink(page: number): Link {
		return !page ? null : this.createUrlWithPageParam(page);
	}

	private createUrlWithPageParam(page: number): string {
		const urlSearchParameters = new URLSearchParams(this.params);

		if (!!page && urlSearchParameters.has(PAGE_NUMBER_PARAM_KEY)) {
			urlSearchParameters.delete(PAGE_NUMBER_PARAM_KEY);
		}

		urlSearchParameters.append(PAGE_NUMBER_PARAM_KEY, `${page}`);

		if (this.urlWithNoParams === '') {
			return `/${urlSearchParameters}`;
		}

		return decodeURIComponent(`${this.urlWithNoParams}?${urlSearchParameters}`);
	}
}
