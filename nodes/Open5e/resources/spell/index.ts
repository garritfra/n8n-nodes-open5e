import type { INodeProperties } from 'n8n-workflow';
import { spellGetManyDescription } from './getMany';
import { spellGetDescription } from './get';
import { spellSearchDescription } from './search';

const showOnlyForSpells = {
	resource: ['spell'],
};

export const spellDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSpells,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many spells',
				description: 'Get many spells from the Open5e API',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/spells',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a spell',
				description: 'Get a single spell by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/spells/{{$parameter.identifier}}',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search spells',
				description: 'Search for spells by name or description',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/spells',
					},
				},
			},
		],
		default: 'getMany',
	},
	...spellGetManyDescription,
	...spellGetDescription,
	...spellSearchDescription,
];
