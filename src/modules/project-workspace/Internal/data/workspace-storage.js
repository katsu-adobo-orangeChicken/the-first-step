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
  return loadJoinRequests().find(
    (joinRequest) => String(joinRequest.project.id) === String(projectId)
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
    teamMembers:
      workspaceType === "created"
        ? ["You"]
        : ["You", "Maya Chen", "Jordan Lee", "Sam Rivera"],
    milestones: createDefaultMilestones(project),
    tasks: createDefaultTasks(project),
    deliverables: createDefaultDeliverables(project),
    createdAt: new Date().toISOString(),
  };

  saveWorkspaces([nextWorkspace, ...workspaces]);
  return nextWorkspace;
}

export function requestToJoinProject(project) {
  const joinRequests = loadJoinRequests();
  const existingRequest = joinRequests.find(
    (joinRequest) => String(joinRequest.project.id) === String(project.id)
  );

  if (existingRequest) {
    return existingRequest;
  }

  const nextRequest = {
    id: `join-request-${project.id}`,
    project,
    status: "pending",
    requestedAt: new Date().toISOString(),
  };

  saveJoinRequests([nextRequest, ...joinRequests]);
  return nextRequest;
}

export function joinProject(project) {
  if (project.permission === "private") {
    return {
      status: "pending",
      request: requestToJoinProject(project),
    };
  }

  return {
    status: "joined",
    workspace: createWorkspaceForProject(project, "joined"),
  };
}
