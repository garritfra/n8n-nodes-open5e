import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSpellGet = {
	operation: ['get'],
	resource: ['spell'],
};

export const spellGetDescription: INodeProperties[] = [
	{
		displayName: 'Spell',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForSpellGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a spell...',
				typeOptions: {
					searchListMethod: 'getSpells',
					searchable: true,
				},
			},
			{
				displayName: 'By Key',
				name: 'key',
				type: 'string',
				placeholder: 'e.g. wotc-srd_fireball',
			},
		],
	},
];
