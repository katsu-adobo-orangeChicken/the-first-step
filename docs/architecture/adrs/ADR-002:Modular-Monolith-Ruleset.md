# ADR 002: Modular Implementation Ruleset

## Metadata
* **Author(s):** Angelo
* **Date:** 2026-06-26
* **Status:** Proposed
* **Impacted Components:** `src/modules/`, `src/shared/`, `src/app/`

## Context & Problem Statement
The First Step is scaling from a prototype to an MVP. We have chosen a **Modular Monolith** architecture (ADR-001) to enable parallel feature development. We need a set of shared rules to ensure our code stays organized and we don't accidentally create a "big ball of mud" where every file depends on every other file.

## Considered Options
* **Option 1:** Allow direct imports across modules; rely on team communication.
* **Option 2:** Use a heavy-weight DI library
* **Option 3:** Implement a simple custom Service Container and Event Bus with strict boundary rules.

## Decision Outcome
Chosen Option: **Option 3**, because it keeps our system lightweight and easy to understand for the MVP stage, while still providing the "safety rails" we need to keep our code modular.

### Implementation Strategy: The "Team Rules"
To keep our code clean, we are following these four rules:

1. **Only use the front door:** If you need to use functionality from another module, **only** import from their `PublicApi/index.js`. Never reach into their `Internal/` folder. If something you need isn't in the `PublicApi`, talk to that module's owner and ask them to add it.
2. **Don't build tools, ask for them:** We are using a `ServiceContainer`. Instead of importing a service directly, you will use `const service = container.get('ServiceName')`. This keeps our modules from being "glued" together.
3. **Use the Post Office for events:** If you need to tell other modules that something happened (like `user.signedUp`), don't call their functions directly. Emit an event on the `EventBus`. This keeps our modules independent.
4. **UI is just a wrapper:** Keep your business logic in the `domain/` folders. Your UI components should be "thin" and only call the `PublicApi` to get work done.



## Consequences
### ✅ Positive (Pros)
* **Easy to Change:** We can refactor internal logic without breaking the rest of the app.
* **Fewer Merge Conflicts:** Because modules are separated, we can work on `onboarding` and `career-catalog` at the same time without stepping on each other's toes.
* **Testable:** Using a Service Container makes it much easier to write tests.

### ❌ Negative (Cons / Risks)
* **Setup Time:** It takes a little extra effort to register services and emit events compared to simple imports.
* **Discipline:** We have to be disciplined about using the `PublicApi`. If we get lazy, the architecture breaks.

## Pros & Cons of Alternative Options

### Option 1: Direct Imports (The "Trust-based" model)
* **Why we considered it:** It is the fastest way to write code.
* **Why we rejected it:** It makes the code very "tangled." Within a few months, it will be impossible to change one file without breaking five others.

### Option 2: Heavy-weight DI Libraries
* **Why we considered it:** It is a professional-grade standard.
* **Why we rejected it:** It adds too much complexity for an MVP. We prefer to build a simple, custom version that we fully understand.