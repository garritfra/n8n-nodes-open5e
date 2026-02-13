import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArmorGet = {
	operation: ['get'],
	resource: ['armor'],
};

export const armorGetDescription: INodeProperties[] = [
	{
		displayName: 'Armor',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForArmorGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select armor...',
				typeOptions: {
					searchListMethod: 'getArmors',
					searchable: true,
				},
			},
			{
				displayName: 'By Key',
				name: 'key',
				type: 'string',
				placeholder: 'e.g. wotc-srd_chainmail',
			},
		],
	},
];
