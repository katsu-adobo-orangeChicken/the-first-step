import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkspaceForProject } from "../../../project-workspace/PublicAPI";
import { createProject } from "../data/project-storage.js";

const defaultProjectForm = {
  title: "",
  description: "",
  longDescription: "",
  category: "Community",
  difficulty: "Beginner",
  teamSize: "1/5",
  finalOutcome: "",
};

export default function CreateProjectPage() {
  const [projectForm, setProjectForm] = useState(defaultProjectForm);
  const navigate = useNavigate();

  const updateField = (fieldName, value) => {
    setProjectForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextProject = createProject({
      ...projectForm,
      description: projectForm.description.trim(),
      longDescription: projectForm.longDescription.trim() || projectForm.description.trim(),
      title: projectForm.title.trim(),
      finalOutcome: projectForm.finalOutcome.trim() || "Project portfolio artifact",
    });

    createWorkspaceForProject(nextProject, "created");
    navigate(`/projects/${nextProject.id}/dashboard`);
  };

  return (
    <section className="bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/discover" className="text-sm font-semibold text-blue-700">
          Back to discovery
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-700">Create project</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            Start a custom project
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Define a practical project idea and generate a starter workspace with tasks,
            milestones, and deliverables.
          </p>

          <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Project title
              <input
                required
                value={projectForm.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                placeholder="Campus Event Hub"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Short description
              <textarea
                required
                value={projectForm.description}
                onChange={(event) => updateField("description", event.target.value)}
                className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                placeholder="What will the project help people do?"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Longer project context
              <textarea
                value={projectForm.longDescription}
                onChange={(event) => updateField("longDescription", event.target.value)}
                className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                placeholder="Who is it for, why does it matter, and what should the first version include?"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Category
                <select
                  value={projectForm.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                >
                  {["Community", "Technology", "Education", "Arts", "Business", "Health"].map(
                    (category) => (
                      <option key={category}>{category}</option>
                    )
                  )}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Difficulty
                <select
                  value={projectForm.difficulty}
                  onChange={(event) => updateField("difficulty", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                >
                  {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                    <option key={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Team size
                <input
                  value={projectForm.teamSize}
                  onChange={(event) => updateField("teamSize", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                  placeholder="1/5"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Final output
              <input
                value={projectForm.finalOutcome}
                onChange={(event) => updateField("finalOutcome", event.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                placeholder="Portfolio case study, prototype, dashboard, or campaign plan"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Create workspace
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
