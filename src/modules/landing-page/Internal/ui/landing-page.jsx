import { Link } from "react-router-dom";

const workflowSteps = [
  {
    step: "1",
    title: "Create & Profile",
    description: "Set up your account and highlight your goals and background.",
  },
  {
    step: "2",
    title: "Take the Survey",
    description: "Answer quick questions to match with the right track.",
  },
  {
    step: "3",
    title: "Get Matched",
    description: "Discover curated beginner-friendly project tracks tailored to you.",
  },
  {
    step: "4",
    title: "Join a Team",
    description: "Collaborate in small cohorts with peers and build together.",
  },
  {
    step: "5",
    title: "Ship the Project",
    description: "Launch finished, tangible work ready for resumes and portfolios.",
  },
];

const valueProps = [
  {
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Zero experience barrier",
    description: "Structured tracks built specifically for first-time builders and students.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast-paced execution",
    description: "Bite-sized sprints and mock projects you can finish in weeks, not months.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Interview-ready proof",
    description: "Turn finished projects into talking points, code repos, and resume signals.",
  },
];

const featuredProjects = [
  {
    title: "Youth Coding Workshop",
    tag: "Technology",
    difficulty: "Beginner",
    outcome: "Workshop curriculum",
    seats: "8 open seats",
  },
  {
    title: "Community Garden App",
    tag: "Environment",
    difficulty: "Beginner",
    outcome: "Seasonal care plan",
    seats: "4 open seats",
  },
  {
    title: "Senior Tech Help Desk",
    tag: "Community",
    difficulty: "Intermediate",
    outcome: "Support session guide",
    seats: "6 open seats",
  },
];

const targetCompanies = [
  { name: "Google", symbol: "G" },
  { name: "Microsoft", symbol: "⊞" },
  { name: "Meta", symbol: "∞" },
  { name: "Amazon", symbol: "a" },
  { name: "Apple", symbol: "" },
  { name: "Spotify", symbol: "●" },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Beginner-First Project Platform
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]">
            No experience on your resume?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl sm:leading-8">
            We help you build real projects before companies ask for them. Join collaborative teams, ship practical software, and turn finished work into career proof.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/auth/signup"
              className="w-full rounded-lg bg-blue-600 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition duration-200 hover:bg-blue-500 sm:w-auto"
            >
              Get started for free
            </Link>
            <Link
              to="/discover"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-8 py-3.5 text-center text-base font-semibold text-slate-200 transition duration-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white sm:w-auto"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  {prop.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{prop.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Step Timeline */}
      <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              This is how it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              A guided path from curious beginner to a shipped portfolio project.
            </p>
          </div>

          <div className="relative mt-16">
            <div
              className="absolute left-0 top-6 hidden h-0.5 w-full -translate-y-1/2 bg-blue-200 lg:block"
              aria-hidden="true"
            />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {workflowSteps.map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-md ring-4 ring-slate-50">
                    {item.step}
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Available Tracks</span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Featured Starter Projects</h2>
            </div>
            <Link
              to="/discover"
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-500"
            >
              View all projects &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {project.tag}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">
                    <strong className="text-slate-700">Deliverable:</strong> {project.outcome}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">
                  <span>{project.seats}</span>
                  <Link to="/discover" className="font-semibold text-blue-600 hover:underline">
                    View track &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Companies Banner Strip */}
      <section className="border-t border-slate-900 bg-black py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 lg:flex-row lg:gap-8">
          <div className="flex shrink-0 items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tailor your experience towards your career goals.
            </p>
            <div className="hidden h-6 w-px bg-slate-800 lg:block" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:flex-1 lg:justify-between">
            {targetCompanies.map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-2 font-medium tracking-wide text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <span className="text-base font-bold text-slate-500">{company.symbol}</span>
                <span className="text-sm font-semibold tracking-wider">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
