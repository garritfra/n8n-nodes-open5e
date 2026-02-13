import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBackgroundGet = {
	operation: ['get'],
	resource: ['background'],
};

export const backgroundGetDescription: INodeProperties[] = [
	{
		displayName: 'Background',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForBackgroundGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a background...',
				typeOptions: {
					searchListMethod: 'getBackgrounds',
					searchable: true,
				},
			},
			{
				displayName: 'By Key',
				name: 'key',
				type: 'string',
				placeholder: 'e.g. wotc-srd_example',
			},
		],
	},
];
