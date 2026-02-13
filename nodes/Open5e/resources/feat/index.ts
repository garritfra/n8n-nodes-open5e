import type { INodeProperties } from 'n8n-workflow';
import { featGetManyDescription } from './getMany';
import { featGetDescription } from './get';
import { featSearchDescription } from './search';

const showOnlyForFeats = {
	resource: ['feat'],
};

export const featDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFeats,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many feats',
				description: 'Get many feats from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/feats',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a feat',
				description: 'Get a single feat by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/feats/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search feats',
				description: 'Search for feats by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/feats',
					},
				},
			},
		],
		default: 'getMany',
	},
	...featGetManyDescription,
	...featGetDescription,
	...featSearchDescription,
];
