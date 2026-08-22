import {
  createAccountWithPassword,
  getAuthSession,
  getAuthUser,
  listenToAuthChanges,
  signInWithPassword,
  signOutOfSupabase,
} from "../data/auth-repository.js";

function requireValue(value, fieldName) {
  if (!value || !String(value).trim()) {
    throw new Error(`${fieldName} is required.`);
  }
}

export async function signUp({ email, password, fullName }) {
  requireValue(email, "Email");
  requireValue(password, "Password");

  return createAccountWithPassword({
    email: email.trim(),
    password,
    fullName: fullName?.trim() || "",
  });
}

export async function signIn({ email, password }) {
  requireValue(email, "Email");
  requireValue(password, "Password");

  return signInWithPassword({
    email: email.trim(),
    password,
  });
}

export async function signOut() {
  return signOutOfSupabase();
}

export async function getCurrentSession() {
  return getAuthSession();
}

export async function getCurrentUser() {
  return getAuthUser();
}

export function subscribeToAuthChanges(callback) {
  return listenToAuthChanges(callback);
}
