import { getSupabaseClient } from "../../../../shared/supabase/client.js";

const PROJECT_SELECT_COLUMNS = [
  "id",
  "title",
  "description",
  "category",
  "difficulty",
  "permission",
  "final_outcome",
  "team_size",
  "member_ids",
  "join_request_ids",
  "current_member_count",
  "max_team_size",
  "long_description",
  "image_url",
  "created_by",
  "created_at",
  "updated_at",
].join(",");

export async function listProjectRecords() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getProjectRecordById(projectId) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT_COLUMNS)
    .eq("id", projectId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}

export async function createProjectRecordInBackend(payload) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select(PROJECT_SELECT_COLUMNS)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProjectRecordInBackend(projectId, payload) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", projectId)
    .select(PROJECT_SELECT_COLUMNS)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}
