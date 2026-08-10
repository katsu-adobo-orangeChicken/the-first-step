import { getBaseProjectById, projects } from "./projects.js";

export const CURRENT_USER_ID = "current-user";

const CREATED_PROJECTS_KEY = "the-first-step:created-projects";
const PROJECT_OVERRIDES_KEY = "the-first-step:project-overrides";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function parseTeamSize(teamSize) {
  if (typeof teamSize !== "string") {
    return null;
  }

  const [rawCurrentMembers, rawMaxTeamSize] = teamSize.split("/").map(Number);

  const currentMembers = Number.isNaN(rawCurrentMembers) ? 0 : rawCurrentMembers;
  const maxTeamSize = Number.isNaN(rawMaxTeamSize) ? 1 : rawMaxTeamSize;

  const memberIds = Array.from(
    { length: currentMembers },
    (_, index) => `seed-member-${index + 1}`
  );

  return {
    memberIds,
    maxTeamSize,
  };
}

export function getProjectTeamStatus(project) {
  const normalized = normalizeProject(project);

  const memberIds = normalized.memberIds || [];
  const maxTeamSize = Number(normalized.maxTeamSize || 1);
  const currentMembersCount = memberIds.length;

  return {
    currentMembersCount,
    maxTeamSize,
    teamSizeLabel: `${currentMembersCount}/${maxTeamSize}`,
    isFull: currentMembersCount >= maxTeamSize,
  };
}

function normalizeProject(project) {
  if (!project) {
    return project;
  }

  const permission =
    project.permission || (project.joinPolicy === "open" ? "public" : "private");
  let memberIds = project.memberIds;
  let maxTeamSize = project.maxTeamSize;

  if (!memberIds && project.teamSize) {
    const parsed = parseTeamSize(project.teamSize);

    if (parsed) {
      memberIds = parsed.memberIds;
      maxTeamSize = parsed.maxTeamSize;
    }
  }

  const category = Array.isArray(project.category)
    ? project.category
    : [project.category || "Community"];

  return {
    ...project,
    category,
    permission,
    memberIds: Array.isArray(memberIds) ? memberIds : [],
    maxTeamSize: Number(maxTeamSize || 1),
    joinRequestIds: Array.isArray(project.joinRequestIds) ? project.joinRequestIds : [],
  };
}

function loadCreatedProjects() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const storedProjects = window.localStorage.getItem(CREATED_PROJECTS_KEY);
    return storedProjects ? JSON.parse(storedProjects).map(normalizeProject) : [];
  } catch (error) {
    console.warn("Unable to load created projects", error);
    return [];
  }
}

function saveCreatedProjects(projectList) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(CREATED_PROJECTS_KEY, JSON.stringify(projectList));
  } catch (error) {
    console.warn("Unable to save created projects", error);
  }
}

function loadProjectOverrides() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const storedOverrides = window.localStorage.getItem(PROJECT_OVERRIDES_KEY);
    return storedOverrides ? JSON.parse(storedOverrides).map(normalizeProject) : [];
  } catch (error) {
    console.warn("Unable to load project overrides", error);
    return [];
  }
}

function saveProjectOverrides(projectList) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(PROJECT_OVERRIDES_KEY, JSON.stringify(projectList));
  } catch (error) {
    console.warn("Unable to save project overrides", error);
  }
}

function saveProject(project) {
  const normalizedProject = normalizeProject(project);

  if (String(normalizedProject.id).startsWith("created-")) {
    const createdProjects = loadCreatedProjects();
    const updatedProjects = createdProjects.some(
      (createdProject) => String(createdProject.id) === String(normalizedProject.id)
    )
      ? createdProjects.map((createdProject) =>
          String(createdProject.id) === String(normalizedProject.id)
            ? normalizedProject
            : createdProject
        )
      : [normalizedProject, ...createdProjects];

    saveCreatedProjects(updatedProjects);
    return normalizedProject;
  }

  const projectOverrides = loadProjectOverrides();
  const updatedOverrides = projectOverrides.some(
    (projectOverride) => String(projectOverride.id) === String(normalizedProject.id)
  )
    ? projectOverrides.map((projectOverride) =>
        String(projectOverride.id) === String(normalizedProject.id)
          ? normalizedProject
          : projectOverride
      )
    : [normalizedProject, ...projectOverrides];

  saveProjectOverrides(updatedOverrides);
  return normalizedProject;
}

export function getAllProjects() {
  const projectOverrides = loadProjectOverrides();
  const baseProjects = projects.map((project) => {
    const projectOverride = projectOverrides.find(
      (override) => String(override.id) === String(project.id)
    );

    return projectOverride || normalizeProject(project);
  });

  return [...baseProjects, ...loadCreatedProjects()];
}

export function getProjectById(projectId) {
  const projectOverride = loadProjectOverrides().find(
    (project) => String(project.id) === String(projectId)
  );
  const createdProject = loadCreatedProjects().find(
    (project) => String(project.id) === String(projectId)
  );
  const project = projectOverride ?? getBaseProjectById(projectId) ?? createdProject;

  return project ? normalizeProject(project) : undefined;
}

export function isProjectMember(project, memberId = CURRENT_USER_ID) {
  const normalizedProject = normalizeProject(project);
  return normalizedProject.memberIds.includes(memberId);
}

export function hasProjectJoinRequest(project, joinRequestId) {
  const normalizedProject = normalizeProject(project);
  return normalizedProject.joinRequestIds.includes(joinRequestId);
}

export function addProjectJoinRequest(projectId, joinRequestId) {
  const project = getProjectById(projectId);

  if (!project || hasProjectJoinRequest(project, joinRequestId)) {
    return project;
  }

  return saveProject({
    ...project,
    joinRequestIds: [...project.joinRequestIds, joinRequestId],
  });
}

export function updateProject(projectId, projectDetails) {
  const project = getProjectById(projectId);

  if (!project) {
    return null;
  }

  return saveProject({
    ...project,
    ...projectDetails,
  });
}

export function addProjectMember(projectId, memberId = CURRENT_USER_ID) {
  const project = getProjectById(projectId);

  if (!project) {
    return {
      status: "not-found",
      project: null,
    };
  }

  if (isProjectMember(project, memberId)) {
    return {
      status: "already-member",
      project,
    };
  }

  const { isFull } = getProjectTeamStatus(project);

  if (isFull) {
    return {
      status: "full",
      project,
    };
  }

  const updatedProject = saveProject({
    ...project,
    memberIds: [...project.memberIds, memberId],
  });

  return {
    status: "added",
    project: updatedProject,
  };
}

export function createProject(projectDetails) {
  const createdProjects = loadCreatedProjects();
  const nextProject = normalizeProject({
    id: `created-${Date.now()}`,
    imageURL: "/images/placeholder-project.svg",
    difficulty: projectDetails.difficulty || "Beginner",
    permission: projectDetails.isPrivate ? "private" : "public",
    finalOutcome: projectDetails.finalOutcome || "Project portfolio artifact",
    ...projectDetails,
    maxTeamSize: Number(projectDetails.maxTeamSize || 1),
    memberIds: [CURRENT_USER_ID],
    joinRequestIds: [],
    category: Array.isArray(projectDetails.category)
      ? projectDetails.category
      : [projectDetails.category || "Community"],
  });

  saveCreatedProjects([nextProject, ...createdProjects]);
  return nextProject;
}
