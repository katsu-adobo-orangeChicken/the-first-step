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
import { ProjectDashboardPage } from "../modules/project-workspace/PublicAPI";

import { Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
         <Link to="/" className="flex items-center">
  <img
    src="/images/the-first-step-logo.png"
    alt="The First Step"
    className="h-20 w-auto object-contain"
  />
</Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
            <Link to="/discover" className="transition-colors hover:text-white">
              Discover
            </Link>
            <Link to="/" className="transition-colors hover:text-white">
              How it works
            </Link>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium">
            <Link
              to="/onboarding-process"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-500"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<CareerCatalogPage />} />
          <Route path="/discover/projects/new" element={<CreateProjectPage />} />
          <Route path="/discover/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/discover/projects/:projectId/start" element={<StartProjectPage />} />
          <Route path="/projects/:projectId/dashboard" element={<ProjectDashboardPage />} />
          <Route path="/onboarding-process" element={<OnboardingPage />} />
          <Route path="/onboarding-process/build-profile" element={<BuildProfilePage />} />
          <Route path="/onboarding-process/build-profile/survey" element={<SurveyPage />} />
          <Route path="/onboarding-process/build-profile/survey/track" element={<TrackPage />} />
        </Routes>
      </main>
    </div>
  );
}
