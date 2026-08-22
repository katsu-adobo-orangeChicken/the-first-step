import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentSession,
  signIn as signInWithAuthService,
  signOut as signOutWithAuthService,
  signUp as signUpWithAuthService,
  subscribeToAuthChanges,
} from "../application/auth-service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initializeSession() {
      try {
        const currentSession = await getCurrentSession();

        if (isMounted) {
          setSession(currentSession);
        }
      } catch {
        if (isMounted) {
          setSession(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeSession();

    let authSubscription;

    try {
      const { data } = subscribeToAuthChanges((_event, nextSession) => {
        setSession(nextSession);
        setIsLoading(false);
      });

      authSubscription = data?.subscription;
    } catch {
      authSubscription = null;
    }

    return () => {
      isMounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      isLoading,
      signUp: signUpWithAuthService,
      signIn: signInWithAuthService,
      signOut: signOutWithAuthService,
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
