# n8n-nodes-open5e — Specification

## Overview

A declarative-style n8n community node that wraps the [Open5e API](https://api.open5e.com) — a free, unauthenticated REST API providing access to D&D 5th edition SRD content and supplemental sourcebooks. The node allows n8n workflow builders to query monsters, spells, magic items, weapons, armor, feats, conditions, races, classes, backgrounds, planes, sections, and a cross-resource global search, enabling use cases like campaign automation, random encounter generators, Discord bots, and DM tools.

## Goals

- Full coverage of all Open5e v1/v2 resource endpoints in a single node
- Consistent UX across all resources: Get Many, Get by Slug, Search, and Global Search operations
- Pagination handled transparently via a "Return All" toggle
- Key optional filters exposed per resource (document source, ordering, resource-specific fields like CR)
- Published as a community node on npm, following n8n community node standards

## Users & Roles

Single user type: n8n workflow builders (no authentication or roles needed — the Open5e API is fully public and requires no API key).

## Core Features

**Resources supported (all in v1):**
Monsters, Spells, Magic Items, Weapons, Armor, Feats, Conditions, Races, Classes, Backgrounds, Planes, Sections, and Global Search.

**Operations (available on each resource unless noted):**

- **Get Many** — List items from a resource with optional filters, ordering, limit, and a "Return All" toggle for auto-pagination.
- **Get by Slug** — Fetch a single item by its unique slug identifier.
- **Search** — Case-insensitive partial-text search within the resource (supported by the API on Monsters, Spells, Magic Items, Weapons; to be exposed where available).
- **Global Search** — Single operation (not per-resource) that queries `/search/` across all resource types simultaneously using a full-text term.

**Filters & Options (on Get Many):**

- `document__slug` — Filter by source book (e.g. `5esrd`, `tob`, `cc`)
- `ordering` — Sort results by a field (e.g. `challenge_rating`, `name`, `-name`)
- Resource-specific filters, including at minimum:
  - Monsters: `cr` (challenge rating)
  - Spells: `level`, `school`, `dnd_class`
  - Weapons/Armor: `category`
  - Others: exposed where the API supports filtering

**Pagination:**

- Default: return a single page; user sets `limit` (default 20, max configurable)
- "Return All" toggle: automatically follows `next` links and aggregates all pages into a single output

## User Flows

### Get Many — Monsters (example)

1. User adds the Open5e node to a workflow
2. Selects resource: **Monster**
3. Selects operation: **Get Many**
4. Optionally sets: `CR = 5`, `document__slug = tob`, `ordering = challenge_rating`, `limit = 50`
5. Toggles "Return All" if they want every matching monster
6. Node calls `GET /v1/monsters/?cr=5&document__slug=tob&ordering=challenge_rating&limit=50`
7. If Return All is on, follows pagination automatically; returns all results as individual n8n items

### Get by Slug — Spell

1. User selects resource: **Spell**, operation: **Get by Slug**
2. Enters slug: `fireball`
3. Node calls `GET /v2/spells/fireball/`
4. Returns a single item with the full spell data

### Global Search

1. User selects operation: **Global Search**
2. Enters search term: `fire`
3. Node calls `GET /v1/search/?text=fire`
4. Returns mixed results across all resource types, each with type metadata and a highlighted snippet

## Data Model

The node does not define its own data model — it passes through API responses as n8n items. Each item corresponds to one API object (monster, spell, etc.). Notable shared fields across resources:

- `slug` — unique identifier, used for "Get by Slug"
- `name` — display name
- `document__slug` — source book identifier
- `document__title` — human-readable source book name

Resource-specific fields (e.g. `challenge_rating`, `hit_points` for monsters; `level`, `school` for spells) are passed through as-is.

## Integrations

- **Open5e API v1 & v2** — `https://api.open5e.com`
  - No authentication required
  - Mixed versioning: some resources are on `/v1/`, others on `/v2/` (spells, feats, conditions, weapons, armor, backgrounds, documents are v2; the rest are v1)
  - The root endpoint (`/`) returns the full URL map and can be used to keep the base URLs maintainable

## Platform & Tech

- **Node type:** Declarative-style n8n community node (TypeScript)
- **Node building style:** Declarative (`routing` object on properties; no custom `execute()` method except potentially for "Return All" pagination logic, which may require programmatic fallback)
- **Package name:** `n8n-nodes-open5e`
- **npm scope:** None (published under the author's personal npm account or an org)
- **Minimum n8n version:** To be confirmed, but target the current stable community node API
- **No credentials file needed** — API is unauthenticated
- **Icon:** Should use a D20 or dragon SVG (Open5e assets available; check licensing)
- **File structure:** Standard single-node package (`nodes/Open5e/Open5e.node.ts`, `package.json`, `index.ts`)

## Non-Functional Requirements

- **No credentials** — the Open5e API is public; the node should explicitly document this
- **Rate limiting** — Open5e has no documented rate limits, but the "Return All" auto-pagination should include reasonable handling (respect `next` cursor, avoid hammering)
- **Error handling** — surface HTTP errors (404 for unknown slugs, 5xx) as proper n8n node errors
- **Output consistency** — each result should be a separate n8n item to support downstream item-by-item processing
- **Linting** — must pass `n8n-node-dev` linter before publishing

## Out of Scope (v1)

- Write operations (the Open5e API is read-only)
- Trigger nodes (no webhooks or polling in scope)
- Caching results locally
- Filtering by every possible API query parameter (only the most useful ones are exposed; users can fall back to the HTTP Request node for edge cases)
- Support for self-hosted Open5e instances (base URL is hardcoded to `api.open5e.com`)

## Open Questions

- **Pagination in declarative style:** n8n's declarative style doesn't natively support "Return All" with cursor-based pagination. Will likely require a programmatic `execute()` method just for pagination, or a hybrid approach. Confirm the right pattern before implementation.
- **API versioning per resource:** v1 vs v2 endpoints need to be mapped explicitly per resource. Confirm all resource base URLs from the root endpoint before coding.
- **Search availability:** Not all resources support `?search=`. Confirm which ones do and either hide the Search operation or show a warning when unavailable for a given resource.
- **Icon licensing:** Confirm that any Open5e or D&D-adjacent icons used are freely licensed for redistribution in an npm package.
- **npm package name availability:** Check that `n8n-nodes-open5e` is available on npm before starting.