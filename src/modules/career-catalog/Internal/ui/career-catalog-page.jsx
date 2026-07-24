import { useMemo, useState } from "react";
import ProjectCard from "./project-card";
import { projects, projectSections } from "../data/projects.js";

export default function CareerCatalogPage() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const handleSearchSubmit = () => {
    setAppliedSearchTerm(userSearchInput.trim());
  };

  const filteredProjects = useMemo(() => {
    const normalizedTerm = appliedSearchTerm.toLowerCase();
    const normalizedFilter = filterDifficulty.toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        normalizedTerm === "" || project.title.toLowerCase().includes(normalizedTerm);
      const matchesFilter =
        normalizedFilter === "" || project.difficulty.toLowerCase() === normalizedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [appliedSearchTerm, filterDifficulty]);

  const getProjectByIDs = (ids) =>
    filteredProjects.filter((project) => ids.includes(project.id));

  return (
    <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                Discover
              </p>
              <h1 className="text-3xl font-semibold text-slate-900">
                Explore meaningful projects
              </h1>
              <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                Browse community-driven opportunities and find the perfect place to contribute your skills.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
                  placeholder="Search projects"
                  onChange={(event) => setUserSearchInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearchSubmit()}
                  value={userSearchInput}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${filterDifficulty === "Beginner" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  onClick={() => setFilterDifficulty(filterDifficulty === "Beginner" ? "" : "Beginner")}
                >
                  Beginner only
                </button>
                <button
                  type="button"
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
                  onClick={handleSearchSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {appliedSearchTerm || filterDifficulty ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {appliedSearchTerm ? `Search results for “${appliedSearchTerm}”` : "Filtered projects"}
              </h2>
              <span className="text-sm text-slate-500">{filteredProjects.length} projects found</span>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} projectObject={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                No projects match that search yet. Try broadening the filters or explore the default sections below.
              </div>
            )}
          </div>
        ) : (
          Object.entries(projectSections).map(([sectionName, projectIds]) => {
            const sectionProjects = getProjectByIDs(projectIds);

            return (
              <div key={sectionName} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">{sectionName}</h2>
                  <span className="text-sm text-slate-500">{sectionProjects.length} projects</span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {sectionProjects.map((project) => (
                    <ProjectCard key={project.id} projectObject={project} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
