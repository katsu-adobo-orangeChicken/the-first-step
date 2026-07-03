# ADR 003: Module-Owned Data Boundaries with Supabase PostgreSQL

## Metadata
* **Author(s):** Angelo
* **Date:** 2026-07-01
* **Status:** Proposed
* **Impacted Components:** `src/modules/`, `src/shared/`, Supabase PostgreSQL, Supabase Auth

## Context & Problem Statement
The First Step uses a **Modular Monolith** architecture (ADR-001) with strict module boundaries, public APIs, and an EventBus (ADR-002). Our application tech stack relies on **React 19 (Vite)** on the frontend, styled with **Tailwind CSS**, communicating via native **JavaScript (ESM)** to a **Supabase (PostgreSQL)** backend with **Supabase Auth**.

Because we are utilizing a single, shared Supabase instance for rapid development, we run the risk of creating tightly coupled database dependencies. If any module can run arbitrary queries or joins against another module's database tables, our architectural boundaries become illusions. We need a strategy that maintains the simplicity of a single hosted Supabase database while ensuring each module strictly isolates and owns its data.

## Considered Options
* **Option 1:** Shared Supabase database with unrestricted table access (Global database helpers).
* **Option 2:** Multi-tenant isolation / Separate Supabase database per module.
* **Option 3:** Shared Supabase PostgreSQL with module-owned data boundaries via Colocated Repositories.

## Decision Outcome
Chosen Option: **Option 3: Shared Supabase PostgreSQL with module-owned data boundaries**. This option preserves the high developer velocity of a single hosted backend for our 3-person team while strictly enforcing the domain boundaries of our modular monolith.

### Implementation Strategy: The "Data Rules"

```plaintext
src/modules/career-catalog/
  ├── Internal/
  │    ├── ui/                 <-- TrackList.jsx (React 19 + Tailwind)
  │    └── domain/             <-- repository.js (Isolated Supabase queries for this table ONLY)
  └── PublicApi/
       └── index.js            <-- The single "Front Door" exposing clean data structures