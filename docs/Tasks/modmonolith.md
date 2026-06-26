# The First Step — Modular Monolith Architecture

## Overview

The First Step should be built as a **Modular Monolith**.

This means the platform is developed and deployed as **one application**, but the inside of the system is divided into clear modules based on business functions.

Instead of starting with microservices, The First Step should first organize its main features into modules such as User, Onboarding, Career Guidance, Project Recommendation, Project & Team, and Workflow.

This is a good approach because The First Step is still in the MVP stage. At this stage, the product needs fast iteration, simple deployment, and flexible design rather than complicated infrastructure.

---

## Why Modular Monolith Fits The First Step

The First Step helps students who want internship or career experience but do not know where to start. The platform guides users through the full journey:

1. Create a profile
2. Complete onboarding
3. Discover career directions
4. Get project recommendations
5. Join or start a project
6. Find teammates
7. Follow a project workflow

Because these steps are clearly separated, each part can become its own module inside one application.

---

## High-Level Architecture

```txt
The First Step App
│
├── User Module
│   ├── Login / Sign up
│   ├── Profile
│   └── School verification
│
├── Onboarding Module
│   ├── Survey questions
│   ├── User interests
│   ├── Skills
│   └── Career goals
│
├── Career & Recommendation Module
│   ├── Career path guidance
│   ├── Required skills by role
│   └── Recommended projects
│
├── Project & Team Module
│   ├── Browse projects
│   ├── Start a project
│   ├── Join a project
│   ├── Required roles
│   └── Team matching
│
└── Workflow Module
    ├── Weekly milestones
    ├── Role-specific tasks
    ├── Progress tracking
    └── Completion checklist


    
User signs up
     ↓
Creates profile / verifies school email
     ↓
Completes onboarding survey
     ↓
Gets career direction suggestions
     ↓
Receives project recommendations
     ↓
Chooses to join or start a project
     ↓
Finds teammates
     ↓
Follows weekly workflow
     ↓
Completes portfolio-ready project


src/
  modules/
    user/
      components/
      services/
      repositories/
      types.ts
      index.ts

    onboarding/
      components/
      services/
      repositories/
      types.ts
      index.ts

    career-recommendation/
      components/
      services/
      repositories/
      types.ts
      index.ts

    project-team/
      components/
      services/
      repositories/
      types.ts
      index.ts

    workflow/
      components/
      services/
      repositories/
      types.ts
      index.ts

  shared/
    ui/
    lib/
    database/
    types/