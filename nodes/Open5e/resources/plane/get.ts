import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlaneGet = {
	operation: ['get'],
	resource: ['plane'],
};

export const planeGetDescription: INodeProperties[] = [
	{
		displayName: 'Plane',
		name: 'identifier',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: showOnlyForPlaneGet,
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a plane...',
				typeOptions: {
					searchListMethod: 'getPlanes',
					searchable: true,
				},
			},
			{
				displayName: 'By Slug',
				name: 'slug',
				type: 'string',
				placeholder: 'e.g. example-plane',
			},
		],
	},
];
