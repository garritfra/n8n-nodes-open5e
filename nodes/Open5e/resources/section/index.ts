import type { INodeProperties } from 'n8n-workflow';
import { sectionGetManyDescription } from './getMany';
import { sectionGetDescription } from './get';
import { sectionSearchDescription } from './search';

const showOnlyForSections = {
	resource: ['section'],
};

export const sectionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSections,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many sections',
				description: 'Get many sections from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/sections',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a section',
				description: 'Get a single section by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/sections/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search sections',
				description: 'Search for sections by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/sections',
					},
				},
			},
		],
		default: 'getMany',
	},
	...sectionGetManyDescription,
	...sectionGetDescription,
	...sectionSearchDescription,
];
