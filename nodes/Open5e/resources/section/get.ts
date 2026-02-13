import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSectionGet = {
	operation: ['get'],
	resource: ['section'],
};

export const sectionGetDescription: INodeProperties[] = [
	{
		displayName: 'Section',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForSectionGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a section...',
				typeOptions: {
					searchListMethod: 'getSections',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. example-section',
			},
		],
	},
];
