import type { INodeProperties } from 'n8n-workflow';
import { magicItemGetManyDescription } from './getMany';
import { magicItemGetDescription } from './get';
import { magicItemSearchDescription } from './search';

const showOnlyForMagicItems = {
	resource: ['magicItem'],
};

export const magicItemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMagicItems,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many magic items',
				description: 'Get many magic items from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/magicitems',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a magic item',
				description: 'Get a single magic item by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/magicitems/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search magic items',
				description: 'Search for magic items by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/magicitems',
					},
				},
			},
		],
		default: 'getMany',
	},
	...magicItemGetManyDescription,
	...magicItemGetDescription,
	...magicItemSearchDescription,
];
