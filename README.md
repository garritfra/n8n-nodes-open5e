# n8n-nodes-open5e

This is an n8n community node that lets you access D&D 5th edition SRD content from the [Open5e API](https://api.open5e.com) in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Limitations](#limitations)
[License](#license)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Manual Installation

```bash
npm install n8n-nodes-open5e
```

## Operations

The Open5e node provides access to 12 different D&D 5e resources through the Open5e API. Each resource supports three operations:

- **Get Many**: Retrieve multiple items with optional filters and pagination
- **Get**: Retrieve a single item by its identifier (slug or key)
- **Search**: Search for items by name or description

## Credentials

**No credentials required!** The Open5e API is completely free and public. No API key or authentication is needed.

## Compatibility

- Minimum n8n version: unknown - the node was developed and tested on n8n 2.7, but should be compatible with earlier versions as well
- Tested with n8n version: 2.7

## Usage

### Resources

The node provides access to the following D&D 5e resources:

1. **Monsters** - Creatures and NPCs
2. **Spells** - Magic spells
3. **Magic Items** - Magical equipment
4. **Weapons** - Weapon stats
5. **Armor** - Armor types and stats
6. **Feats** - Character feats
7. **Conditions** - Status conditions
8. **Races** - Player character races
9. **Classes** - Player character classes
10. **Backgrounds** - Character backgrounds
11. **Planes** - Planes of existence
12. **Sections** - Rules and lore sections

### Example Workflows

#### 1. Random Encounter Generator

Create random encounters by fetching monsters filtered by challenge rating:

1. Add an Open5e node to your workflow
2. Select Resource: **Monster**
3. Select Operation: **Get Many**
4. In **Filters**, add:
   - Challenge Rating: `5`
   - Document Source: `wotc-srd`
5. Toggle **Return All** ON to get all matching monsters
6. Connect to a Function node to randomly select 3-5 monsters
7. Format the output as needed (Discord message, email, etc.)

#### 2. Spell Lookup Bot

Build a Discord bot that looks up spell information:

1. Use a Discord Trigger node to listen for commands
2. Add a Function node to extract the spell name from the command
3. Add an Open5e node:
   - Resource: **Spell**
   - Operation: **Search**
   - Search Term: `={{ $json.spellName }}`
4. Add a Function node to format the spell details
5. Send the formatted spell info back to Discord

#### 3. Item Database Search

Search for magic items and weapons by name:

1. Add an HTTP Request trigger or Form trigger to accept search queries
2. Add an Open5e node:
   - Resource: **Magic Item** (or **Weapon**)
   - Operation: **Search**
   - Search Term: `={{ $json.query }}`
   - Limit: `10`
3. Format and return the results

### Filters and Options

#### Common Filters (All Resources)

- **Document Source** (`document__slug`): Filter by source book
  - Examples: `wotc-srd` (official SRD), `tob` (Tome of Beasts), `cc` (Creature Codex)
- **Ordering**: Sort results
  - Options: `name` (A-Z), `-name` (Z-A)

#### Resource-Specific Filters

**Monsters:**
- Challenge Rating: e.g., `5`, `1/2`, `0`
- Type: e.g., `dragon`, `humanoid`, `undead`
- Size: Tiny, Small, Medium, Large, Huge, Gargantuan

**Spells:**
- Level: 0-9 (0 = cantrip)
- School: e.g., `evocation`, `abjuration`, `necromancy`
- Class: e.g., `wizard`, `cleric`, `druid`

**Weapons & Armor:**
- Category: e.g., `simple`, `martial` (weapons); `light`, `medium`, `heavy` (armor)

**Magic Items:**
- Type: e.g., `weapon`, `armor`, `wondrous item`
- Rarity: `common`, `uncommon`, `rare`, `very rare`, `legendary`

### Pagination

- **Return All**: When enabled, automatically fetches all pages of results
- **Limit**: When Return All is off, specify how many results to return (1-100)

The node automatically handles pagination by following the API's `next` links.

## Resources

- [Open5e API Documentation](https://api.open5e.com)
- [Open5e Website](https://open5e.com)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Limitations

### Global Search Not Supported

The Open5e API's global search endpoint (`/v1/search/`) returns HTML instead of JSON, so it is not supported by this node. Use the Search operation on individual resources instead.

### Self-Hosted Instances Not Supported

The node only connects to the public Open5e API at `api.open5e.com`. Self-hosted Open5e instances are not supported in v1.

### Advanced Filtering

Only the most commonly used filters are exposed in the node UI. For advanced filtering needs, use the HTTP Request node directly with the Open5e API.

## Development

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Run in development mode
npm run dev

# Lint the code
npm run lint

# Fix linting issues
npm run lint:fix
```

## License

[MIT](https://github.com/garritfra/n8n-nodes-open5e/blob/main/LICENSE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- Report issues at: https://github.com/garritfra/n8n-nodes-open5e/issues
- Join the n8n community: https://community.n8n.io/
