import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDiscoverySections,
  createProjectInsertPayload,
  createProjectUpdatePayload,
  normalizeProjectRecord,
} from "./project-service.js";

test("normalizeProjectRecord converts string categories into an array", () => {
  const project = normalizeProjectRecord({
    id: 1,
    title: "Sample project",
    description: "A sample description",
    category: "Community",
    difficulty: "Beginner",
    teamSize: "4/8",
  });

  assert.deepEqual(project.category, ["Community"]);
  assert.equal(project.difficulty, "Beginner");
  assert.equal(project.permission, "public");
});

test("normalizeProjectRecord preserves existing arrays and defaults", () => {
  const project = normalizeProjectRecord({
    id: 2,
    title: "Another project",
    description: "A second sample",
    category: ["Education", "Technology"],
    difficulty: "Intermediate",
    permission: "private",
  });

  assert.deepEqual(project.category, ["Education", "Technology"]);
  assert.equal(project.permission, "private");
  assert.equal(project.maxTeamSize, 1);
});

test("normalizeProjectRecord maps Supabase snake case fields into UI fields", () => {
  const project = normalizeProjectRecord({
    id: "11111111-1111-1111-1111-111111111111",
    title: "Backend project",
    description: "A project loaded from Supabase",
    category: ["Technology"],
    difficulty: "Beginner",
    final_outcome: "Working prototype",
    image_url: "/images/backend-project.png",
    long_description: "A longer backend-loaded description",
    team_size: "2/5",
    member_ids: ["student-a", "student-b"],
    join_request_ids: ["join-request-1"],
  });

  assert.equal(project.finalOutcome, "Working prototype");
  assert.equal(project.imageURL, "/images/backend-project.png");
  assert.equal(project.longDescription, "A longer backend-loaded description");
  assert.equal(project.teamSize, "2/5");
  assert.equal(project.maxTeamSize, 5);
  assert.equal(project.memberIds.length, 2);
  assert.deepEqual(project.memberIds, ["student-a", "student-b"]);
  assert.deepEqual(project.joinRequestIds, ["join-request-1"]);
});

test("normalizeProjectRecord builds team size from backend team counts", () => {
  const project = normalizeProjectRecord({
    id: "22222222-2222-2222-2222-222222222222",
    title: "Counted project",
    description: "A project with normalized team counts",
    category: ["Community"],
    difficulty: "Intermediate",
    current_member_count: 3,
    max_team_size: 6,
  });

  assert.equal(project.teamSize, "3/6");
  assert.equal(project.currentMemberCount, 3);
  assert.equal(project.maxTeamSize, 6);
  assert.equal(project.memberIds.length, 3);
});

test("normalizeProjectRecord uses backend counts when member id metadata is empty", () => {
  const project = normalizeProjectRecord({
    id: "33333333-3333-3333-3333-333333333333",
    title: "Existing backend project",
    description: "A project created before member ids were stored",
    category: ["Community"],
    difficulty: "Beginner",
    member_ids: [],
    current_member_count: 4,
    max_team_size: 8,
  });

  assert.equal(project.teamSize, "4/8");
  assert.equal(project.currentMemberCount, 4);
  assert.equal(project.memberIds.length, 4);
});

test("createProjectInsertPayload maps the create form into Supabase columns", () => {
  const payload = createProjectInsertPayload({
    title: "New discovery project",
    description: "A student-created project",
    category: "Business",
    difficulty: "Beginner",
    isPrivate: true,
    finalOutcome: "Pitch deck",
    maxTeamSize: 5,
    currentMemberCount: 1,
    longDescription: "A longer project description",
  });

  assert.deepEqual(payload.category, ["Business"]);
  assert.equal(payload.permission, "private");
  assert.equal(payload.final_outcome, "Pitch deck");
  assert.equal(payload.team_size, "1/5");
  assert.equal(payload.current_member_count, 1);
  assert.equal(payload.max_team_size, 5);
  assert.deepEqual(payload.member_ids, ["current-user"]);
  assert.deepEqual(payload.join_request_ids, []);
});

test("createProjectUpdatePayload maps team metadata into Supabase columns", () => {
  const payload = createProjectUpdatePayload({
    memberIds: ["current-user", "student-a"],
    joinRequestIds: ["join-request-a"],
    maxTeamSize: 5,
  });

  assert.deepEqual(payload.member_ids, ["current-user", "student-a"]);
  assert.deepEqual(payload.join_request_ids, ["join-request-a"]);
  assert.equal(payload.current_member_count, 2);
  assert.equal(payload.max_team_size, 5);
  assert.equal(payload.team_size, "2/5");
  assert.ok(payload.updated_at);
});

test("buildDiscoverySections creates backend-friendly discovery groups", () => {
  const sections = buildDiscoverySections([
    normalizeProjectRecord({
      id: "a",
      title: "First",
      description: "First project",
      category: ["Community"],
      difficulty: "Beginner",
      current_member_count: 4,
      max_team_size: 8,
    }),
    normalizeProjectRecord({
      id: "b",
      title: "Second",
      description: "Second project",
      category: ["Technology"],
      difficulty: "Advanced",
      current_member_count: 1,
      max_team_size: 4,
    }),
  ]);

  assert.deepEqual(sections.map(([sectionName]) => sectionName), [
    "Popular",
    "For You",
    "New",
  ]);
  assert.equal(sections[0][1][0].id, "a");
  assert.equal(sections[1][1][0].difficulty, "Beginner");
});
