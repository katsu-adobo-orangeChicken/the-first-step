# Project Tech Stack Overview

This document defines the core technology stack chosen for The First Step MVP. These decisions prioritize developer velocity for our 3-person team, strict modular isolation, and industry-standard best practices.

## 1. Technology Selection

| Category | Technology | Reasoning |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 (Vite) | Industry-standard component model; perfect for modular UI. |
| **Styling** | Tailwind CSS | Utility-first; promotes component colocation and clean code. |
| **Language** | JavaScript (ESM) | Native modularity; minimal boilerplate. |
| **Backend/Database** | Supabase (PostgreSQL) | Full-stack service: Relational DB, Auth, and Storage in one. |
| **Authentication** | Supabase Auth | Seamlessly integrated with the database. |
| **Deployment** | Vercel | Optimized for React/Vite builds; instant preview environments. |
| **Versioning** | GitHub | Standardized collaboration and issue tracking. |

## 2. Structural Implementation Strategy

To maintain a Modular Monolith, we avoid global file structures. Instead, we use colocation—where the HTML (React JSX), CSS (Tailwind), and JS logic for a specific feature live within the same domain folder.

### Example: Career Catalog Module
Every feature is a "vertical slice." Here is how the Career Catalog module encapsulates its own HTML, logic, and styles:

```plaintext
src/
  modules/
    career-catalog/
      Internal/
        ui/
          TrackList.jsx     <-- "HTML" (React JSX) + Tailwind Classes
          TrackList.css     <-- (Optional) Only if specific module-only CSS is needed
        domain/
          repository.js     <-- Pure JS Logic (Data fetching/filtering)
      PublicApi/
        index.js            <-- The ONLY "Front Door" for other modules