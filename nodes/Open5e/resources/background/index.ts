import type { INodeProperties } from 'n8n-workflow';
import { backgroundGetManyDescription } from './getMany';
import { backgroundGetDescription } from './get';
import { backgroundSearchDescription } from './search';

const showOnlyForBackgrounds = {
	resource: ['background'],
};

export const backgroundDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBackgrounds,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many backgrounds',
				description: 'Get many backgrounds from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/backgrounds',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a background',
				description: 'Get a single background by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/backgrounds/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search backgrounds',
				description: 'Search for backgrounds by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/backgrounds',
					},
				},
			},
		],
		default: 'getMany',
	},
	...backgroundGetManyDescription,
	...backgroundGetDescription,
	...backgroundSearchDescription,
];
