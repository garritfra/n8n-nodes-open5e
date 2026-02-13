import type { INodeProperties } from 'n8n-workflow';
import { commonFilters } from '../../shared/descriptions';

const showOnlyForMagicItemGetMany = {
	operation: ['getMany'],
	resource: ['magicItem'],
};

export const magicItemGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForMagicItemGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '100',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ !!$response.body.next }}',
						request: {
							url: '={{ $response.body.next }}',
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForMagicItemGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForMagicItemGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				placeholder: 'e.g. weapon, armor, wondrous item',
				description: 'Filter by item type',
				routing: {
					request: {
						qs: {
							type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Rarity',
				name: 'rarity',
				type: 'string',
				default: '',
				placeholder: 'e.g. common, uncommon, rare, very rare, legendary',
				description: 'Filter by item rarity',
				routing: {
					request: {
						qs: {
							rarity: '={{$value}}',
						},
					},
				},
			},
			...commonFilters,
		],
	},
];
