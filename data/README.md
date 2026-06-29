# Application User Core Journey:

**user-profile → student-profile → onboarding-survey → discovery-track-page → (choose a project pre-made template) / (create a custom project idea) / (browse and choose reccomended project tracks) → review/approve team requests → team formation → project-dashboard execution → career-ready output**

The app is not just a job board or a generic project list. It is a **career-readiness project accelerator** where students can either:

```txt
1. Start from a curated project template
2. Create their own project idea
3. Join another user's active project/team
```


# Application Data Scopes:

## 1. User Account Data

Core identity and trust data.

| Data | Examples |
|---|---|
| User ID | internal UUID |
| Name | Sophie Kim |
| Email | school email preferred |
| Email verification status | unverified, pending, verified |
| Institution | UCLA, UC Irvine, SJSU |
| Profile photo/avatar | optional |
| Created date | signup timestamp |
| Account status | active, suspended, deleted |

For MVP, avoid working with sensitive data like government ID. School email verification is enough.

## 2. Student Profile Data

This powers matching, recommendations, and project discovery.

| Data | Examples |
|---|---|
| School year | freshman, sophomore, junior |
| Major/minor | CS, Business Econ, Design, HCI |
| Target role | SWE intern, UX intern, business analyst |
| Target industries | tech, startups, consulting, education |
| Skills | React, Python, Figma, SQL, market research |
| Tools used | GitHub, Figma, Notion, Tableau |
| Weekly availability | 3-5 hrs, 6-10 hrs |
| Time zone | Pacific, Eastern |
| Preferred project length | 4 weeks, 5 weeks, 6 weeks |
| Links | LinkedIn, GitHub, portfolio |
| Bio | short intro |


## 3. Onboarding Survey Data

This should be separate from the profile because it drives recommendations.

| Data | Why it matters |
|---|---|
| Career interests | engineering, design, business, product, data |
| Confidence level | helps personalize guidance |
| Existing project experience | helps difficulty matching |
| Desired final artifact | GitHub repo, case study, deck, dashboard |
| Internship goal timeline | recruiting this semester, next summer, exploring |
| Commitment level | casual, serious, pilot-ready |
| Collaboration preference | join team, start team, undecided |
| Teammate preference | serious beginners, design-heavy team |
| Project preference | web app, dashboard, redesign, strategy deck |

## 4. Discovery/Career Track Page Data

Career tracks are the top-level discovery pages. This is the layout of the discovery page, how each project tracks are formatted or organized.

Example tracks:

```txt
Software Engineering
Data Analytics
Product Management
UX / Product Design
Marketing / Growth
Consulting / Strategy
Startup / Entrepreneurship
```

Each career track should store:

| Data | Examples |
|---|---|
| Career track ID | `software-engineering` |
| Title | Software Engineering |
| Slug | `software-engineering` |
| Short title | Engineering |
| Description | Build and ship real products |
| Target roles | SWE intern, backend intern, full-stack intern |
| Target industries | tech, startups, education |
| Common internships | Microsoft Explore, startup SWE intern |
| Skills overview | Git, APIs, React, deployment |
| Useful outputs | GitHub repo, deployed app, README |
| Recommended project types | web app, API, AI prototype |
| Display metadata | icon, color, featured order |

The career-track page should not only show static career information. It should become the **hub for project opportunities**.

## 5. Discovery/Career Project Track Data

The data of each individual projects track that will be displayed in the discovery page.

```txt
Career overview
Recommended project templates
User-created project ideas
Open teams looking for members
Recently completed projects
Filters/sorting
Create project idea CTA
```

For example:

```txt
Software Engineering Track

Templates:
- Full-Stack Campus Tool
- AI Feature Prototype
- API Backend Reliability Project

User-created project ideas:
- Dorm Event Finder
- Study Group Matcher
- Campus Marketplace

Open teams:
- Campus Connect Team needs 1 designer
- Meal Swipe Tracker needs 1 backend developer
```

So the page needs data from multiple entities:

| Section | Data source |
|---|---|
| Track header | `CareerTrack` |
| Template cards | `ProjectTemplate` |
| User project ideas | `ProjectIdea` |
| Active teams | `Team` |
| Open roles | `TeamRoleSlot` or `TeamMember` |
| Filters | role, difficulty, availability, school, status |
| Completed examples | `CompletedProject` or completed `Team` records |

## 6. Project Template Data

Project templates are curated starter projects created by the platform/admins.

They answer:

```txt
“I want to build something useful, but I do not know what project to choose.”
```

Each template should store:

| Data | Examples |
|---|---|
| Template ID | `full-stack-campus-tool` |
| Career track ID | `software-engineering` |
| Title | Full-Stack Campus Tool |
| Description | Build a web app that solves a campus problem |
| Difficulty | beginner, intermediate |
| Duration | 5 weeks |
| Recommended team size | 3-5 |
| Required roles | developer, designer, product lead |
| Skills built | React, SQL, Figma, interviews |
| Final outputs | repo, demo, resume bullets |
| Milestone template | week-by-week plan |
| Sample resume bullets | static or generated |
| Target internship roles | SWE intern, startup intern |
| Visibility | public, draft, archived |
| Created by | admin/platform |
| Version | useful if templates evolve |

Templates are not teams yet. They are reusable starting points.

## 7. User-Created Project Idea Data

This is different from a template.

A user-created project idea is a student saying:

```txt
“I have an idea and want people to join me.”
```

Each project idea should store:

| Data | Examples |
|---|---|
| Project idea ID | UUID |
| Creator user ID | user who created it |
| Career track ID | software-engineering |
| Based on template ID | optional |
| Title | Campus Study Buddy |
| Problem statement | Students struggle to find study groups |
| Proposed solution | matching app for courses/study sessions |
| Project type | web app, dashboard, redesign, campaign |
| Target users | college students |
| Difficulty | beginner |
| Expected duration | 5 weeks |
| Desired final output | deployed app + GitHub repo |
| Needed roles | frontend dev, designer, product lead |
| Skills involved | React, Firebase, Figma |
| Status | idea, recruiting, active, completed, archived |
| Visibility | public, school-only, invite-only |
| School restriction | any school, same school only |
| Created date | timestamp |
| Updated date | timestamp |

This lets users create custom project ideas without forcing everything to come from platform templates.

## 8. Team Data

A team is when a project idea becomes an active group.

A team can come from:

```txt
1. A platform project template
2. A user-created project idea
3. A fully custom project started from scratch
```

Each team should store:

| Data | Examples |
|---|---|
| Team ID | UUID |
| Project idea ID | optional |
| Project template ID | optional |
| Career track ID | software-engineering |
| Team name | Campus Connect Team |
| Custom project title | Study Group Matcher |
| Project summary | what the team is building |
| Owner/creator ID | user ID |
| Status | forming, active, completed, abandoned |
| Current week | 1, 2, 3, 4, 5 |
| Start date | date |
| Target end date | date |
| Max members | 5 |
| Communication link | Discord, Slack, Notion |
| Visibility | public, invite-only |
| School restriction | same school only, any school |
| Commitment expectation | 5 hrs/week |

Important distinction:

```txt
ProjectTemplate = reusable platform starter
ProjectIdea = custom idea proposed by a user
Team = actual group working on something
```

## 9. Team Role Slot Data

Do not only store “team members.” The career-track page needs to show what roles are open.

| Data | Examples |
|---|---|
| Role slot ID | UUID |
| Team ID | related team |
| Role name | UX Designer |
| Role category | design |
| Required count | 1 |
| Filled count | 0 |
| Skill expectations | Figma, wireframes |
| Weekly commitment | 4-6 hrs |
| Status | open, filled, closed |

This supports cards like:

```txt
Campus Study Buddy
Needs: 1 Designer, 1 Backend Developer
```

## 10. Team Member Data

Store each person’s actual role and commitment.

| Data | Examples |
|---|---|
| Team ID | team |
| User ID | member |
| Role | Developer |
| Role status | lead, contributor |
| Joined date | timestamp |
| Weekly availability | 6 hrs |
| Participation status | active, inactive |
| Contribution summary | optional |
| Permissions | owner, member |

## 11. Join Request Data

Needed for team matching and approval flows.

| Data | Examples |
|---|---|
| Request ID | UUID |
| Team ID | target team |
| User ID | applicant |
| Desired role | UX Designer |
| Message | I can help with Figma and research |
| Availability | 5 hrs/week |
| Relevant skills | Figma, interviews |
| Portfolio links | optional |
| Status | pending, accepted, declined, withdrawn |
| Reviewed by | team owner |
| Created date | timestamp |

## 12. Workspace Data

Once a team starts, it needs execution data.

| Entity | Data |
|---|---|
| Workspace | team ID, project goal, current week, progress |
| Milestone | week number, goal, due date, status |
| Task | title, description, role owner, status |
| Deliverable | expected artifact, required link/file |
| Submission | URL/file, submitted by, submitted date |
| Comment | feedback or discussion |
| ChecklistItem | final output requirements |

For MVP, keep submissions simple: links to GitHub, Figma, Google Docs, Notion, Tableau, slides, or deployed apps.

## 13. Final Career Output Data

This is a major differentiator.

| Data | Examples |
|---|---|
| Final project summary | what the team built |
| User contribution summary | what this student did |
| Resume bullets | 2-3 generated suggestions |
| LinkedIn description | project post draft |
| Portfolio outline | UX case study, GitHub README, strategy summary |
| Interview story | STAR format |
| Artifact links | repo, demo, deck, Figma |
| Completion status | draft, ready, exported |

## 14. Safety / Trust Data

For MVP, lightweight but important.

| Data | Examples |
|---|---|
| Verification status | school email verified |
| Community agreement accepted | true/false |
| Report | reporter, target, reason, details |
| Team feedback | reliability, communication, contribution |
| No-show / inactive flags | for pilot operations |
| Admin notes | manual moderation |

## 15. Product Analytics Data

Useful for validation.

| Event | Why |
|---|---|
| onboarding completed | measure activation |
| career track viewed | measure demand |
| template viewed | measure template interest |
| project idea created | measure user initiative |
| team viewed | measure joining intent |
| join request submitted | measure conversion |
| team formed | core success metric |
| milestone completed | execution health |
| final output exported | strongest success metric |



## The Most Important Product Distinction

The app should separate these three things clearly:

```txt
CareerTrack
= a career direction like Software Engineering or UX Design

ProjectTemplate
= a reusable platform-created starter project

ProjectIdea
= a custom idea created by a user

Team
= the real group of people working on a template or idea
```

That structure makes the career-track page much stronger because it can support both discovery modes:

```txt
“I need an idea.”
→ show project templates

“I want to join people.”
→ show open teams and user-created ideas

“I have my own idea.”
→ let the user create a project idea and recruit teammates
```
