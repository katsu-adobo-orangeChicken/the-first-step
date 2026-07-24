import { Link } from "react-router-dom";

const featuredProjects = [
  {
    title: "Youth Coding Workshop",
    tag: "Technology",
    difficulty: "Beginner",
    outcome: "Workshop curriculum",
    progress: "8 open seats",
  },
  {
    title: "Community Garden Project",
    tag: "Environment",
    difficulty: "Beginner",
    outcome: "Seasonal care plan",
    progress: "4 open seats",
  },
  {
    title: "Senior Tech Help Desk",
    tag: "Community",
    difficulty: "Intermediate",
    outcome: "Support session guide",
    progress: "6 open seats",
  },
];

const workflowSteps = [
  "Create an account",
  "Build your profile",
  "Take the survey",
  "Get matched",
  "Join a team",
  "Ship the project",
];

const skillSignals = [
  "Product thinking",
  "Team collaboration",
  "Project planning",
  "User research",
];

export default function LandingPage() {
  return (
    <section className="bg-slate-50 text-slate-950">
      <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="flex min-h-96 flex-col justify-center gap-6 border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase text-blue-600">
                Beginner-first projects
              </p>
              <h1 className="max-w-xl text-4xl font-bold text-slate-950 sm:text-5xl">
                Build real experience before the resume asks for it.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                The First Step helps students and early builders find low-stakes
                projects, join small teams, and turn finished work into proof
                they can talk about.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/onboarding-process"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
              >
                Start building
              </Link>
              <Link
                to="/discover"
                className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              >
                Browse projects
              </Link>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                ["30+", "mock projects"],
                ["6", "guided steps"],
                ["Beginner", "friendly tracks"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-slate-100 p-4">
                  <p className="text-2xl font-bold text-slate-950">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="flex h-full min-h-96 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-inner sm:p-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Recommended for you
                  </p>
                  <p className="text-xs text-slate-500">
                    Based on your profile survey
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Live preview
                </span>
              </div>

              <div className="grid flex-1 gap-3">
                {featuredProjects.map((project) => (
                  <article
                    key={project.title}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase text-blue-600">
                          {project.tag}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                          {project.title}
                        </h2>
                      </div>
                      <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {project.difficulty}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <span className="rounded-lg bg-white px-3 py-2">
                        Outcome: {project.outcome}
                      </span>
                      <span className="rounded-lg bg-white px-3 py-2">
                        Team: {project.progress}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-blue-600">
                How it works
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                A short path from curious to shipped.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              The flow is intentionally simple, so the first win feels close
              enough to actually start.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {workflowSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm font-semibold uppercase text-blue-400">
              The First Step
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Mock landing module for now, built around the product idea:
              beginner-friendly project matching with outcomes that can become
              portfolio and resume material.
            </p>
            <div className="mt-4 flex gap-3 text-sm font-medium text-slate-300">
              <span>LinkedIn</span>
              <span>GitHub</span>
              <span>Discord</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skillSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-sm font-semibold text-white">{signal}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Skills that map cleanly to internships, first jobs, and team
                  interviews.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
