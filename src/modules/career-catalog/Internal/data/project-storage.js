import { getBaseProjectById, projects } from "./projects.js";

const CREATED_PROJECTS_KEY = "the-first-step:created-projects";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function normalizeProject(project) {
  const category = Array.isArray(project.category)
    ? project.category
    : [project.category || "Community"];

  return {
    ...project,
    category,
    permission:
      project.permission || (project.joinPolicy === "open" ? "public" : "private"),
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

export function getAllProjects() {
  return [...projects.map(normalizeProject), ...loadCreatedProjects()];
}

export function getProjectById(projectId) {
  const project = getBaseProjectById(projectId) ?? loadCreatedProjects().find(
    (project) => String(project.id) === String(projectId)
  );

  return project ? normalizeProject(project) : undefined;
}

export function createProject(projectDetails) {
  const createdProjects = loadCreatedProjects();
  const nextProject = {
    id: `created-${Date.now()}`,
    imageURL: "/images/placeholder-project.svg",
    teamSize: projectDetails.teamSize || "1/5",
    difficulty: projectDetails.difficulty || "Beginner",
    permission: projectDetails.permission || "private",
    finalOutcome: projectDetails.finalOutcome || "Project portfolio artifact",
    ...projectDetails,
    category: Array.isArray(projectDetails.category)
      ? projectDetails.category
      : [projectDetails.category || "Community"],
  };

  saveCreatedProjects([nextProject, ...createdProjects]);
  return nextProject;
}
