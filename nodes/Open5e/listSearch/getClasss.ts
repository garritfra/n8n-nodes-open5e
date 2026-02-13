import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
} from 'n8n-workflow';

export async function getClasss(
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

	const response = (await this.helpers.request({
		method: 'GET',
		url: 'https://api.open5e.com/v1/classes',
		qs,
		json: true,
	})) as { results: Array<{ slug: string; name: string }> };

	for (const cls of response.results) {
		returnData.results.push({
			name: cls.name,
			value: cls.slug,
			url: `https://api.open5e.com/v1/classes/${cls.slug}`,
		});
	}

	return returnData;
}
