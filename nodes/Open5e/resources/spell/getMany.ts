import type { INodeProperties } from 'n8n-workflow';
import { commonFilters } from '../../shared/descriptions';

const showOnlyForSpellGetMany = {
	operation: ['getMany'],
	resource: ['spell'],
};

export const spellGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSpellGetMany,
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
				...showOnlyForSpellGetMany,
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
			show: showOnlyForSpellGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Level',
				name: 'level',
				type: 'options',
				options: [
					{ name: 'Cantrip (0)', value: '0' },
					{ name: '1st Level', value: '1' },
					{ name: '2nd Level', value: '2' },
					{ name: '3rd Level', value: '3' },
					{ name: '4th Level', value: '4' },
					{ name: '5th Level', value: '5' },
					{ name: '6th Level', value: '6' },
					{ name: '7th Level', value: '7' },
					{ name: '8th Level', value: '8' },
					{ name: '9th Level', value: '9' },
				],
				default: '0',
				description: 'Filter by spell level',
				routing: {
					request: {
						qs: {
							level: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'School',
				name: 'school',
				type: 'string',
				default: '',
				placeholder: 'e.g. evocation, abjuration',
				description: 'Filter by magic school',
				routing: {
					request: {
						qs: {
							school: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Class',
				name: 'dnd_class',
				type: 'string',
				default: '',
				placeholder: 'e.g. wizard, cleric',
				description: 'Filter by character class',
				routing: {
					request: {
						qs: {
							dnd_class: '={{$value}}',
						},
					},
				},
			},
			...commonFilters,
		],
	},
];
