# Architectural Manifesto: The First Step Modular Monolith

This document defines the architectural rules and module communication strategy for *The First Step*. The goal is to support MVP speed while enforcing boundaries that keep the codebase maintainable and extractable later.

---

## 1. Architectural Philosophy

We have adopted a **Modular Monolith** architecture. This gives us the organizational benefits of independent modules without the operational complexity of distributed systems.

### Key Principles

- **Vertical Slices:** Features are organized by business capability, not technical role.
- **Encapsulation:** Each module hides its implementation behind a small public contract.
- **Framework Agnosticism:** Core business logic must not depend on React or any other UI framework.
- **Explicit Boundaries:** Modules may not import each other’s private implementation files.

---

## 2. Directory Structure

```text
src/
├── app/                  # Application bootstrap and global shell
│   ├── main.js           # Entry point
│   ├── App.js            # Root application composition
│   ├── router/           # Routing configuration
│   └── shell/            # Layout, navigation, footer, etc.
│
├── modules/              # Domain-specific vertical slices
│   ├── [domain]/         # e.g., onboarding, workflow, career-catalog
│   │   ├── PublicApi/    # Only entry point allowed for other modules
│   │   │   └── index.js
│   │   └── Internal/     # Private implementation details
│   │       ├── domain/   # Business logic and rules
│   │       ├── application/ # Use cases and orchestration
│   │       └── ui/       # Thin UI adapters or presentation code
│   │
│   └── ...
│
└── shared/               # Cross-cutting technical concerns only
    ├── EventBus.js       # In-process pub/sub infrastructure
    ├── ServiceContainer.js # Dependency injection container
    ├── kernel/           # Core technical primitives
    ├── primitives/       # Helpers with no business rules
    ├── ui/               # Shared presentational components only
    └── styles/           # Global CSS
```

---

## 3. Structural Rules

### Public API Gateway

Every module must expose its capabilities only through `PublicApi/index.js`.

- The `app/` layer may import only from a module’s `PublicApi/index.js`.
- Other modules may import only from a module’s `PublicApi/index.js`.
- `Internal/` folders are private and must never be imported directly outside the owning module.
- If another module needs functionality, it must be added to the owning module’s public contract.

### Shared vs Module Code

- **Modules** contain domain-specific business logic.
- **Shared** contains technical primitives only.
- No business rules belong in `shared/`.
- Shared code must not become a junk drawer or a place for domain shortcuts.

---

## 4. Communication Strategy

### Synchronous Calls

Use a module’s **public API** for synchronous business interactions.

- A module should call another module through its public facade.
- The caller should not know about the callee’s internal structure.
- Public API methods should be small, explicit, and stable.

### Asynchronous Reactions

Use the in-process **EventBus** for async cross-module communication.

- A module emits an event when something meaningful happens.
- Other modules subscribe and react without direct imports.
- Events should represent business facts, not UI actions.

### Rule of Thumb

- Use **public API** when you need a direct answer now.
- Use **events** when you are notifying other modules that something happened.

---

## 5. Dependency Injection

Modules receive dependencies from the outside instead of creating them internally.

- The application bootstrap creates the container.
- The container registers module services and shared infrastructure.
- Modules depend on abstractions and injected services, not hard-coded imports.
- The container lives in `shared/ServiceContainer.js` and is wired in `app/`.

### DI Rule

- Do not instantiate shared infrastructure inside domain code.
- Do not import concrete implementations across module boundaries when a contract can be injected instead.

---

## 6. Adapter Strategy

Adapters are the boundary between external systems and internal business logic.

- UI code should be a thin adapter over module logic.
- React, Vanilla JS, or any other UI library may be used only at the edge.
- Core module code must remain framework-agnostic.
- External APIs, storage, and browser-specific concerns should be wrapped behind adapters.

### Adapter Rule

- Domain code should not depend on the UI framework.
- The UI layer should call module public APIs, not private domain files.
- Adapter code should translate external input into module-friendly calls.

---

## 7. Interface Strategy

An **interface strategy** means each module exposes a stable contract that other parts of the app can rely on.

- The contract is defined by the module owner.
- The implementation may change without affecting consumers.
- The contract should describe capabilities, not implementation details.
- The same public API should work for real services, mocks, and future extracted services.

### Interface Rule

- Consumers must depend on the contract, not the implementation.
- If a capability is needed externally, it belongs in the public API.
- If a capability is private, it stays inside `Internal/`.

---

## 8. Data Ownership

Each module owns its own data and persistence boundaries.

- Modules may not read or write another module’s tables directly.
- Cross-module joins and cross-module table access are not allowed.
- Shared data should be obtained through public APIs or events.
- Module-owned schemas should be isolated so extraction remains possible later.

### Data Rule

- A module owns its data.
- Other modules consume that data only through the public API or event-driven read models.
- No direct coupling through database access.

---

## 9. Operational Enforcement

These rules must be enforced mechanically, not just documented.

### Required Enforcement

- Static import checks to block imports outside `PublicApi/`.
- Lint rules to prevent illegal cross-module dependencies.
- Architecture tests in CI to validate module boundary rules.
- Review gates that reject direct access to `Internal/` folders.

### Enforcement Rule

- If a rule can be violated accidentally, it must also be enforced automatically.

---

## 10. Adding New Features

When creating a new domain, follow this process:

1. **Create the module folder** under `modules/`.
2. **Define the public contract** in `PublicApi/index.js`.
3. **Implement business logic** inside `Internal/`.
4. **Register dependencies** in the application bootstrap.
5. **Expose events** for important state changes.
6. **Validate boundaries** with linting and architecture checks.

---

## 11. JavaScript Architecture Basics

### Event

An **event** is a fact that something happened.

Examples:

- A user signed up.
- A workflow completed.
- A record was created.

```js
eventBus.emit("user.signedUp", { userId: "123" });
```

In simple terms:

```txt
Something happened
↓
An event was emitted
↓
Subscribers reacted
```

---

### Pub/Sub Pattern

**Pub/Sub** means one part of the app publishes a message and other parts subscribe to it.

```txt
Publisher
↓
EventBus
↓
Subscriber
```

In simple terms:

**Pub/Sub lets parts of the app communicate without direct dependency.**

---

### EventBus

An **EventBus** is the in-process system that connects publishers and subscribers.

Typical methods:

```txt
on()
off()
emit()
```

In simple terms:

**EventBus is the app’s internal notification system.**

---

### Dependency Injection

**Dependency Injection** means a module receives what it needs from the outside instead of creating it itself.

```js
class OrderService {
  constructor(api) {
    this.api = api;
  }
}
```

In simple terms:

**DI makes code easier to test and replace.**

---

### DI Container

A **DI Container** registers and resolves services.

```js
const orderService = container.resolve("OrderService");
```

In simple terms:

**A DI container is the app’s service registry.**

---

### Adapter Pattern

An **Adapter** converts one interface into another.

```txt
External system
↓
Adapter
↓
Internal contract
```

In simple terms:

**Adapters let the app talk to different systems through one shape.**

---

### Interface Strategy

An **Interface Strategy** means defining a stable contract for how modules are used.

```txt
Consumer
↓
Public Contract
↓
Implementation
```

In simple terms:

**The contract stays stable even if the implementation changes.**

---

## 12. How It All Works Together

```txt
UI Layer
React / Vanilla JS / Vue
↓
Adapters
↓
Module Public APIs
↓
Domain Logic
↓
DI Container
↓
Shared Services
↓
EventBus
↓
Other Modules
```

The goal is to make the application:

- Easier to change.
- Easier to test.
- Less dependent on one framework.
- Easier to extend.
- Easier to extract later if needed.

---

## 13. Quick Summary

```txt
Public API
= How other modules are allowed to call a module

EventBus
= How modules publish facts for async reactions

Dependency Injection
= Passing dependencies from outside

DI Container
= Registry that creates and resolves services

Adapter Pattern
= Translating external shapes into internal contracts

Interface Strategy
= Defining stable contracts between parts of the app
```

---

## Final Summary

This architecture keeps module communication explicit, framework usage isolated, and business logic protected from technical churn.

Instead of letting parts of the app depend on each other directly, we use:

```txt
Public APIs
EventBus
Dependency Injection
Adapters
Interfaces
```

That makes the codebase more maintainable now and easier to extract later.