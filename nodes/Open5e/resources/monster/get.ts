import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMonsterGet = {
	operation: ['get'],
	resource: ['monster'],
};

export const monsterGetDescription: INodeProperties[] = [
	{
		displayName: 'Monster',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForMonsterGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a monster...',
				typeOptions: {
					searchListMethod: 'getMonsters',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. ancient-red-dragon',
			},
		],
	},
];
