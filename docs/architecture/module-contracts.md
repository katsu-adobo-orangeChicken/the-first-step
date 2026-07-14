# Module Contracts Guide

This guide translates the product flow in [docs/design/designoverview.md](docs/design/designoverview.md) into lightweight module contracts for the MVP skeleton in this repo. The current codebase is still mostly UI-level plumbing, so these contracts are intentionally simple: they describe the minimum behavior a module should support with mock data and a clear public API.

## How to read these contracts

Each module below answers the same questions:

- What user problem does this module solve?
- What data does it own?
- What page or flow does it power?
- What public functions should other code call?
- What mock behavior is required for the first pass?
- What is intentionally out of scope for now?

## Architecture rule

Other code should import from [src/modules/[module]/PublicAPI/index.js](src/modules) only. Other code should not import from [src/modules/[module]/Internal](src/modules).

## Current repo alignment

The current app shell in [src/app/App.jsx](src/app/App.jsx) renders the career catalog module, and the existing discovery experience in [src/modules/career-catalog/Internal/ui/career-catalog-page.jsx](src/modules/career-catalog/Internal/ui/career-catalog-page.jsx) is already a good example of the intended skeleton level: simple logic, mock data, and a visible UI flow.

## Module contract format

Each module contract uses this shape:

- Purpose
- Owns
- Public API
- Mock-data pass
- Not required yet

## 1. App Shell

### Contract

The app shell is responsible for hosting the product flow and keeping the layout consistent. It should be able to render the main MVP journey without knowing each module's internal implementation details.

- Owns: route map, layout, header/footer placement, page composition
- Public API: `renderApp()`, `getCurrentPage(routeName)`
- Mock-data pass: can switch between landing, account, onboarding, discovery, and workflow placeholders
- Not required yet: protected routes, real account menu, notifications, personalized dashboards

## 2. Identity

### Contract

A student can start the experience by creating an account, seeing a fake signed-in state, and moving forward into onboarding. The module should act like a lightweight auth shell without real password handling.

- Owns: user account basics, name, email, account status, session state
- Public API: `createAccount(input)`, `getCurrentUser()`, `signIn(input)`, `signOut()`
- Mock-data pass: captures basic form data, validates required fields, and creates a temporary current user
- Not required yet: real auth, password reset, OAuth, moderation tools

## 3. Onboarding

### Contract

A student can enter profile and goal information, see simple suggested directions, and continue into discovery with a selected path. The logic can stay mock-based for now.

- Owns: profile data, survey answers, goals, skills, role interests, experience level
- Public API: `getProfile(userId)`, `saveProfile(userId, input)`, `getSurvey(userId)`, `saveSurvey(userId, input)`, `getSuggestedDirections(userId)`
- Mock-data pass: collects basic profile fields, saves answers locally, and returns at least one recommended direction
- Not required yet: AI recommendations, perfect matching, photo upload, school directory integration

## 4. Career Catalog

### Contract

A student can open the discovery page, understand what opportunities exist, search or filter the list, and click a card placeholder for details. The data is mocked, but shaped like future real data.

- Owns: career tracks, project templates, discovery sections, project metadata
- Public API: `listCareerTracks()`, `getCareerTrack(trackId)`, `listRecommendedProjects(filters)`, `getProjectDetail(projectId)`
- Mock-data pass: shows project cards with title, description, difficulty, team size, and outcome; supports search and one filter; clicking a card opens a placeholder detail view
- Not required yet: persistence, full marketplace search, advanced ranking, real bookmarks

## 5. Project Intake

### Contract

A student can start a project idea flow and create a draft project concept. The module should support the idea of creating a project or team from scratch without needing a full form builder yet.

- Owns: project idea draft, title, problem, solution, type, roles, difficulty, duration
- Public API: `createProjectIdea(userId, input)`, `updateProjectIdea(projectIdeaId, input)`, `getProjectIdea(projectIdeaId)`, `publishProjectIdea(projectIdeaId)`
- Mock-data pass: user can enter basic project details and create a fake draft idea
- Not required yet: rich text editing, file uploads, AI generation, approval workflow

## 6. Team Matching

### Contract

A student can choose to join an existing team or start a new one. The module should surface open team options and allow a placeholder join or create flow.

- Owns: teams, open role slots, members, join requests
- Public API: `listOpenTeams(filters)`, `getTeam(teamId)`, `createTeam(userId, input)`, `requestToJoinTeam(userId, teamId, input)`
- Mock-data pass: shows team cards with summary, roles, and CTA buttons; creates a fake pending request or fake team draft
- Not required yet: chat, scheduling, automated matching, complex approvals

## 7. Workspace

### Contract

A student or team can see a project workflow with milestones, tasks, and progress. The module should help the user understand what happens next in a project without needing full project-management complexity.

- Owns: workspace state, milestones, tasks, submissions, checklist items
- Public API: `getWorkspace(teamId)`, `listMilestones(workspaceId)`, `listTasks(workspaceId, filters)`, `completeTask(taskId, userId)`, `submitLink(taskId, userId, input)`
- Mock-data pass: shows a simple weekly structure with role-based tasks and local completion state
- Not required yet: comments, real file uploads, permissions, full kanban board

## 8. Career Output

### Contract

A student can see a simple final wrap-up of a completed project and generate basic career-ready output like resume bullets or a summary. The experience can be manually unlocked for now.

- Owns: final output draft, resume bullet ideas, portfolio summary, linked project story
- Public API: `getFinalOutput(teamId, userId)`, `generateFinalOutput(teamId, userId)`, `updateFinalOutput(outputId, input)`
- Mock-data pass: shows a project summary, contribution notes, and a few sample output bullets
- Not required yet: PDF export, AI generation, recruiter sharing, public portfolio hosting

## 9. Safety and Trust

### Contract

A student can acknowledge community expectations and submit a simple report or feedback signal when needed. The module should make the product feel safer without building a full moderation system yet.

- Owns: community agreement state, trust indicators, reports, feedback signals
- Public API: `getTrustStatus(userId)`, `acceptCommunityAgreement(userId)`, `submitReport(reporterUserId, input)`, `submitTeamFeedback(userId, teamId, input)`
- Mock-data pass: shows trust indicators, allows a fake agreement action, and stores a placeholder feedback/report entry
- Not required yet: government ID checks, automated moderation, admin dashboard

## 10. Analytics

### Contract

The product can record important user actions in a lightweight way so the team can learn where the flow is working and where it is dropping off.

- Owns: analytics event names, timestamps, event payloads
- Public API: `trackEvent(eventName, payload)`, `listEvents(filters)`
- Mock-data pass: logs events to console or memory for the current MVP session
- Not required yet: analytics dashboard, third-party integrations, A/B testing

## MVP implementation order

For the current repo, the best next target is still the career catalog flow because it already has the clearest skeleton and matches the discovery journey from the design overview.

1. App shell
2. Career catalog
3. Onboarding
4. Team matching
5. Workspace
6. Career output
7. Identity
8. Safety and trust
9. Analytics
10. Project intake

## Definition of done for a module

A module is considered “done enough” for the current stage when:

- it has a clear PublicAPI entry point
- the UI imports from that public API rather than internal files
- it works with mock data shaped like future real data
- the main user action is visible and functional
- the module can later swap mock storage for real storage without rewriting the UI

