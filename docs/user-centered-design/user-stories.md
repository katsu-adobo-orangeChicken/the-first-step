# The First Step | User Stories
## As a <Role>, I want to <Action>, So that <Value>

---

## Persona A: Sophie Kim (The Engineering Track)

### [Epic 1: Structured Scope Discovery & Domain Specificity]

*   #### User Story 1: Target-Company Aligned Tracking
    *   **As a** sophomore computer science student looking to escape tutorial hell and build a targeted portfolio,

    *   **I want to** filter the project discovery feed by specialized domain types and company-aligned track badges,

    *   **So that** I can complete a structured technical pathway that matches the exact engineering competencies recruiters look for at my target companies.

    *   *Acceptance Criteria:*
        *   The onboarding preference survey maps target internship job families (e.g., Software Engineering Intern, Engineering Practicum, Data/ML-adjacent role) to dynamically recommend project tracks.
        *   The project discovery screen features a drop-down menu and sidebar to filter by specialization categories (e.g., Full-Stack Campus Tool, Data Dashboard, API/Backend Reliability, AI Feature Prototype).
        *   Each project card renders a company-aligned track badge (e.g., "Practicum-Aligned Track") indicating at a glance that the repo involves industry-standard constraints like testing suites or cloud infrastructure logs.

*   #### User Story 2: Scope Blueprinting vs. Blank-Page Anxiety
    *   **As a** beginner developer who experiences freezing and anxiety when facing an ambiguous, blank code editor without a video guide,

    *   **I want to** inspect an explicit project track roadmap alongside a side-by-side Skills Balance Dashboard before joining,

    *   **So that** I can confidently verify that the technical feature scope is tightly bounded, beginner-friendly, and manageable.

    *   *Acceptance Criteria:*
        *   Clicking "View Project" opens an interactive 5-week tracking timeline detailing exact, chronological milestone requirements.
        *   The track preview explicitly inventory-locks the final non-negotiable team outputs (e.g., Deployed App Link, active Git contribution stream, documented README) needed for project completion.
        *   Renders a highly scannable **Skills Balance Dashboard** grouping requirements into: (1) *Baseline Concepts Needed* (e.g., Git syntax, basic script logic) and (2) *Industry Competencies to Learn* (e.g., REST API handling, CI/CD parsing).
        *   Displays detailed cross-functional role boundaries showing exact engineering features separated cleanly from design and strategy scopes to eliminate implementation overlap.

### [Epic 2: Imposter-Free Team Matching]

*   #### User Story 3: Skill-Balanced Teaming
    *   **As a** student programmer with minimal real-world deployment experience who fears being an anchor to advanced peers,

    *   **I want to** match onto structured tracks exclusively with students logging a similar baseline experience layer,

    *   **So that** I can collaborate in an error-safe workspace without feeling intense imposter syndrome or letting a power user write all my code for me.

    *   *Acceptance Criteria:*
        *   The team composition dashboard calculates and surfaces an aggregated project experience baseline bar or individual student track level flags.
        *   Before requesting entry, users can cleanly inspect an open team’s profile data, including major, school email verification, and weekly hourly availability.
        *   The interface establishes an ultra-low-friction queue entry loop—requesting entry takes one click, bypassing corporate-style resume uploads while supporting a quick call interface if requested by the track owner.

---

## Persona B: Daniel Brooks (The Business & Strategy Track)

### [Epic 1: Strategic Launch Sprints & Framework Delivery]

*   #### User Story 1: Cross-Functional "Launch Sprint" Filtering
    *   **As a** Business Economics and Information Systems student targeting consulting, business analyst, or strategy pathways,

    *   **I want to** filter the discovery engine for cross-functional "Launch Sprints" seeking a Business or Strategy Lead rather than scrolling past technical code languages,

    *   **So that** I can quickly locate high-agency teams focused on launching market-viable product concepts where I can execute business analyst deliverables.
    *   *Acceptance Criteria:*
        *   The discovery hub features an active toggle for "Launch Sprints" that filters out code-exclusive refactoring projects.
        *   The feed actively highlights tracks with empty *Business Analyst / Strategy Lead* or *Growth / Marketing Lead* seats, filtering out pure, generic "Product Manager" roles to ensure all business seats have distinct, non-overlapping execution assignments.

*   #### User Story 2: Embedded Deliverable Scaffolding
    *   **As a** business student managing cross-functional milestones and agile team loops for the first time,

    *   **I want to** leverage pre-formatted deliverable markdown templates and user-centered design tooltips directly inside our workspace,

    *   **So that** I can structure our product requirements and guide my technical peers without having to invent business documentation from scratch.

    *   *Acceptance Criteria:*
        *   Claiming a Business or Strategy seat automatically populates the team’s document hub with pre-formatted markdown frameworks (e.g., Product Requirements Document (PRD) skeletons, consulting issue-trees, go-to-market briefs).
        *   The document editor features interactive User-Centered Design tooltips and calculator widgets to guide students smoothly through competitor indexing and baseline product metric calculations.

### [Epic 2: Strategic Accountability & Non-Code Proof]

*   #### User Story 3: Overhead-Free Team Assembly
    *   **As a** Strategy Lead trying to coordinate a reliable team under compressed launch deadlines,

    *   **I want a** central applicant manager dashboard that aggregates applicant availability and skill goals,

    *   **So that** I can quickly review, approve, and lock down a highly committed team without tedious recruiting process overhead.

    *   *Acceptance Criteria:*
        *   The track owner's dashboard renders a single view of incoming applicant profiles showing verified institutional status (.edu), major, weekly hour commitments, and stated project goals.
        *   Establishes a dual-action interface (Accept/Decline buttons) that instantly updates the team roster and locks down tracking board assignments.

*   #### User Story 4: Verified Legible Business Artifacts
    *   **As a** non-coding team member whose primary contributions are analytical, document-based, and strategic,

    *   **I want to** upload my business deliverables directly into the project milestone tracking board as core platform requirements,

    *   **So that** my strategic assets are verified and clearly visible to corporate or consulting recruiters without requiring Git commits.
    *   *Acceptance Criteria:*
        *   The 5-week tracking pipeline integrates hard, document-based deliverable checks (e.g., "Link Active PRD", "Upload Consulting Case Deck Link") as non-negotiable gateway requirements.
        *   The public-facing, shareable project portfolio landing page embeds the Strategy Lead's documents prominently, positioning his profile and execution summary as an equal primary deliverable alongside the code repository analytics.

---

## Persona C: Maya Hernandez (The UX/UI Design Track)

### [Epic 1: Design-Driven Team Sourcing & Engineering Handoff]

*   #### User Story 1: Interface Deficit Sourcing
    *   **As a** design and human-computer interaction (HCI) student building a high-fidelity case study,

    *   **I want to** toggle the project feed to instantly see active, developer-heavy teams missing a UX/UI Designer,

    *   **So that** I can embed with technically ready engineers capable of transforming my Figma user research into an active, deployed application.

    *   *Acceptance Criteria:*
        *   The platform discovery page provides a one-click toggle labeled: "Show Teams Needing a Designer".
        *   Surfaces only teams that have already fulfilled their baseline developer minimums but lack user experience support.
        *   Each matching card prominently specifies the platform medium (e.g., Mobile App Redesign, Campus Web App, Startup Validation Prototype) so Maya can choose her target layout environment.

*   #### User Story 2: Cross-Functional Engineering Handoff
    *   **As a** student designer trying to practice realistic product handoff loops,

    *   **I want an** integrated workspace module where I can embed interactive Figma files right next to development tasks,

    *   **So that** I can execute clean design handoffs and ensure developers code directly from accurate asset layout parameters.

    *   *Acceptance Criteria:*
        *   The project dashboard contains a dedicated "Design Hub" page that seamlessly authenticates and displays live, interactive Figma canvas embeds.
        *   The agile task board includes a dedicated status trigger labeled "UI Assets Locked / Ready for Handoff" that pushes an automated system alert to the developers (Sophie) to freeze changes and begin asset-dimension implementation.

### [Epic 2: Case Study Packaging & Storytelling Automation]

*   #### User Story 3: Chronological Case Study Compilation
    *   **As a** UX designer whose primary evaluation signal for internships is an end-to-end process case study,

    *   **I want the system to** automatically compile my research assets, wireframe histories, and user testing reviews into a clean markdown framework,

    *   **So that** I can instantly export a perfectly structured product story onto external portfolio builders like Webflow, Squarespace, or Notion.
    
    *   *Acceptance Criteria:*
        *   Reaching Week 5 activates an automated "Generate Portfolio Shell" utility for the Designer profile slot.
        *   The utility exports clean, chronological markdown code explicitly structuring: (1) The Core User Problem, (2) Competitor Research Logs, (3) Wireframe Evolution Trees, (4) Usability Feedback Adjustments, and (5) A permanent, shareable hyperlink to the final team-deployed web or mobile build.