import { isSupabaseConfigured } from "../../../../shared/supabase/client.js";
import {
  CURRENT_USER_ID,
  addProjectJoinRequest,
  addProjectMember,
  createProject,
  getAllProjects,
  getProjectById,
  hasProjectJoinRequest,
  isProjectMember,
  updateProject,
} from "./project-storage.js";
import {
  createProjectRecordInBackend,
  getProjectRecordById,
  listProjectRecords,
  updateProjectRecordInBackend,
} from "./project-repository.js";

function parseTeamSize(teamSize) {
  if (typeof teamSize !== "string") {
    return null;
  }

  const [rawCurrentMembers, rawMaxTeamSize] = teamSize.split("/").map(Number);
  const currentMembers = Number.isNaN(rawCurrentMembers) ? 0 : rawCurrentMembers;
  const maxTeamSize = Number.isNaN(rawMaxTeamSize) ? 1 : rawMaxTeamSize;

  return {
    memberIds: Array.from({ length: currentMembers }, (_, index) => `seed-member-${index + 1}`),
    maxTeamSize,
  };
}

export function normalizeProjectRecord(project) {
  if (!project) {
    return project;
  }

  const rawMemberIds = project.memberIds || project.member_ids;
  const rawJoinRequestIds = project.joinRequestIds || project.join_request_ids;
  const currentMemberCount = Number(
    project.currentMemberCount ?? project.current_member_count ?? 0
  );
  const rawMaxTeamSize = project.maxTeamSize ?? project.max_team_size;
  const parsedTeamSize = parseTeamSize(project.teamSize || project.team_size);
  const maxTeamSize = Number(rawMaxTeamSize || parsedTeamSize?.maxTeamSize || 1);
  const memberIds = Array.isArray(rawMemberIds) && rawMemberIds.length > 0
    ? rawMemberIds
    : Array.from(
        { length: currentMemberCount || parsedTeamSize?.memberIds.length || 0 },
        (_, index) => `seed-member-${index + 1}`
      );
  const teamSize =
    project.teamSize ||
    project.team_size ||
    `${memberIds.length}/${maxTeamSize}`;
  const finalOutcome =
    project.finalOutcome || project.final_outcome || "Project portfolio artifact";
  const longDescription =
    project.longDescription || project.long_description || project.description;
  const imageURL =
    project.imageURL || project.image_url || "/images/placeholder-project.svg";
  const permission =
    project.permission || (project.joinPolicy === "private" ? "private" : "public");

  const category = Array.isArray(project.category)
    ? project.category
    : [project.category || "Community"];

  return {
    ...project,
    category,
    finalOutcome,
    imageURL,
    longDescription,
    createdAt: project.createdAt || project.created_at,
    updatedAt: project.updatedAt || project.updated_at,
    createdBy: project.createdBy || project.created_by,
    currentMemberCount: memberIds.length,
    permission,
    teamSize,
    memberIds,
    maxTeamSize,
    joinRequestIds: Array.isArray(rawJoinRequestIds) ? rawJoinRequestIds : [],
  };
}

function normalizeProjectCategory(category) {
  if (Array.isArray(category)) {
    return category.filter(Boolean);
  }

  return [category || "Community"];
}

function getProjectPermission(projectDetails) {
  if (projectDetails.permission) {
    return projectDetails.permission;
  }

  return projectDetails.isPrivate ? "private" : "public";
}

export function createProjectInsertPayload(projectDetails) {
  const maxTeamSize = Number(projectDetails.maxTeamSize || 1);
  const memberIds = Array.isArray(projectDetails.memberIds)
    ? projectDetails.memberIds
    : [projectDetails.createdBy || CURRENT_USER_ID];
  const currentMemberCount = Number(projectDetails.currentMemberCount || memberIds.length || 1);

  return {
    title: projectDetails.title,
    description: projectDetails.description,
    category: normalizeProjectCategory(projectDetails.category),
    difficulty: projectDetails.difficulty || "Beginner",
    permission: getProjectPermission(projectDetails),
    final_outcome: projectDetails.finalOutcome || "Project portfolio artifact",
    team_size: `${currentMemberCount}/${maxTeamSize}`,
    member_ids: memberIds,
    join_request_ids: Array.isArray(projectDetails.joinRequestIds)
      ? projectDetails.joinRequestIds
      : [],
    current_member_count: currentMemberCount,
    max_team_size: maxTeamSize,
    long_description: projectDetails.longDescription || projectDetails.description,
    image_url: projectDetails.imageURL || "/images/placeholder-project.svg",
    created_by: projectDetails.createdBy || CURRENT_USER_ID,
  };
}

export function createProjectUpdatePayload(projectDetails) {
  const payload = {};

  if (projectDetails.title !== undefined) {
    payload.title = projectDetails.title;
  }

  if (projectDetails.description !== undefined) {
    payload.description = projectDetails.description;
  }

  if (projectDetails.category !== undefined) {
    payload.category = normalizeProjectCategory(projectDetails.category);
  }

  if (projectDetails.difficulty !== undefined) {
    payload.difficulty = projectDetails.difficulty;
  }

  if (projectDetails.permission !== undefined || projectDetails.isPrivate !== undefined) {
    payload.permission = getProjectPermission(projectDetails);
  }

  if (projectDetails.finalOutcome !== undefined) {
    payload.final_outcome = projectDetails.finalOutcome;
  }

  if (projectDetails.longDescription !== undefined) {
    payload.long_description = projectDetails.longDescription;
  }

  if (projectDetails.imageURL !== undefined) {
    payload.image_url = projectDetails.imageURL;
  }

  if (projectDetails.memberIds !== undefined) {
    payload.member_ids = projectDetails.memberIds;
    payload.current_member_count = projectDetails.memberIds.length;
  } else if (projectDetails.currentMemberCount !== undefined) {
    payload.current_member_count = Number(projectDetails.currentMemberCount);
  }

  if (projectDetails.joinRequestIds !== undefined) {
    payload.join_request_ids = projectDetails.joinRequestIds;
  }

  if (projectDetails.maxTeamSize !== undefined) {
    payload.max_team_size = Number(projectDetails.maxTeamSize);
  }

  if (
    payload.current_member_count !== undefined ||
    payload.max_team_size !== undefined ||
    projectDetails.teamSize !== undefined
  ) {
    const currentMemberCount = Number(
      payload.current_member_count ?? projectDetails.currentMemberCount ?? 0
    );
    const maxTeamSize = Number(
      payload.max_team_size ?? projectDetails.maxTeamSize ?? 1
    );

    payload.team_size = projectDetails.teamSize || `${currentMemberCount}/${maxTeamSize}`;
  }

  payload.updated_at = new Date().toISOString();

  return payload;
}

function takeUniqueProjects(projects, limit) {
  const projectMap = new Map();

  projects.forEach((project) => {
    if (project && !projectMap.has(String(project.id))) {
      projectMap.set(String(project.id), project);
    }
  });

  return Array.from(projectMap.values()).slice(0, limit);
}

export function buildDiscoverySections(projects) {
  const projectList = Array.isArray(projects) ? projects : [];
  const popularProjects = takeUniqueProjects(
    [...projectList].sort((firstProject, secondProject) => {
      const firstProjectMembers = firstProject.memberIds?.length || 0;
      const secondProjectMembers = secondProject.memberIds?.length || 0;

      return secondProjectMembers - firstProjectMembers;
    }),
    3
  );
  const recommendedProjects = takeUniqueProjects(
    projectList.filter((project) => project.difficulty === "Beginner"),
    3
  );
  const newProjects = takeUniqueProjects(projectList, 4);
  const sections = [
    ["Popular", popularProjects],
    ["For You", recommendedProjects],
    ["New", newProjects],
  ].filter(([, sectionProjects]) => sectionProjects.length > 0);

  return sections.length > 0 ? sections : [["All projects", projectList]];
}

export async function listProjects() {
  if (!isSupabaseConfigured()) {
    return getAllProjects();
  }

  const records = await listProjectRecords();
  return records.map(normalizeProjectRecord);
}

export async function getProjectByIdFromBackend(projectId) {
  if (!isSupabaseConfigured()) {
    return getProjectById(projectId) || null;
  }

  const record = await getProjectRecordById(projectId);
  return record ? normalizeProjectRecord(record) : null;
}

export async function createProjectRecord(projectDetails) {
  if (!isSupabaseConfigured()) {
    return createProject(projectDetails);
  }

  const record = await createProjectRecordInBackend(createProjectInsertPayload(projectDetails));
  return normalizeProjectRecord(record);
}

export async function updateProjectRecord(projectId, projectDetails) {
  if (!isSupabaseConfigured()) {
    return updateProject(projectId, projectDetails);
  }

  const record = await updateProjectRecordInBackend(
    projectId,
    createProjectUpdatePayload(projectDetails)
  );

  return record ? normalizeProjectRecord(record) : null;
}

function createJoinRequestId(projectId, requesterId) {
  return `join-request-${projectId}-${requesterId}`;
}

export async function joinDiscoveryProject(project, memberId = CURRENT_USER_ID) {
  const currentProject = normalizeProjectRecord(project);
  const memberIds = Array.isArray(currentProject.memberIds)
    ? currentProject.memberIds
    : [];
  const maxTeamSize = Number(currentProject.maxTeamSize || 1);

  if (memberIds.length >= maxTeamSize) {
    return {
      status: "full",
      project: currentProject,
    };
  }

  if (memberIds.includes(memberId)) {
    return {
      status: "already-member",
      project: currentProject,
    };
  }

  if (currentProject.permission === "private") {
    const requestId = createJoinRequestId(currentProject.id, memberId);
    const joinRequestIds = Array.from(
      new Set([...(currentProject.joinRequestIds || []), requestId])
    );
    const request = {
      id: requestId,
      projectId: currentProject.id,
      requesterId: memberId,
      project: currentProject,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      if (!hasProjectJoinRequest(currentProject, requestId)) {
        addProjectJoinRequest(currentProject.id, requestId);
      }

      return {
        status: "pending",
        request,
        project: {
          ...currentProject,
          joinRequestIds,
        },
      };
    }

    const updatedProject = await updateProjectRecord(currentProject.id, {
      joinRequestIds,
      currentMemberCount: memberIds.length,
      maxTeamSize,
    });

    return {
      status: "pending",
      request,
      project: updatedProject || currentProject,
    };
  }

  if (!isSupabaseConfigured()) {
    if (isProjectMember(currentProject, memberId)) {
      return {
        status: "already-member",
        project: currentProject,
      };
    }

    const addMemberResult = addProjectMember(currentProject.id, memberId);

    return {
      status: addMemberResult.status === "added" ? "joined" : addMemberResult.status,
      project: addMemberResult.project || currentProject,
    };
  }

  const updatedMemberIds = [...memberIds, memberId];
  const updatedProject = await updateProjectRecord(currentProject.id, {
    memberIds: updatedMemberIds,
    currentMemberCount: updatedMemberIds.length,
    maxTeamSize,
  });

  return {
    status: "joined",
    project: updatedProject || {
      ...currentProject,
      memberIds: updatedMemberIds,
      currentMemberCount: updatedMemberIds.length,
      teamSize: `${updatedMemberIds.length}/${maxTeamSize}`,
    },
  };
}
