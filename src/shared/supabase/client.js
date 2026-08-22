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
  const supabaseKey =
    runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY ?? runtimeEnv.VITE_SUPABASE_ANON_KEY;

  return {
    supabaseUrl: runtimeEnv.VITE_SUPABASE_URL,
    supabaseKey,
    supabasePublishableKey: supabaseKey,
    supabaseAnonKey: supabaseKey,
  };
}

export function isSupabaseConfigured() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return Boolean(supabaseUrl && supabaseKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are not configured.");
  }

  if (!supabaseClient) {
    const { supabaseUrl, supabaseKey } = getSupabaseConfig();

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return supabaseClient;
}
