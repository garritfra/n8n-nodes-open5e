import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFeatGet = {
	operation: ['get'],
	resource: ['feat'],
};

export const featGetDescription: INodeProperties[] = [
	{
		displayName: 'Feat',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForFeatGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a feat...',
				typeOptions: {
					searchListMethod: 'getFeats',
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
