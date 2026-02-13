import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
} from 'n8n-workflow';

export async function getSpells(
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
		url: 'https://api.open5e.com/v2/spells',
		qs,
		json: true,
	})) as { results: Array<{ key: string; name: string }> };

	for (const spell of response.results) {
		returnData.results.push({
			name: spell.name,
			value: spell.key,
			url: `https://api.open5e.com/v2/spells/${spell.key}`,
		});
	}

	return returnData;
}
