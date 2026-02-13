import type { INodeProperties } from 'n8n-workflow';
import { commonFilters } from '../../shared/descriptions';

const showOnlyForMonsterGetMany = {
	operation: ['getMany'],
	resource: ['monster'],
};

export const monsterGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForMonsterGetMany,
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
				...showOnlyForMonsterGetMany,
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
			show: showOnlyForMonsterGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Challenge Rating',
				name: 'cr',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5, 1/2, 0',
				description: 'Filter by challenge rating',
				routing: {
					request: {
						qs: {
							challenge_rating: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				placeholder: 'e.g. dragon, humanoid, undead',
				description: 'Filter by creature type',
				routing: {
					request: {
						qs: {
							type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'options',
				options: [
					{ name: 'Gargantuan', value: 'Gargantuan' },
					{ name: 'Huge', value: 'Huge' },
					{ name: 'Large', value: 'Large' },
					{ name: 'Medium', value: 'Medium' },
					{ name: 'Small', value: 'Small' },
					{ name: 'Tiny', value: 'Tiny' },
				],
				default: 'Medium',
				description: 'Filter by creature size',
				routing: {
					request: {
						qs: {
							size: '={{$value}}',
						},
					},
				},
			},
			...commonFilters,
		],
	},
];
