import type { INodeProperties } from 'n8n-workflow';
import { weaponGetManyDescription } from './getMany';
import { weaponGetDescription } from './get';
import { weaponSearchDescription } from './search';

const showOnlyForWeapons = {
	resource: ['weapon'],
};

export const weaponDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWeapons,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many weapons',
				description: 'Get many weapons from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/weapons',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a weapon',
				description: 'Get a single weapon by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/weapons/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search weapons',
				description: 'Search for weapons by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/weapons',
					},
				},
			},
		],
		default: 'getMany',
	},
	...weaponGetManyDescription,
	...weaponGetDescription,
	...weaponSearchDescription,
];
