import type { INodeProperties } from 'n8n-workflow';
import { monsterGetManyDescription } from './getMany';
import { monsterGetDescription } from './get';
import { monsterSearchDescription } from './search';

const showOnlyForMonsters = {
	resource: ['monster'],
};

export const monsterDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMonsters,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many monsters',
				description: 'Get many monsters from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/monsters',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a monster',
				description: 'Get a single monster by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/monsters/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search monsters',
				description: 'Search for monsters by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/monsters',
					},
				},
			},
		],
		default: 'getMany',
	},
	...monsterGetManyDescription,
	...monsterGetDescription,
	...monsterSearchDescription,
];
