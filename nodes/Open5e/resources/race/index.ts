import type { INodeProperties } from 'n8n-workflow';
import { raceGetManyDescription } from './getMany';
import { raceGetDescription } from './get';
import { raceSearchDescription } from './search';

const showOnlyForRaces = {
	resource: ['race'],
};

export const raceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRaces,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many races',
				description: 'Get many races from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/races',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a race',
				description: 'Get a single race by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/races/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search races',
				description: 'Search for races by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/races',
					},
				},
			},
		],
		default: 'getMany',
	},
	...raceGetManyDescription,
	...raceGetDescription,
	...raceSearchDescription,
];
