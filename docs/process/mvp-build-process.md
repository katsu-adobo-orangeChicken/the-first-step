# MVP Build Process

This process turns the current prototype into the real MVP without losing the user-centered design work already in the repo.

The core idea is valid:

1. Build with fake data to validate the experience.
2. Define a local API contract to clarify the frontend/backend boundary.
3. Connect the UI to that API.
4. Choose persistence after the product shape is clearer.
5. Swap the in-memory adapter for a database-backed adapter.

This works best when every phase produces a concrete artifact the team can review.

---

## Current Repo State

The repo is currently between the Visual Phase and the Boundary Phase.

- `docs/user-centered-design/` defines personas, user segments, conceptual models, and user stories.
- `docs/tasks/MVP.md` defines the MVP product surface.
- `prototype/syrena-prototype/` contains the working React prototype with fake project-track data.
- `docs/architecture/` defines a modular monolith target architecture.
- `src/` is not implemented yet and should become the real application structure.

The next engineering move is not choosing a database. The next move is defining module contracts and moving one feature slice from prototype to `src/`.

---

## Phase 1: Visual Phase

### Goal

Validate that the user experience makes sense before adding backend complexity.

### Repo Location

Use:

```text
prototype/syrena-prototype/
```

### What To Build

Build screens with local fake data:

- Track selection
- Project discovery
- Project detail
- Simple onboarding/profile intake
- Team/application flow mockups
- Weekly milestone/workspace mockups

### Done When

- A teammate can click through the core user journey.
- Each screen answers a real user story from `docs/user-centered-design/user-stories.md`.
- The team can identify the data each screen needs.
- The prototype has enough fidelity to test with users or classmates.

### Team Rule

Do not add a database in this phase. Use fake data intentionally.

---

## Phase 2: Boundary Phase

### Goal

Define the contract between frontend behavior and application logic.

### Repo Location

Start implementing the real app under:

```text
src/
```

Follow the architecture in `docs/architecture/structure.md`:

```text
src/
├── app/
├── modules/
└── shared/
```

### Suggested First Modules

For the MVP, start with these vertical slices:

```text
src/modules/career-catalog/
src/modules/onboarding/
src/modules/team-matching/
src/modules/workspace/
src/modules/career-output/
```

### What To Build

For each module, define its public contract first:

```text
src/modules/career-catalog/PublicApi/index.js
```

Example contract:

```js
export function createCareerCatalogModule({ projectRepository }) {
  return {
    listTracks() {
      return projectRepository.listTracks()
    },

    getTrack(trackId) {
      return projectRepository.getTrack(trackId)
    },

    getProject(trackId, projectId) {
      return projectRepository.getProject(trackId, projectId)
    },
  }
}
```

The first repository can still use in-memory data copied from the prototype.

### Done When

- The UI no longer imports raw fake data directly.
- Screens call module public APIs.
- Every module has a `PublicApi/index.js`.
- No file imports another module's `Internal/` code.
- The contract is documented enough that frontend and backend work can split.

### Team Rule

Treat public APIs as the team contract. If a screen needs new data, update the module contract before changing storage.

---

## Phase 3: Integration Phase

### Goal

Connect real UI screens to the local application/API layer.

### Repo Location

Use:

```text
src/app/
src/modules/*/PublicApi/
src/modules/*/Internal/
```

### What To Build

Move one complete user journey at a time from the prototype into `src/`.

Recommended first journey:

```text
Landing page -> track selection -> project list -> project detail
```

Recommended second journey:

```text
Onboarding/profile intake -> project recommendation -> request to join
```

### Done When

- The app runs from `src/app`, not directly from the prototype folder.
- Screens get their data through module contracts.
- The in-memory adapter can be replaced without changing UI components.
- Basic tests or smoke checks prove the journey still works.

### Team Rule

Integrate one vertical slice fully before building five disconnected partial features.

---

## Phase 4: Persistence Phase

### Goal

Choose storage only after the team understands the product data shape.

### What To Decide

Decide based on the contracts already built:

- Which entities need to persist?
- Which module owns each entity?
- Which queries are required by the UI?
- Which data needs relationships?
- Which data can stay static content?

### Likely MVP Entities

```text
User
Profile
CareerTrack
ProjectTrack
Team
TeamMember
JoinRequest
Milestone
MilestoneSubmission
FinalOutput
```

### Module Ownership

Suggested ownership:

```text
career-catalog owns CareerTrack and ProjectTrack
onboarding owns User/Profile intake data
team-matching owns Team, TeamMember, and JoinRequest
workspace owns Milestone and MilestoneSubmission
career-output owns FinalOutput templates and generated summaries
```

### Done When

- The team can draw the schema from real API needs.
- Every table/entity has a module owner.
- No module needs direct table access to another module's data.
- The team chooses the simplest database that supports the MVP.

### Team Rule

Do not design the database around every future idea. Design it around the contracts the MVP already uses.

---

## Phase 5: Full Stack Phase

### Goal

Swap in database-backed adapters without rewriting the UI.

### What To Build

Replace in-memory repositories with persistent repositories:

```text
InMemoryProjectRepository -> DatabaseProjectRepository
InMemoryTeamRepository -> DatabaseTeamRepository
InMemoryProfileRepository -> DatabaseProfileRepository
```

The public APIs should stay stable.

### Done When

- Refreshing the page does not lose saved state.
- Onboarding/profile data persists.
- Join requests persist.
- Teams and milestones persist.
- The first pilot can run with real users.

### Team Rule

The database is an implementation detail behind a module adapter. UI components should not know which database exists.

---

## Recommended Team Workflow

Use this flow for each MVP feature:

1. Pick one user story from `docs/user-centered-design/user-stories.md`.
2. Build or adjust the prototype screen with fake data.
3. Write the module public API needed by that screen.
4. Implement the module with an in-memory repository.
5. Connect the screen to the module API.
6. Add persistence only after the contract survives review.

This lets designers, frontend developers, and backend developers work together without waiting on a perfect database plan.

---

## First Sprint Recommendation

For the next sprint, build only this:

```text
career-catalog module
```

Scope:

- Move `prototype/syrena-prototype/src/data/tracks.js` into a module-owned in-memory repository.
- Expose `listTracks`, `getTrack`, and `getProject` through `PublicApi/index.js`.
- Connect track selection, project list, and project detail screens to that API.
- Keep all data in memory.

This gives the team a working example of the architecture before adding onboarding, matching, workspace, or database complexity.

---

## Decision

This process is valid going forward.

It matches the repo's current direction because it combines:

- UCD-first prototype work
- module contracts
- adapter-based implementation
- delayed persistence decisions
- modular monolith boundaries

The main discipline required is that the team must not treat fake data as throwaway chaos. Fake data should evolve into in-memory adapters that use the same contracts the database-backed version will use later.
