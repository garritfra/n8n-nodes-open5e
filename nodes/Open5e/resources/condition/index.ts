import type { INodeProperties } from 'n8n-workflow';
import { conditionGetManyDescription } from './getMany';
import { conditionGetDescription } from './get';
import { conditionSearchDescription } from './search';

const showOnlyForConditions = {
	resource: ['condition'],
};

export const conditionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForConditions,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many conditions',
				description: 'Get many conditions from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/conditions',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a condition',
				description: 'Get a single condition by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/conditions/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search conditions',
				description: 'Search for conditions by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/conditions',
					},
				},
			},
		],
		default: 'getMany',
	},
	...conditionGetManyDescription,
	...conditionGetDescription,
	...conditionSearchDescription,
];
