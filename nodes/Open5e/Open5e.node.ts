import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { monsterDescription } from './resources/monster';
import { spellDescription } from './resources/spell';
import { magicItemDescription } from './resources/magicItem';
import { weaponDescription } from './resources/weapon';
import { armorDescription } from './resources/armor';
import { featDescription } from './resources/feat';
import { conditionDescription } from './resources/condition';
import { raceDescription } from './resources/race';
import { classDescription } from './resources/class';
import { backgroundDescription } from './resources/background';
import { planeDescription } from './resources/plane';
import { sectionDescription } from './resources/section';
import { getMonsters } from './listSearch/getMonsters';
import { getSpells } from './listSearch/getSpells';
import { getMagicItems } from './listSearch/getMagicItems';
import { getWeapons } from './listSearch/getWeapons';
import { getArmors } from './listSearch/getArmors';
import { getFeats } from './listSearch/getFeats';
import { getConditions } from './listSearch/getConditions';
import { getRaces } from './listSearch/getRaces';
import { getClasss } from './listSearch/getClasss';
import { getBackgrounds } from './listSearch/getBackgrounds';
import { getPlanes } from './listSearch/getPlanes';
import { getSections } from './listSearch/getSections';

export class Open5e implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Open5e',
		name: 'open5e',
		icon: { light: 'file:../../icons/d20.svg', dark: 'file:../../icons/d20.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Access D&D 5e SRD content from the Open5e API',
		defaults: {
			name: 'Open5e',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		requestDefaults: {
			baseURL: 'https://api.open5e.com',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Monster',
						value: 'monster',
					},
					{
						name: 'Spell',
						value: 'spell',
					},
					{
						name: 'Magic Item',
						value: 'magicItem',
					},
					{
						name: 'Weapon',
						value: 'weapon',
					},
					{
						name: 'Armor',
						value: 'armor',
					},
					{
						name: 'Feat',
						value: 'feat',
					},
					{
						name: 'Condition',
						value: 'condition',
					},
					{
						name: 'Race',
						value: 'race',
					},
					{
						name: 'Class',
						value: 'class',
					},
					{
						name: 'Background',
						value: 'background',
					},
					{
						name: 'Plane',
						value: 'plane',
					},
					{
						name: 'Section',
						value: 'section',
					},
				],
				default: 'monster',
			},
			...monsterDescription,
			...spellDescription,
			...magicItemDescription,
			...weaponDescription,
			...armorDescription,
			...featDescription,
			...conditionDescription,
			...raceDescription,
			...classDescription,
			...backgroundDescription,
			...planeDescription,
			...sectionDescription,
		],
	};

	methods = {
		listSearch: {
			getMonsters,
			getSpells,
			getMagicItems,
			getWeapons,
			getArmors,
			getFeats,
			getConditions,
			getRaces,
			getClasss,
			getBackgrounds,
			getPlanes,
			getSections,
		},
	};
}
