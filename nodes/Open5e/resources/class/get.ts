import type { INodeProperties } from 'n8n-workflow';

const showOnlyForClassGet = {
	operation: ['get'],
	resource: ['class'],
};

export const classGetDescription: INodeProperties[] = [
	{
		displayName: 'Class',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForClassGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a class...',
				typeOptions: {
					searchListMethod: 'getClasss',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. example-class',
			},
		],
	},
];
