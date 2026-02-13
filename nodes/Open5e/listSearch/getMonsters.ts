import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
} from 'n8n-workflow';

export async function getMonsters(
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
		url: 'https://api.open5e.com/v1/monsters',
		qs,
		json: true,
	})) as { results: Array<{ slug: string; name: string }> };

	for (const monster of response.results) {
		returnData.results.push({
			name: monster.name,
			value: monster.slug,
			url: `https://api.open5e.com/v1/monsters/${monster.slug}`,
		});
	}

	return returnData;
}
