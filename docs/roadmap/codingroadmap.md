# Coding Roadmap


The goal is to build the app in the order of the user journey, so the team does not get lost while coding.

---

# Phase 1: Entry Pages

## Goal

Allow users to understand the product, create an account, or log in.

## Pages

1. Landing Page  
2. Create Account Page  
3. Login Page  

## Recommended Build Order

1. Landing Page  
2. Create Account Page  
3. Login Page  

## Reason

These are the first pages users see.  
Before users can access onboarding, projects, or dashboard, they need an entry point into the platform.

## Notes

For the first version, authentication can be fake or simplified.

Example:

- Click “Create Account” → go to Build Profile Page
- Click “Login” → go to Main Dashboard Page

---

# Phase 2: Onboarding Flow

## Goal

Collect user information so the platform can recommend the right project direction.

## Pages

4. Build Profile Page  
5. Tell Us About Goals Page  
6. Suggested Directions Page  

## Recommended Build Order

4. Build Profile Page  
5. Tell Us About Goals Page  
6. Suggested Directions Page  

## Reason

These pages help the user define who they are, what role they are interested in, and what kind of project direction fits them.

## Data to Track

- Name
- School
- Major
- Role interest
- Skill level
- Career goal
- Project interest
- Weekly availability
- Suggested direction

## Notes

For MVP, this data can be stored temporarily in frontend state or localStorage.  
A backend connection is not required at the beginning.

---

# Phase 3: Project Discovery Flow

## Goal

Let users explore recommended projects and choose one they want to work on.

## Pages

7. Explore Recommended Projects Page  
8. Project Detail Page  
9. Join or Start Project Page  

## Recommended Build Order

7. Explore Recommended Projects Page  
8. Project Detail Page  
9. Join or Start Project Page  

## Reason

After onboarding, the user needs to see project options, understand one project in detail, and decide whether they want to join a team or start their own.

## Data to Track

- Project title
- Project category
- Difficulty
- Role fit
- Skills needed
- Time commitment
- Project description
- Milestones
- Available teams

## Notes

Use fake project data first.  
The goal is to make the project discovery experience clickable and understandable before building a full backend.

---

# Phase 4: Team Formation Flow

## Goal

Allow users to create or join a team around a selected project.

## Pages

10. Create Team Page  
11. Team Detail Page  
12. Find Teammates Page  

## Recommended Build Order

10. Create Team Page  
11. Team Detail Page  
12. Find Teammates Page  

## Reason

The user needs to either create a team or evaluate an existing team before working on a project.  
Create Team should come before Find Teammates because the user needs a team context before inviting people.

## Data to Track

- Team name
- Project ID
- Team description
- Visibility
- Roles needed
- Members
- Invite status
- Team progress

## Notes

For MVP, the invite button can simply change state.

Example:

- Invite → Invited
- Request to Join → Request Sent

Real notifications or email invites can come later.

---

# Phase 5: Workspace Flow

## Goal

Give users a place to manage their project after they join or create a team.

## Pages

13. Main Dashboard Page  
14. Project Workflow Page  
15. Task Modal  

## Recommended Build Order

13. Main Dashboard Page  
14. Project Workflow Page  
15. Task Modal  

## Reason

The dashboard and workflow pages depend on user, project, team, and task data.  
That is why they should be built after the project and team flows are ready.

## Data to Track

- Current project
- Current team
- Weekly milestones
- Tasks
- Task status
- Assignee
- Due date
- Progress
- Recent activity

## Notes

For MVP, task creation can be local only.  
The first goal is to show that users can organize and track their project progress.

---

# Full Build Order

1. Landing Page  
2. Create Account Page  
3. Login Page  
4. Build Profile Page  
5. Tell Us About Goals Page  
6. Suggested Directions Page  
7. Explore Recommended Projects Page  
8. Project Detail Page  
9. Join or Start Project Page  
10. Create Team Page  
11. Team Detail Page  
12. Find Teammates Page  
13. Main Dashboard Page  
14. Project Workflow Page  
15. Task Modal  

