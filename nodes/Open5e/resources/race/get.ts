import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRaceGet = {
	operation: ['get'],
	resource: ['race'],
};

export const raceGetDescription: INodeProperties[] = [
	{
		displayName: 'Race',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForRaceGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a race...',
				typeOptions: {
					searchListMethod: 'getRaces',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. example-race',
			},
		],
	},
];
