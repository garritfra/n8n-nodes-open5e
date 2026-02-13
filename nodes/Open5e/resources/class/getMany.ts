import type { INodeProperties } from 'n8n-workflow';
import { commonFilters } from '../../shared/descriptions';

const showOnlyForClassGetMany = {
	operation: ['getMany'],
	resource: ['class'],
};

export const classGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForClassGetMany,
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
				...showOnlyForClassGetMany,
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
			show: showOnlyForClassGetMany,
		},
		default: {},
		options: [
			...commonFilters,
		],
	},
];
