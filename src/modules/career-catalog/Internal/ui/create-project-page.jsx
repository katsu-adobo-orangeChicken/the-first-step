import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkspaceForProject } from "../../../project-workspace/PublicAPI";
import { createProjectRecord } from "../data/project-service.js";

const categories = ["Community", "Technology", "Education", "Arts", "Business", "Health"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
const timeCommitments = ["2-3 hours/week", "4-6 hours/week", "7-8 hours/week", "10+ hours/week"];

const defaultProjectForm = {
  title: "",
  description: "",
  longDescription: "",
  category: "Community",
  difficulty: "Beginner",
  maxTeamSize: 4,
  finalOutcome: "",
  isPrivate: false,
  expectedTimeCommitment: timeCommitments[0],
};

export default function CreateProjectPage() {
  const [projectForm, setProjectForm] = useState(defaultProjectForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const updateField = (fieldName, value) => {
    setProjectForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const trimmedDescription = projectForm.description.trim();

    try {
      const nextProject = await createProjectRecord({
        ...projectForm,
        title: projectForm.title.trim(),
        description: trimmedDescription,
        longDescription: projectForm.longDescription.trim() || trimmedDescription,
        finalOutcome: projectForm.finalOutcome.trim() || "Project portfolio artifact",
        currentMemberCount: 1,
      });

      createWorkspaceForProject(nextProject, "created");
      navigate(`/projects/${nextProject.id}/dashboard`);
    } catch (error) {
      console.warn("Unable to create project.", error);
      setSubmitError("Project could not be created. Please try again.");
      setIsSubmitting(false);
    }
  };

  const switchTrackClassName = [
    "relative",
    "inline-flex",
    "h-6",
    "w-11",
    "shrink-0",
    "cursor-pointer",
    "rounded-full",
    "border-2",
    "border-transparent",
    "transition-colors",
    "duration-200",
    "ease-in-out",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500",
    "focus:ring-offset-2",
    projectForm.isPrivate ? "bg-slate-600" : "bg-slate-200",
  ].join(" ");

  const switchThumbClassName = [
    "pointer-events-none",
    "inline-block",
    "h-5",
    "w-5",
    "rounded-full",
    "bg-white",
    "shadow",
    "transition",
    "duration-200",
    "ease-in-out",
    projectForm.isPrivate ? "translate-x-5" : "translate-x-0",
  ].join(" ");

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
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Difficulty
                <select
                  value={projectForm.difficulty}
                  onChange={(event) => updateField("difficulty", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                >
                  {difficultyLevels.map((difficulty) => (
                    <option key={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Team size
                <input
                  value={projectForm.maxTeamSize}
                  type="number"
                  min="1"
                  max="12"
                  onChange={(event) => {
                    const value = event.target.value;
                    updateField("maxTeamSize", value === "" ? "" : parseInt(value, 10));
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                  placeholder="1"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Expected Time Commitment

                <select
                  value={projectForm.expectedTimeCommitment}
                  onChange={(event) => updateField("expectedTimeCommitment", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                >
                  {timeCommitments.map((timeCommitment) => (
                    <option key={timeCommitment}>{timeCommitment}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">Private Project</p>
                <p className="mt-1 text-sm font-normal text-slate-500">
                  Can other people freely join your project?
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={projectForm.isPrivate}
                aria-label="Toggle private project"
                onClick={() => updateField("isPrivate", !projectForm.isPrivate)}
                className={switchTrackClassName}
              >
                <span className={switchThumbClassName} />
              </button>
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

            {submitError ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {submitError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {isSubmitting ? "Creating..." : "Create workspace"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
