# n8n-nodes-open5e Implementation Plan

## Overview
Build a declarative-style n8n community node for the Open5e API covering all 12 resources (Monsters, Spells, Magic Items, Weapons, Armor, Feats, Conditions, Races, Classes, Backgrounds, Planes, Sections). Pattern based on the existing GitHub Issues node template.

## Implementation Strategy

### Phase 1: Foundation & Configuration

#### 1.1 Create shared constants and utilities
**File**: `nodes/Open5e/shared/constants.ts`

Define resource configurations mapping v1/v2 endpoints and identifier fields:

```typescript
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
  // ... 10 more resources
};
```

**File**: `nodes/Open5e/shared/descriptions.ts`

Define common filters reused across all resources:
- `document__slug` (source book filter)
- `ordering` (sort field with options: name, -name)

#### 1.2 Set up main node file
**File**: `nodes/Open5e/Open5e.node.ts`

Structure:
- Remove authentication/credentials (API is public)
- Set `requestDefaults.baseURL` to `https://api.open5e.com`
- Define 12 resources in dropdown
- Import and spread all resource descriptions
- Define `methods.listSearch` with search methods for each resource

### Phase 2: First Resource Implementation (Monster - Proof of Concept)

#### 2.1 Resource index
**File**: `nodes/Open5e/resources/monster/index.ts`

Define:
- Operation dropdown with 3 operations (Get Many, Get, Search)
- Each operation includes `routing.request` with method and URL
- Use expressions: `url: '={{ "/v1/monsters/" + $parameter.identifier }}'`
- Import operation descriptions from separate files

#### 2.2 Get Many operation
**File**: `nodes/Open5e/resources/monster/getMany.ts`

Implement:
- **Return All** toggle with declarative pagination:
  ```typescript
  routing: {
    send: {
      paginate: '={{ $value }}',
      type: 'query',
      property: 'limit',
      value: '100',
    },
    operations: {
      pagination: {
        type: 'generic',
        properties: {
          continue: '={{ !!$response.body.next }}',
          request: {
            url: '={{ $response.body.next }}',
          },
        },
      },
    },
  }
  ```
- **Limit** field (shown when Return All is false)
- **Filters** collection:
  - Challenge Rating (`cr` - number)
  - Document Source (from shared descriptions)
  - Ordering (from shared descriptions)
  - Type (string)
  - Size (string)

#### 2.3 Get by Slug operation
**File**: `nodes/Open5e/resources/monster/get.ts`

Implement resourceLocator field:
- Mode: list (uses listSearch method)
- Mode: slug (manual entry with placeholder "e.g. ancient-red-dragon")
- Field name: `identifier` (generic, not "slug" to hide API complexity)

#### 2.4 Search operation
**File**: `nodes/Open5e/resources/monster/search.ts`

Implement:
- Search Term field (string, required)
- Routing sends `?search=` query parameter
- Include Return All and Limit (same as Get Many)

#### 2.5 List search method
**File**: `nodes/Open5e/listSearch/getMonsters.ts`

Implement searchable dropdown:
- Returns `INodeListSearchResult` with items array
- Each item: `{name, value, url}`
- Supports filtering based on user input
- Handles pagination if needed

**Test Monster thoroughly before proceeding to Phase 3.**

### Phase 3: Replicate Pattern for Remaining Resources

Implement in this order (grouped by API version):

**V1 Resources** (use `slug` field):
1. Magic Items (`/v1/magicitems`)
   - Filters: type, rarity
2. Races (`/v1/races`)
   - Minimal filters (document, ordering)
3. Classes (`/v1/classes`)
   - Minimal filters
4. Planes (`/v1/planes`)
   - Minimal filters
5. Sections (`/v1/sections`)
   - Minimal filters

**V2 Resources** (use `key` field):
6. Spells (`/v2/spells`)
   - Filters: level, school, dnd_class
7. Weapons (`/v2/weapons`)
   - Filters: category
8. Armor (`/v2/armor`)
   - Filters: category
9. Feats (`/v2/feats`)
   - Minimal filters
10. Conditions (`/v2/conditions`)
    - Minimal filters
11. Backgrounds (`/v2/backgrounds`)
    - Minimal filters

For each resource:
- Copy monster structure (index.ts, getMany.ts, get.ts, search.ts)
- Update RESOURCE_CONFIGS entry
- Adjust filters based on resource-specific fields
- Create listSearch method
- Test operations manually

### Phase 4: Icon & Assets

**File**: `icons/d20.svg` and `icons/d20.dark.svg`

Find or create a simple, permissively-licensed d20 (20-sided die) SVG icon:
- Check Heroicons, Lucide, or similar free icon libraries
- Ensure license allows redistribution in npm package
- Create light and dark mode versions
- Update main node file to reference icons

### Phase 5: Package Configuration

**File**: `package.json`

Update:
- `name`: `"n8n-nodes-open5e"`
- `version`: `"0.1.0"`
- `description`: `"n8n community node for the Open5e API - D&D 5e SRD content"`
- `keywords`: `["n8n-community-node-package", "open5e", "dnd", "5e", "srd", "dungeons and dragons"]`
- `n8n.nodes`: Add `"dist/nodes/Open5e/Open5e.node.js"`
- Remove GitHub Issues related entries
- Remove credentials entries (API is public)
- `author`, `repository`, `license` fields

**File**: `nodes/Open5e/Open5e.node.json`

Create metadata file:
```json
{
  "node": "n8n-nodes-open5e",
  "nodeVersion": "1.0",
  "codexVersion": "1.0",
  "categories": ["Productivity", "Data & Storage"],
  "resources": {
    "primaryDocumentation": [
      {"url": "https://api.open5e.com"}
    ]
  }
}
```

### Phase 6: Documentation & Testing

#### 6.1 README
**File**: `README.md`

Include:
- Installation instructions (`npm install n8n-nodes-open5e`)
- Compatibility (minimum n8n version)
- Feature list (12 resources, 3 operations each)
- Example workflows:
  - Random encounter generator (Get Many monsters with CR filter)
  - Spell lookup bot (Get spell by slug)
  - Item search (Search magic items)
- Note that Global Search is not supported (API limitation)
- Note that API is public (no authentication needed)
- Link to Open5e API documentation

#### 6.2 Manual Testing Checklist

For each resource (use Monster and Spell as representatives):

**Get Many**:
- [ ] Returns default limit (20 items)
- [ ] Custom limit works (e.g., 50)
- [ ] Return All fetches multiple pages and merges results
- [ ] Filters work correctly (e.g., CR=5 for monsters, level=3 for spells)
- [ ] Ordering works (name ascending/descending)
- [ ] Empty results handled gracefully
- [ ] Large dataset (500+ items) completes successfully

**Get by Slug/Key**:
- [ ] List mode: dropdown populates with searchable items
- [ ] Manual entry mode: accepts valid slug/key
- [ ] Invalid slug/key returns proper 404 error with helpful message
- [ ] V1 resources use slug correctly
- [ ] V2 resources use key correctly

**Search**:
- [ ] Search term returns partial matches
- [ ] Case-insensitive search works
- [ ] Return All works with search results
- [ ] Empty search results handled gracefully

**Edge Cases**:
- [ ] Empty filter values don't break query string
- [ ] Special characters in slugs/keys handled correctly
- [ ] API errors (404, 500) surface as readable n8n errors

#### 6.3 Linting
- Run `npm run lint` and fix all issues
- Run `npm run build` and verify compilation succeeds

### Phase 7: Publishing

1. Verify `package.json` name availability on npm
2. Test installation in a clean n8n instance:
   ```bash
   npm run build
   npm link
   # In n8n directory
   npm link n8n-nodes-open5e
   ```
3. Create git tag for v0.1.0
4. Run `npm publish` (or use `npm run release` if configured)
5. Verify package appears on npm registry

## Key Architectural Decisions

### 1. Declarative Pagination (Solves SPEC Open Question)
Use `routing.operations.pagination` to handle "Return All" without custom execute() method. Open5e returns `{count, next, previous, results[]}` - we check `!!$response.body.next` and follow the URL.

### 2. Skip Global Search (Per User Request)
The `/v1/search/` endpoint returns HTML, not JSON. Document this limitation in README rather than implementing a broken feature.

### 3. Resource Config Abstraction
`RESOURCE_CONFIGS` object maps v1/v2 endpoints and slug/key fields, hiding API complexity from users while maintaining implementation consistency.

### 4. Identifier Field Naming
Use generic `identifier` field name instead of `slug` or `key` to provide consistent UX across resources. The config maps to the correct field internally.

### 5. Filter Exposure Strategy
Expose only the most useful filters per resource (per SPEC.md line 114):
- Common: document__slug, ordering
- Monster-specific: cr, type, size
- Spell-specific: level, school, dnd_class
- Weapon/Armor-specific: category
- Others: minimal (rely on common filters)

Users needing advanced filtering can use the HTTP Request node.

## Critical Files

### To Create (in order):
1. `nodes/Open5e/shared/constants.ts` - Resource configs (v1/v2, slug/key mapping)
2. `nodes/Open5e/shared/descriptions.ts` - Common filters (document, ordering)
3. `nodes/Open5e/resources/monster/index.ts` - Operations list and routing
4. `nodes/Open5e/resources/monster/getMany.ts` - Get Many with pagination
5. `nodes/Open5e/resources/monster/get.ts` - Get by slug with resourceLocator
6. `nodes/Open5e/resources/monster/search.ts` - Search operation
7. `nodes/Open5e/listSearch/getMonsters.ts` - Dropdown population
8. `nodes/Open5e/Open5e.node.ts` - Main node file
9. (Repeat structure for 11 remaining resources)
10. `icons/d20.svg` - Node icon
11. `README.md` - Documentation

### To Modify:
- `package.json` - Update metadata, remove example nodes
- `.github/workflows/ci.yml` - Verify it works with new structure (should be fine as-is)

## Success Criteria

Implementation is complete when:
1. ✅ All 12 resources implemented (Monster, Spell, Magic Items, Weapons, Armor, Feats, Conditions, Races, Classes, Backgrounds, Planes, Sections)
2. ✅ Each resource supports Get Many, Get, and Search operations
3. ✅ "Return All" pagination works for resources with 100+ items
4. ✅ Common and resource-specific filters work correctly
5. ✅ `npm run lint` passes with zero errors
6. ✅ `npm run build` succeeds
7. ✅ Manual testing checklist complete for Monster and Spell
8. ✅ README includes 3+ example workflows
9. ✅ Successfully tested in clean n8n instance
10. ✅ Published to npm as `n8n-nodes-open5e`

## Out of Scope (Future Enhancements)
- Global Search (API returns HTML)
- Write operations (API is read-only)
- Trigger nodes (no webhooks)
- Caching
- Self-hosted Open5e support
- Batch operations
