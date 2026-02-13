import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
} from 'n8n-workflow';

export async function getSections(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const returnData: INodeListSearchResult = {
		results: [],
	};

	const qs: IDataObject = {
		limit: 100,
	};

	if (filter) {
		qs.search = filter;
	}

	const response = (await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.open5e.com/v1/sections',
		qs,
		json: true,
	})) as { results: Array<{ slug: string; name: string }> };

	for (const item of response.results) {
		returnData.results.push({
			name: item.name,
			value: item.slug,
			url: `https://api.open5e.com/v1/sections/${item.slug}`,
		});
	}

	return returnData;
}
