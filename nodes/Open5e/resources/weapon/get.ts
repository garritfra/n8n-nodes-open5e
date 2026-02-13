import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWeaponGet = {
	operation: ['get'],
	resource: ['weapon'],
};

export const weaponGetDescription: INodeProperties[] = [
	{
		displayName: 'Weapon',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForWeaponGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a weapon...',
				typeOptions: {
					searchListMethod: 'getWeapons',
					searchable: true,
				},
			},
			{
				displayName: 'By Key',
				name: 'key',
				type: 'string',
				placeholder: 'e.g. wotc-srd_longsword',
			},
		],
	},
];
