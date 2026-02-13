import type { INodeProperties } from 'n8n-workflow';
import { classGetManyDescription } from './getMany';
import { classGetDescription } from './get';
import { classSearchDescription } from './search';

const showOnlyForClasss = {
	resource: ['class'],
};

export const classDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForClasss,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many classs',
				description: 'Get many classs from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/classes',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a class',
				description: 'Get a single class by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/classes/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search classs',
				description: 'Search for classs by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/classes',
					},
				},
			},
		],
		default: 'getMany',
	},
	...classGetManyDescription,
	...classGetDescription,
	...classSearchDescription,
];
