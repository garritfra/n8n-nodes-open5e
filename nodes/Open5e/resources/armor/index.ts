import type { INodeProperties } from 'n8n-workflow';
import { armorGetManyDescription } from './getMany';
import { armorGetDescription } from './get';
import { armorSearchDescription } from './search';

const showOnlyForArmors = {
	resource: ['armor'],
};

export const armorDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForArmors,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many armor',
				description: 'Get many armor from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/armor',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get armor',
				description: 'Get a single armor by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/armor/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search armor',
				description: 'Search for armor by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/armor',
					},
				},
			},
		],
		default: 'getMany',
	},
	...armorGetManyDescription,
	...armorGetDescription,
	...armorSearchDescription,
];
