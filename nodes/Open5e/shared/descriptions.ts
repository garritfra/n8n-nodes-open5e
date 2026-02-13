import type { INodeProperties } from 'n8n-workflow';

export const commonFilters: INodeProperties[] = [
	{
		displayName: 'Document Source',
		name: 'document__slug',
		type: 'string',
		default: '',
		placeholder: 'e.g. wotc-srd, tob, cc',
		description: 'Filter by source book slug (e.g., wotc-srd for SRD, tob for Tome of Beasts)',
		routing: {
			request: {
				qs: {
					document__slug: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Ordering',
		name: 'ordering',
		type: 'options',
		options: [
			{
				name: 'Name (A-Z)',
				value: 'name',
			},
			{
				name: 'Name (Z-A)',
				value: '-name',
			},
		],
		default: 'name',
		description: 'Sort order for results',
		routing: {
			request: {
				qs: {
					ordering: '={{$value}}',
				},
			},
		},
	},
];
