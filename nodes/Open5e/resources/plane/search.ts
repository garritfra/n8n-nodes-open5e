import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlaneSearch = {
	operation: ['search'],
	resource: ['plane'],
};

export const planeSearchDescription: INodeProperties[] = [
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPlaneSearch,
		},
		placeholder: 'e.g. plane',
		description: 'Term to search for in plane names and descriptions',
		routing: {
			request: {
				qs: {
					search: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPlaneSearch,
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
				...showOnlyForPlaneSearch,
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
];
