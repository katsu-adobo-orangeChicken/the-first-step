# Architectural Manifesto: The First Step Modular Monolith

This document outlines the high-level architecture and organizational standards for *The First Step*. Our goal is to balance the speed required for an MVP with the rigorous boundaries needed to ensure long-term maintainability.

---

## 1. Architectural Philosophy
We have adopted a **Modular Monolith** architecture. This approach provides the clean domain boundaries and encapsulation benefits of microservices without the operational complexity, network latency, and infrastructure costs of a distributed system.

### Key Principles
* **Vertical Slices:** Features are organized by business capability (e.g., `onboarding`, `workflow`) rather than technical role (e.g., `controllers`, `views`).
* **Encapsulation:** Domain logic is hidden behind explicit interfaces.
* **Framework Agnosticism:** Core business logic remains decoupled from the UI framework to allow for future flexibility.

---

## 2. Directory Structure

```text
src/
├── app/                  # Application bootstrap and global shell
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Root component
│   ├── router/           # Routing configuration
│   └── shell/            # Layout (Navbar, Footer, etc.)
│
├── modules/              # Domain-specific Vertical Slices
│   ├── [domain]/         # e.g., career-catalog, onboarding, waitlist
│   │   ├── PublicApi/    # GATEWAY: Only entry point for other modules
│   │   └── Internal/     # IMPLEMENTATION: Domain logic, UI, and rules
│   │
│   └── ...
│
└── shared/               # Cross-cutting technical concerns
    ├── kernel/           # Core logic (Results, IDs, Dates)
    ├── primitives/       # Basic data helpers (Email, Slugs)
    ├── ui/               # Shared UI components (Button, Card)
    └── styles/           # Global CSS


## 3. Structural Rules & Boundaries

### The Gateway Pattern (`PublicApi/`)
To prevent "spaghetti code" and tightly coupled dependencies, every module must strictly adhere to the following rule:
* **Access Rule:** The `app/` layer and other modules must **only** import from a module’s `PublicApi/index.js`.
* **Encapsulation:** All `Internal/` folders are considered private. If you need functionality from another module, you must request that the module authors expose it through their `PublicApi`.

### Feature vs. Shared (`shared/`)
* **Modules:** Contain all business logic specific to a domain (e.g., "How to calculate career tracks").
* **Shared:** Contains only technical primitives that have no business logic (e.g., "How to render a Button component").
* **Anti-Pattern:** Never add business logic to the `shared/` folder. Doing so creates a "junk drawer" that will eventually become the system's single point of failure.

## 4. Operational Strategy

### Communication & Dependency Injection
Modules interact via a central registry and event system.
* **Service Container:** Services are registered at the application level during the bootstrap phase, allowing modules to resolve dependencies without hard-coding imports.
* **Event Bus:** Modules communicate state changes (e.g., `USER_SIGNED_UP`) by emitting events, ensuring that one module does not need to know the internal implementation of another to react to its changes.

### UI Adapters
The `Internal/ui` layer within each module is designed to be as "thin" as possible. By keeping business rules in `domain/` folders and separating them from the view components, we preserve the ability to migrate our UI to React or any other framework with minimal friction.

## 5. Adding New Features
When creating a new domain (e.g., `project-team`):
1. **Initialize:** Create a new folder under `modules/` with the standard `PublicApi/` and `Internal/` sub-directories.
2. **Define Contract:** Establish what the module offers in `PublicApi/index.js`.
3. **Implement:** Build the feature logic inside `Internal/`, strictly avoiding direct imports from the `Internal/` of other modules.
4. **Validate:** Ensure that the module is correctly registered in the `app/` bootstrap phase.