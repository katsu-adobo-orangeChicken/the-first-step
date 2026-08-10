import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

function getRuntimeEnv() {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env;
  }

  return globalThis.process?.env || {};
}

export function getSupabaseConfig() {
  const runtimeEnv = getRuntimeEnv();

  return {
    supabaseUrl: runtimeEnv.VITE_SUPABASE_URL,
    supabaseAnonKey: runtimeEnv.VITE_SUPABASE_ANON_KEY,
  };
}

export function isSupabaseConfigured() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are not configured.");
  }

  if (!supabaseClient) {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}
