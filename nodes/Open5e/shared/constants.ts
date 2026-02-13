export interface ResourceConfig {
	apiVersion: 'v1' | 'v2';
	endpoint: string;
	identifierField: 'slug' | 'key';
	supportsSearch: boolean;
}

export const RESOURCE_CONFIGS: Record<string, ResourceConfig> = {
	monster: {
		apiVersion: 'v1',
		endpoint: '/v1/monsters',
		identifierField: 'slug',
		supportsSearch: true,
	},
	spell: {
		apiVersion: 'v2',
		endpoint: '/v2/spells',
		identifierField: 'key',
		supportsSearch: true,
	},
	magicItem: {
		apiVersion: 'v1',
		endpoint: '/v1/magicitems',
		identifierField: 'slug',
		supportsSearch: true,
	},
	weapon: {
		apiVersion: 'v2',
		endpoint: '/v2/weapons',
		identifierField: 'key',
		supportsSearch: true,
	},
	armor: {
		apiVersion: 'v2',
		endpoint: '/v2/armor',
		identifierField: 'key',
		supportsSearch: true,
	},
	feat: {
		apiVersion: 'v2',
		endpoint: '/v2/feats',
		identifierField: 'key',
		supportsSearch: true,
	},
	condition: {
		apiVersion: 'v2',
		endpoint: '/v2/conditions',
		identifierField: 'key',
		supportsSearch: true,
	},
	race: {
		apiVersion: 'v1',
		endpoint: '/v1/races',
		identifierField: 'slug',
		supportsSearch: true,
	},
	class: {
		apiVersion: 'v1',
		endpoint: '/v1/classes',
		identifierField: 'slug',
		supportsSearch: true,
	},
	background: {
		apiVersion: 'v2',
		endpoint: '/v2/backgrounds',
		identifierField: 'key',
		supportsSearch: true,
	},
	plane: {
		apiVersion: 'v1',
		endpoint: '/v1/planes',
		identifierField: 'slug',
		supportsSearch: true,
	},
	section: {
		apiVersion: 'v1',
		endpoint: '/v1/sections',
		identifierField: 'slug',
		supportsSearch: true,
	},
};
