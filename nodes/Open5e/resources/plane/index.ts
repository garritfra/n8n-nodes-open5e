import type { INodeProperties } from 'n8n-workflow';
import { planeGetManyDescription } from './getMany';
import { planeGetDescription } from './get';
import { planeSearchDescription } from './search';

const showOnlyForPlanes = {
	resource: ['plane'],
};

export const planeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPlanes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many planes',
				description: 'Get many planes from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/planes',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a plane',
				description: 'Get a single plane by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/planes/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search planes',
				description: 'Search for planes by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/planes',
					},
				},
			},
		],
		default: 'getMany',
	},
	...planeGetManyDescription,
	...planeGetDescription,
	...planeSearchDescription,
];
