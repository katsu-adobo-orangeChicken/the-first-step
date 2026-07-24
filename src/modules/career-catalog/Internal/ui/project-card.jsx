export default function ProjectCard({ projectObject }) {
  const difficultyColors = {
    Beginner: "text-emerald-600",
    Intermediate: "text-amber-600",
    Advanced: "text-rose-600",
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="h-44 bg-slate-100">
        <img
          src={projectObject.imageURL}
          alt={projectObject.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{projectObject.title}</h3>
          <span className={`text-sm font-semibold ${difficultyColors[projectObject.difficulty]}`}>
            {projectObject.difficulty}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">{projectObject.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            Team: {projectObject.teamSize}
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
            {projectObject.category.join(", ")}
          </span>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          <p className="font-medium text-slate-800">Outcome</p>
          <p className="mt-1">{projectObject.finalOutcome}</p>
        </div>
      </div>
    </article>
  );
}
