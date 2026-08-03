import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { getJoinRequestByProjectId, joinProject } from "../../../project-workspace/PublicAPI";
import { getProjectById, getProjectTeamStatus } from "../data/project-storage.js";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId);
  const [requestState, setRequestState] = useState(() =>
    project ? getJoinRequestByProjectId(project.id) : null
  );

  if (!project) {
    return <Navigate to="/discover" replace />;
  }

  const isPrivateProject = project.permission === "private";
  const { isFull, teamSizeLabel } = getProjectTeamStatus(project);

  const handleJoinProject = () => {
    if (isFull) {
      return;
    }

    const result = joinProject(project);

    if (result.status === "joined" || result.status === "already-member") {
      navigate(`/projects/${project.id}/dashboard`);
      return;
    }

    if (result.status === "full") {
      return;
    }

    setRequestState(result.request);
  };

  const requestedDate = requestState
    ? new Date(requestState.requestedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section className="bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <Link to="/discover" className="text-sm font-semibold text-blue-700">
            Back to projects
          </Link>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-72 bg-slate-100">
              <img
                src={project.imageURL}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {project.category.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 text-3xl font-semibold text-slate-950">
                {project.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {project.longDescription || project.description}
              </p>

              {requestState ? (
                <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-600">
                  Pending request
                  <span className="block pt-1 text-xs font-medium text-slate-500">
                    Requested on {requestedDate}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleJoinProject}
                  disabled={isFull}
                  className={`mt-5 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                    isFull
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                >
                  {isFull ? "Project full" : isPrivateProject ? "Request to join" : "Join project"}
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Difficulty", project.difficulty],
              ["Team size", teamSizeLabel],
              ["Final output", project.finalOutcome],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold">What you'll build</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {[
                "A clear project plan",
                "Team roles and weekly responsibilities",
                project.finalOutcome,
                "A portfolio-ready project summary",
              ].map((item) => (
                <div key={item} className="rounded-xl bg-slate-50 p-3 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="text-sm font-semibold text-emerald-700">
            Other Options
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Create your own project
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Go solo or make your own team to implement and make your project idea come to life!
          </p>

          <Link
            to={`/discover/projects/new`}
            className="mt-5 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Create a project
          </Link>
        </aside>
      </div>
    </section>
  );
}
