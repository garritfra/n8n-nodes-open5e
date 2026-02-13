import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConditionGet = {
	operation: ['get'],
	resource: ['condition'],
};

export const conditionGetDescription: INodeProperties[] = [
	{
		displayName: 'Condition',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForConditionGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a condition...',
				typeOptions: {
					searchListMethod: 'getConditions',
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
