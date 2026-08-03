import { Link, Navigate, useParams } from "react-router-dom";
import { getWorkspaceByProjectId } from "../data/workspace-storage.js";

export default function ProjectDashboardPage() {
  const { projectId } = useParams();
  const workspace = getWorkspaceByProjectId(projectId);

  if (!workspace) {
    return <Navigate to="/discover" replace />;
  }

  const { project } = workspace;
  const completedTasks = workspace.tasks.filter((task) => task.status === "Done").length;
  const progressPercent = Math.round((completedTasks / workspace.tasks.length) * 100);

  return (
    <section className="bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <Link to="/discover" className="text-sm font-semibold text-blue-700">
            The First Step
          </Link>
          <nav className="mt-6 grid gap-2 text-sm font-medium text-slate-600">
            {["Dashboard", "My Projects", "Tasks", "Team", "Resources"].map((item) => (
              <span
                key={item}
                className={`rounded-xl px-3 py-2 ${
                  item === "Dashboard" ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </aside>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-blue-700">
                  Project workspace
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                  {project.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  {project.longDescription || project.description}
                </p>
              </div>
              <Link
                to="/discover"
                className="rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Browse projects
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Role", workspace.userRole],
              ["Team", `${workspace.teamMembers.length} members`],
              ["Tasks", `${workspace.tasks.length - completedTasks} open`],
              ["Progress", `${progressPercent}%`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">This week's focus</h2>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {workspace.milestones[0].status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {workspace.milestones[0].description}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Tasks</h2>
                  <button
                    type="button"
                    className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Add task
                  </button>
                </div>
                <div className="mt-4 grid gap-3">
                  {workspace.tasks.map((task) => (
                    <label
                      key={task.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm"
                    >
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                      <span className="flex-1 font-medium text-slate-800">{task.title}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {task.priority}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid gap-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold">Team</h2>
                <div className="mt-4 grid gap-3">
                  {workspace.teamMembers.map((member) => (
                    <div key={member} className="flex items-center gap-3 text-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {member.charAt(0)}
                      </span>
                      <span className="font-medium text-slate-800">{member}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold">Deliverables</h2>
                <div className="mt-4 grid gap-3">
                  {workspace.deliverables.map((deliverable) => (
                    <label key={deliverable} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                      <span className="text-slate-700">{deliverable}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
