import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getJoinRequestByProjectId,
  joinProject,
} from "../../../project-workspace/PublicAPI";
import { getProjectById } from "../data/project-storage.js";

export default function StartProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId);
  const [pendingRequest, setPendingRequest] = useState(() =>
    project ? getJoinRequestByProjectId(project.id) : null
  );

  if (!project) {
    return <Navigate to="/discover" replace />;
  }

  const isPrivateProject = project.permission === "private";

  const handleJoinProject = () => {
    const result = joinProject(project);

    if (result.status === "joined") {
      navigate(`/projects/${project.id}/dashboard`);
      return;
    }

    setPendingRequest(result.request);
  };

  return (
    <section className="bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6">
        <Link
          to={`/discover/projects/${project.id}`}
          className="text-sm font-semibold text-blue-700"
        >
          Back to project details
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-700">Join project</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            Join {project.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            This is an original project owned by its creator. Public projects can
            be joined right away. Private projects send your request to the owner
            for approval.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {pendingRequest ? (
              <>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Request pending
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  You're in the queue
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The project owner will review your request. Once they accept it, this
                  project can open into your dashboard.
                </p>
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  Requested on{" "}
                  {new Date(pendingRequest.requestedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <Link
                  to="/discover"
                  className="mt-6 inline-flex rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to discovery
                </Link>
              </>
            ) : (
              <>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isPrivateProject
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {isPrivateProject ? "Private project" : "Public project"}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  {isPrivateProject ? "Request to join" : "Join instantly"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {isPrivateProject
                    ? "Send a request to the owner. You will wait for acceptance before seeing the workspace."
                    : "This project is open, so joining will take you straight to the project dashboard."}
                </p>
                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  onClick={handleJoinProject}
                >
                  {isPrivateProject ? "Request to join" : "Join project"}
                </button>
              </>
            )}
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Project details</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-500">Owner</p>
                <p className="mt-1 text-slate-800">{project.ownerName || "Project owner"}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-500">Access</p>
                <p className="mt-1 text-slate-800">
                  {isPrivateProject ? "Private, approval required" : "Public, open to join"}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-500">Team</p>
                <p className="mt-1 text-slate-800">{project.teamSize}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-500">Outcome</p>
                <p className="mt-1 text-slate-800">{project.finalOutcome}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
