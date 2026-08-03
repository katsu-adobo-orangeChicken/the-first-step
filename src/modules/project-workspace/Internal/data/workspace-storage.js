import {
  addProjectJoinRequest,
  addProjectMember,
  CURRENT_USER_ID,
  getProjectById,
  isProjectMember,
} from "../../../career-catalog/Internal/data/project-storage.js";

const WORKSPACES_KEY = "the-first-step:project-workspaces";
const JOIN_REQUESTS_KEY = "the-first-step:project-join-requests";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function createDefaultMilestones(project) {
  return [
    {
      id: "week-1",
      title: "Define the project goal",
      description: "Clarify the problem, audience, roles, and final output.",
      status: "In progress",
    },
    {
      id: "week-2",
      title: "Research and plan",
      description: "Collect examples, sketch the approach, and agree on scope.",
      status: "Up next",
    },
    {
      id: "week-3",
      title: "Build the first version",
      description: `Create the first draft of ${project.finalOutcome.toLowerCase()}.`,
      status: "Upcoming",
    },
  ];
}

function createDefaultTasks(project) {
  return [
    {
      id: "task-1",
      title: "Write the project problem statement",
      status: "To do",
      priority: "High",
    },
    {
      id: "task-2",
      title: "Assign team roles",
      status: "To do",
      priority: "High",
    },
    {
      id: "task-3",
      title: `Outline the ${project.finalOutcome.toLowerCase()}`,
      status: "To do",
      priority: "Medium",
    },
  ];
}

function createDefaultDeliverables(project) {
  return [
    "Project summary for portfolio",
    project.finalOutcome,
    "Resume bullet draft",
    "Demo or reflection notes",
  ];
}

function formatMemberName(memberId) {
  if (memberId === CURRENT_USER_ID) {
    return "You";
  }

  if (String(memberId).startsWith("seed-member-")) {
    const memberNumber = String(memberId).replace("seed-member-", "");
    return `Starter member ${memberNumber}`;
  }

  return memberId;
}

function createTeamMembersForProject(project, workspaceType) {
  if (Array.isArray(project.memberIds) && project.memberIds.length > 0) {
    return project.memberIds.map(formatMemberName);
  }

  return workspaceType === "created" ? ["You"] : ["You"];
}

export function loadWorkspaces() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const storedWorkspaces = window.localStorage.getItem(WORKSPACES_KEY);
    return storedWorkspaces ? JSON.parse(storedWorkspaces) : [];
  } catch (error) {
    console.warn("Unable to load project workspaces", error);
    return [];
  }
}

function saveWorkspaces(workspaces) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
  } catch (error) {
    console.warn("Unable to save project workspaces", error);
  }
}

export function loadJoinRequests() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const storedRequests = window.localStorage.getItem(JOIN_REQUESTS_KEY);
    return storedRequests ? JSON.parse(storedRequests) : [];
  } catch (error) {
    console.warn("Unable to load project join requests", error);
    return [];
  }
}

function normalizeJoinRequest(joinRequest) {
  const projectId = joinRequest.projectId || joinRequest.project?.id;
  const requesterId = joinRequest.requesterId || CURRENT_USER_ID;

  return {
    ...joinRequest,
    id: joinRequest.id || `join-request-${projectId}-${requesterId}`,
    projectId,
    requesterId,
    status: joinRequest.status || "pending",
  };
}

function saveJoinRequests(joinRequests) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(JOIN_REQUESTS_KEY, JSON.stringify(joinRequests));
  } catch (error) {
    console.warn("Unable to save project join requests", error);
  }
}

export function getWorkspaceByProjectId(projectId) {
  return loadWorkspaces().find(
    (workspace) => String(workspace.project.id) === String(projectId)
  );
}

export function getJoinRequestByProjectId(projectId) {
  return loadJoinRequests().map(normalizeJoinRequest).find(
    (joinRequest) =>
      String(joinRequest.projectId) === String(projectId) &&
      joinRequest.requesterId === CURRENT_USER_ID &&
      joinRequest.status === "pending"
  );
}

export function createWorkspaceForProject(project, workspaceType = "joined") {
  const workspaces = loadWorkspaces();
  const existingWorkspace = workspaces.find(
    (workspace) => String(workspace.project.id) === String(project.id)
  );

  if (existingWorkspace) {
    return existingWorkspace;
  }

  const nextWorkspace = {
    id: `workspace-${project.id}`,
    type: workspaceType,
    project,
    userRole: workspaceType === "created" ? "Project owner" : "Contributor",
    teamMembers: createTeamMembersForProject(project, workspaceType),
    milestones: createDefaultMilestones(project),
    tasks: createDefaultTasks(project),
    deliverables: createDefaultDeliverables(project),
    createdAt: new Date().toISOString(),
  };

  saveWorkspaces([nextWorkspace, ...workspaces]);
  return nextWorkspace;
}

export function requestToJoinProject(project, requesterId = CURRENT_USER_ID) {
  const currentProject = getProjectById(project.id) || project;
  const joinRequests = loadJoinRequests().map(normalizeJoinRequest);
  const existingRequest = joinRequests.find(
    (joinRequest) =>
      String(joinRequest.projectId) === String(currentProject.id) &&
      joinRequest.requesterId === requesterId &&
      joinRequest.status === "pending"
  );

  if (existingRequest) {
    return existingRequest;
  }

  const nextRequest = {
    id: `join-request-${currentProject.id}-${requesterId}`,
    projectId: currentProject.id,
    requesterId,
    project: currentProject,
    status: "pending",
    requestedAt: new Date().toISOString(),
  };

  addProjectJoinRequest(currentProject.id, nextRequest.id);
  saveJoinRequests([nextRequest, ...joinRequests]);
  return nextRequest;
}

export function joinProject(project, memberId = CURRENT_USER_ID) {
  const currentProject = getProjectById(project.id) || project;
  const currentMembersCount = Array.isArray(currentProject.memberIds)
    ? currentProject.memberIds.length
    : 0;
  const maxTeamSize = Number(currentProject.maxTeamSize || 1);

  if (currentMembersCount >= maxTeamSize) {
    return {
      status: "full",
    };
  }

  if (isProjectMember(currentProject, memberId)) {
    return {
      status: "already-member",
      workspace: createWorkspaceForProject(currentProject, "joined"),
    };
  }

  if (currentProject.permission === "private") {
    return {
      status: "pending",
      request: requestToJoinProject(currentProject, memberId),
    };
  }

  const addMemberResult = addProjectMember(currentProject.id, memberId);

  if (addMemberResult.status === "full") {
    return {
      status: "full",
    };
  }

  const joinedProject = addMemberResult.project || currentProject;

  return {
    status: "joined",
    workspace: createWorkspaceForProject(joinedProject, "joined"),
  };
}
