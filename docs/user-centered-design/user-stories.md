# The First Step User Stories
## Agile Format User Stories: As a <Role>, I want to <Action>, So that <Value>

### Persona A: Sophie Kim

**[Epic/Feature 1: How to find projects I want/need.]**

* **User Story 1:**

  **As a** sophomore computer science student that is looking to build a portfolio for specific target tech internships, 

  **I want to** be able to easily filter for industry/recruiting project domains based on what my target internship companies looks for, 

  **so that** I can easily discover a structured pathway that matches my career goals in order to build an exact portfolio that recruiters at my target companies look for.

  * *Acceptance Criteria:*
    * Based on the initial survey at the start on target roles, it should recommend specific project domain types based on the target role/internship chosen.
    * The platform should have a sidebar or a drop-down menu in the project discovery page for a list of project domains or specialization for the kind of project that you can filter for.
    * Each project track card should have a specific badge targeted to map a specific internship, like a google badge. This means that the entire project track contains concepts or skills that you would need to learn to fulfill a specific role. Quick glance project mapping to roles. It is specifically a company-aligned-track badge.

* **User Story 2:**

  **As a** beginner developer experiencing blank-page anxiety,

  **I want to** inspect a project track's complete milestone blueprint, required baseline skills, and the target skills I am going to learn,

  **so that** I can confidently verify that the technical scope is beginner-friendly and bounded without feeling intimidated or underqualified to join the team.

  * *Acceptance Criteria:*
    * Clicking "View Project" on a track card must open a detailed overview showing an interactive 4-to-5-week timeline defining exactly what is expected step-by-step.
    * The track overview page must display a concrete inventory of locked, predefined final outcomes (e.g., Deployed Web App, README portfolio bullet package) required for project completion.
    * The overview must present a highly scannable, side-by-side **"Skills Balance Dashboard"** consisting of two distinct lists:
      1. *What You Need Beforehand:* Basic baseline concepts (e.g., Familiarity with Git syntax, basic Python).
      2. *What You Will Learn/Build:* The project's practical industry skills (e.g., Setting up a CI pipeline, managing API data parsing).
    * The page must feature an explicit breakdown of technical roles (e.g., Designer, Developer) detailing the core feature scope and supportive step-by-step templates assigned to each seat to reduce entry friction.

**[Epic/Feature 2: How to find the teams]**

* **User Story 3:**

  **As a** student developer who doesn't have much project experience and fears of being a burden to a more advanced team member, 

  **I want to** be able to match with team members who are at the same skill level as me through everyone selection of the same structured project track, 

  **so that** I can collaborate without feeling a sense of imposter syndrome and the worry of a more advanced team member to do all the work for me.

  * *Acceptance Criteria:*
    * A way to show a whole team experience baseline of each project. Maybe a bar that shows the average of the experience? Or show the individual level of each member in the project.
    * Ensure that before joining a team then you can see as much information as possible of the team members such as the time of commitment they can give to the project weekly as well as ensuring the application process should be as minimal as possible to ensure low friction. No need for a resume to upload just a request to join and maybe if the owner of the project allows it a quick call for interview.

---

### Persona B: Daniel Brooks

**[Epic/Feature 1: How can i find the project i want]**

* **User Story 1:**

  **As a** BUSECON and Information Systems student that is going for consulting or product-adjacent roles,

  **I want to** the ability to filter through the discovery page for a specific project scope **Launch Sprints** rather then technical language domains,

  **so that** I can easily find a team that has the goal of building a structured, fast-paced product allowing me to gain the skills of a freelancer.

  * *Acceptance Criteria:*
    * As I browse through with the roles of a Business or Product Lead, the platform should automatically filter through with the correct project scope. Launch sprints meant for deploying a whole product to the market.
    * Should show tracks that have no current Business Analyst or Product Manager roles.

* **User Story 2:**

  **As a** business student that is looking to manage an agile workflow for the first time,

  **I want to** to have access to resources such as pre-formatted templates and tooltips used for business deliverables directly inside the project workspace,

  **so that** I can confidently guide my teammates and learn these concepts without having to figure it out on my own from scratch.

  * *Acceptance Criteria:*
    * By choosing the business or marketer role at the start, the UI for clicking project tracks should include resources like an example of a markdown document skeletons.
    * There should be built-in tooltips in order to help work on user centered design as well as calculate the basic product metrics.

**[Epic/Feature 2: How to find the teams & manage team health]**

* **User Story 3:** 

  **As a** product lead that's trying to ensure the team is on schedule on the specific project timeline,

  **I want a** clean dashboard for reviewing incoming applicants that shows all the essential information like their availability and skill match,

  **so that** I can easily assemble a reliable team without much recruitment process overhead.

  * *Acceptance Criteria:*
    * The project track manager dashboard provides a view of incoming applicants that shows a clear description of each information of the applicant such as their availability and skill level.
    * Simple interface of accepting or declining applicants to update the teams set.

* **User Story 4:**

  **As a** non-coding team lead whose contributions are strategic and document-based,
  
  **I want to** log my business milestones directly into our interactive pipeline as equal platform deliverables,
  
  **so that** my work is verified and legible to consulting or product recruiters without relying on GitHub code commits.

  * *Acceptance Criteria:*
    * The project milestone tracker includes explicit, non-code artifact uploads (e.g., "Embed PRD link," "Link Strategy/Pitch Deck").
    * The final public-facing project landing page treats Daniel’s strategic outputs as primary core deliverables, displaying his role profile prominently alongside the repository analytics.

---

### Persona C: Maya Hernandez

**[Epic/Feature 1: How to find projects I want/need]**

* **User Story 1:**

  **As a** design and HCI student looking to build a portfolio-grade case study,  
  
  **I want to** instantly view active development teams with an empty "UX/UI Designer" seat, regardless of their technical backend stack,  
  
  **so that** I can find a highly committed team ready to transform my visual wireframes and user research into an active, functioning application.

  * *Acceptance Criteria:*
    * The platform discovery page includes an active toggle: "Show Teams Needing a Designer".
    * When selected, the feed surfaces project teams that have already met their developer/engineer minimums but lack user interface support.
    * The card highlights whether the project track is a web application, mobile app, or data dashboard so Maya can select her preferred platform medium.

* **User Story 2:**

  **As a** student designer who wants to experience realistic cross-functional product loops,  
  
  **I want to** an integrated workspace module where I can embed my live Figma design files directly adjacent to the developer’s coding milestones,  
  
  **so that** I can execute a professional engineering handoff and ensure the team codes from the correct asset dimensions.

  * *Acceptance Criteria:*
    * The project workspace includes a dedicated "Design Hub" page that authenticates with Figma to embed live, interactive design prototypes.
    * The task list features an explicit "Ready for Handoff" status trigger that sends a notification to the Software Engineers (Sophie) indicating that UI layouts are locked and ready for code implementation.

**[Epic/Feature 2: Documenting outcomes & team accountability]**

* **User Story 3:**

  **As a** UX designer whose primary hiring signal is a robust, end-to-end case study,  
  
  **I want to** the platform to compile our weekly research logs, wireframe iterations, and usability test results into a chronological markdown framework upon completion,  
  
  **so that** I can easily format and export my product story onto my portfolio website (e.g., Squarespace, Webflow).

  * *Acceptance Criteria:*
    * Upon reaching the final project milestone, a "Generate Portfolio Shell" button becomes active for the Designer role.
    * The platform outputs a well-structured markdown outline that automatically structures: the user problem statement, research methodology summary, wireframe progression assets, user feedback adjustments, and a link to the final shipped build.