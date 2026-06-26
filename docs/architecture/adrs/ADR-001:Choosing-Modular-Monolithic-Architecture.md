# ADR 001: Adoption of a Modular Monolithic Architecture

## Metadata
* **Author(s):** Angelo Jas Sespene
* **Date:** 2026-06-24
* **Status:** Proposed
* **Impacted Components:** Entire application build architecture.

## Context & Problem Statement
Due to our team size and the type of project we are making; First Step. A good architecture we can use is **Modular Monolith Architecture**. This is a great choice for when making a brand new product, building from scratch.

One of the reasons why is that it's great for organizing our code using **Vertical Slices**. For example each core user experience is handled by a specifc module, everything used to build a portfolio goes inside the **portfolio** module. Each of these core user experience or slice is **isolated**. This is great for working simulataneously in multiple feautures since each components are isolated preventing merge conflicts. 


## Considered Options
* **Option 1:** Traditional Three-Tier Monolith (Layered Architecture)
* **Option 2:** Modular Monolithic Architecture
* **Option 3:** Distributed Microservices Architecture

## Decision Outcome
Chosen Option: **Option 2: Modular Monolithic Architecture**, because it provides the clean domain boundaries and encapsulation benefits of microservices without the operational complexity, network latency, and high infrastructure costs of managing a distributed system on day one.

### Implementation Strategy
* **Directory Structure:** Code will be strictly partitioned by domain features at the root level matching our vertical slices (e.g., `src/Users/`, `src/Portfolio/`, `src/Projects/`). Each module must expose a distinct `PublicApi/` contract interface, keeping implementation details private within an `Internal/` folder.
* **Communication Rules (Dependency Injection):** TBD
* **Database Isolation (Modular Isolation):** TBD
* **Architectural Linting & Tooling:** TDB


## Consequences

### ✅ Positive (Pros)
* **Low Operational Overhead:** Simplifies infrastructure with a single build artifact, single process to monitor, and a single straightforward CI/CD pipeline.
* **In-Memory Performance:** Eliminates network serialization and IPC latency; cross-module calls execute with the speed of standard local method invocations.
* **Frictionless Refactoring:** Correcting poorly drawn domain boundaries remains a cheap code-level refactoring task rather than an infrastructure-coordinated migration.
* **Clear Microservice Runway:** Because domain boundaries are strictly enforced via contracts, any module that outgrows the monolith can easily be extracted into a standalone service later.

### ❌ Negative (Cons / Risks)
* **Single Point of Failure:** Because all modules run in a single process, a fatal error or memory leak in one module (e.g., an unhandled exception or heavy asset processing) will crash the entire application.
* **Shared Resource Contention:** All modules share the same underlying CPU, memory pool, and physical database, requiring careful monitoring to prevent one noisy module from starving others.
* **Dependency Discipline Required:** Developers must continuously resist the temptation to bypass module APIs or write raw cross-schema SQL joins, requiring strict code review vigilance.
* **Build/Deployment Latency:** As the codebase grows, the entire application must be rebuilt and redeployed even for minor changes, potentially increasing the feedback loop time for CI pipelines.

## Open Items & Next Steps
To make this architecture successful, the following implementation details will be finalized in an immediate subsequent record. While we have firmly committed to the architectural layout of a Modular Monolithic Architecture for **The First Step**, we have deliberately left the technical rulesets open until our core language ecosystem is chosen, need to do more research.

1. **ADR 002: Modular Implementation Ruleset (Tech Stack, DI, Database, and Linting)** - A single, unified record defining our language/framework choice, how Dependency Injection and module isolation boundaries are configured, our specific database partitioning strategy, and the static linting tools needed to programmatically enforce these rules.