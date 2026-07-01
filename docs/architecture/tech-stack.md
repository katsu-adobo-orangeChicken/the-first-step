# Tech Stack

## Purpose

This document records the current technical decisions for **The First Step** and separates confirmed implementation choices from architecture decisions that are still proposed or pending implementation.

## Verification Summary

Verified against:

- [package.json](../../package.json)
- [package-lock.json](../../package-lock.json)
- [vite.config.js](../../prototype/syrena-prototype/vite.config.js)
- [ADR 001: Adoption of a Modular Monolithic Architecture](./adrs/ADR-001:Choosing-Modular-Monolithic-Architecture.md)
- [ADR 002: Modular Implementation Ruleset](./adrs/ADR-002:Modular-Monolith-Ruleset.md)
- [Architectural Manifesto](./structure.md)

## Current Application Stack

| Area | Decision | Status | Notes |
| --- | --- | --- | --- |
| Runtime language | JavaScript, ES modules | Confirmed | The root package uses `"type": "module"`. |
| UI framework | React `19.2.7` | Confirmed | Used by the active Vite prototype. |
| Build tool | Vite `8.1.0` | Confirmed | Root scripts run the `prototype/syrena-prototype` app through Vite. |
| React integration | `@vitejs/plugin-react` `6.0.3` | Confirmed | Registered in the prototype Vite config. |
| Styling | Tailwind CSS `4.3.1` | Confirmed | Integrated through `@tailwindcss/vite`; the prototype imports Tailwind in `index.css`. |
| Client routing | React Router DOM `7.18.0` | Confirmed | Used in `App.jsx` and page/navigation components. |
| Linting | ESLint `10.5.0` | Confirmed | Root script: `npm run lint:js`. |
| Documentation | Markdown in `docs/` | Confirmed | Architecture, process, roadmap, and user-centered design docs live under `docs/`. |

## Architecture Decisions

| Area | Decision | Status | Rationale |
| --- | --- | --- | --- |
| Application architecture | Modular monolith | Proposed in ADR 001 | Keeps MVP delivery simple while preserving domain boundaries for future extraction. |
| Code organization | Vertical slices by business capability | Proposed in ADR 001 | Keeps related UI, use cases, and domain logic together by module. |
| Module boundary | `PublicApi/index.js` as the only external module entry point | Proposed in ADR 002 | Prevents other modules from depending on private implementation details. |
| Internal structure | `Internal/domain`, `Internal/application`, and `Internal/ui` | Proposed in architecture docs | Separates business rules, orchestration, and UI adapters inside each module. |
| Dependency management | Simple custom `ServiceContainer` | Proposed in ADR 002 | Provides dependency injection without adding a heavyweight DI framework during MVP. |
| Cross-module async communication | In-process `EventBus` | Proposed in ADR 002 | Lets modules react to business events without direct imports. |
| UI boundary | UI as a thin adapter over module logic | Proposed in ADR 002 | Keeps core module code framework-agnostic and easier to test. |

## Repository Structure

```text
src/
├── app/                  # Application bootstrap and global shell
├── modules/              # Domain-specific vertical slices
└── shared/               # Cross-cutting technical primitives only

prototype/
└── syrena-prototype/     # Current React/Vite prototype

docs/
├── architecture/         # ADRs, architecture rules, and tech stack
├── process/              # MVP build process
├── roadmap/              # Roadmap planning
└── user-centered-design/ # Personas, user stories, and UX docs
```

## Tooling Commands

Run these from the repository root.

```bash
npm run dev
npm run build
npm run preview
npm run lint:js
```

## Deferred Decisions

These items are not yet confirmed in the implementation:

- Backend runtime and API framework
- Database engine and persistence strategy
- Authentication provider
- Hosting and deployment platform
- CI architecture checks for module boundaries
- Automated lint rules that block imports from another module's `Internal/` folder
- Test framework and testing strategy

## Decision Notes

- The React/Vite/Tailwind stack is already implemented in the active prototype and is therefore confirmed.
- The modular monolith, `ServiceContainer`, `EventBus`, and `PublicApi` rules are documented as proposed architecture decisions, but the codebase still needs implementation and automated enforcement for those rules.
- The current setup is appropriate for an MVP because it keeps frontend iteration fast while leaving room for stricter module boundaries as the production application grows.
