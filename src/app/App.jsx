import {
  CareerCatalogPage,
  CreateProjectPage,
  ProjectDetailPage,
  StartProjectPage,
} from "../modules/career-catalog/PublicAPI";

import { LandingPage } from "../modules/landing-page/PublicAPI";

import {
  BuildProfilePage,
  OnboardingPage,
  SurveyPage,
  TrackPage,
} from "../modules/onboarding/PublicAPI";

import {
  LoginPage,
  RequireAuth,
  SignupPage,
  useAuth,
} from "../modules/authentication/PublicAPI";

import { ProjectDashboardPage } from "../modules/project-workspace/PublicAPI";

import { useEffect, useState } from "react";
import { Route, Routes, Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70",
    isActive
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white",
  ].join(" ");

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      const targetId = decodeURIComponent(location.hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [location]);

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await signOut();
      navigate("/", { replace: true });
    } catch {
      setLogoutError("We couldn't log you out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
      {/* Refined Modern Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex justify-between h-18 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-8">
          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link
              to="/"
              aria-label="The First Step home"
              className="flex min-h-11 items-center py-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <img
                src="/images/the-first-step-logo.png"
                alt=""
                className="h-12 w-auto max-w-52 object-contain"
              />
            </Link>
          </div>

          {/* Middle: Primary Navigation */}
          <nav className="flex items-center justify-center gap-3" aria-label="Primary navigation">
            <NavLink
              to="/discover"
              className={navLinkClassName}
            >
              Discover
            </NavLink>
            <Link
              to="/#how-it-works"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
            >
              How it works
            </Link>
          </nav>

          {/* Right: Auth/Profile Actions */}
          <div className="flex flex-col items-end justify-self-end">
            <div className="flex items-center gap-5 text-sm font-medium">
              {isLoading ? (
                <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-800/60" aria-hidden="true" />
              ) : isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-lg border border-slate-700/80 bg-slate-900/50 px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="inline-flex rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {logoutError ? (
              <p
                role="alert"
                aria-live="polite"
                className="absolute right-8 top-[72px] rounded-md border border-red-500/20 bg-red-950/90 px-3 py-1 text-xs text-red-300 shadow-lg"
              >
                {logoutError}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/discover" element={<CareerCatalogPage />} />
          <Route path="/discover/projects/:projectId" element={<ProjectDetailPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/discover/projects/new" element={<CreateProjectPage />} />
            <Route path="/discover/projects/:projectId/start" element={<StartProjectPage />} />
            <Route path="/projects/:projectId/dashboard" element={<ProjectDashboardPage />} />
            <Route path="/onboarding-process" element={<OnboardingPage />} />
            <Route path="/onboarding-process/build-profile" element={<BuildProfilePage />} />
            <Route path="/onboarding-process/build-profile/survey" element={<SurveyPage />} />
            <Route path="/onboarding-process/build-profile/survey/track" element={<TrackPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
