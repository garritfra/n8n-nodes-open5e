import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMagicItemGet = {
	operation: ['get'],
	resource: ['magicItem'],
};

export const magicItemGetDescription: INodeProperties[] = [
	{
		displayName: 'Magic Item',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForMagicItemGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a magic item...',
				typeOptions: {
					searchListMethod: 'getMagicItems',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. bag-of-holding',
			},
		],
	},
];
