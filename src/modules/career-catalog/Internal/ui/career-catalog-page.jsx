import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./project-card";
import { buildDiscoverySections, listProjects } from "../data/project-service.js";
import { loadWorkspaces } from "../../../project-workspace/PublicAPI";

export default function CareerCatalogPage() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectLoadError, setProjectLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setIsLoadingProjects(true);
      setProjectLoadError("");

      try {
        const projects = await listProjects();

        if (isMounted) {
          setAllProjects(projects);
        }
      } catch (error) {
        console.warn("Unable to load discovery projects.", error);

        if (isMounted) {
          setProjectLoadError("Projects could not be loaded from Supabase. Check the backend setup and try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingProjects(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const yourProjects = useMemo(() => {
    const createdProjects = allProjects.filter((project) =>
      String(project.id).startsWith("created-")
    );
    const joinedProjects = loadWorkspaces().map((workspace) => workspace.project);
    const projectMap = new Map();

    [...createdProjects, ...joinedProjects].forEach((project) => {
      if (project) {
        projectMap.set(String(project.id), project);
      }
    });

    return Array.from(projectMap.values());
  }, [allProjects]);
  const categoryOptions = useMemo(
    () => Array.from(new Set(allProjects.flatMap((project) => project.category))).sort(),
    [allProjects]
  );
  const activeFilterCount = [filterDifficulty, filterCategory].filter(Boolean).length;

  const handleSearchSubmit = () => {
    setAppliedSearchTerm(userSearchInput.trim());
  };

  const clearFilters = () => {
    setFilterDifficulty("");
    setFilterCategory("");
  };

  const filteredProjects = useMemo(() => {
    const normalizedTerm = appliedSearchTerm.toLowerCase();
    const normalizedDifficulty = filterDifficulty.toLowerCase();
    const normalizedCategory = filterCategory.toLowerCase();

    return allProjects.filter((project) => {
      const matchesSearch =
        normalizedTerm === "" ||
        project.title.toLowerCase().includes(normalizedTerm) ||
        project.description.toLowerCase().includes(normalizedTerm) ||
        project.category.some((category) => category.toLowerCase().includes(normalizedTerm));
      const matchesDifficulty =
        normalizedDifficulty === "" ||
        project.difficulty.toLowerCase() === normalizedDifficulty;
      const matchesCategory =
        normalizedCategory === "" ||
        project.category.some((category) => category.toLowerCase() === normalizedCategory);

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [allProjects, appliedSearchTerm, filterCategory, filterDifficulty]);

  const isViewingResults = Boolean(appliedSearchTerm || filterDifficulty || filterCategory);
  const discoverySections = useMemo(
    () => buildDiscoverySections(filteredProjects),
    [filteredProjects]
  );

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

            <div className="flex w-full flex-col gap-3 lg:w-auto">
              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 sm:w-60"
                  placeholder="Search projects"
                  onChange={(event) => setUserSearchInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearchSubmit()}
                  value={userSearchInput}
                />
                <button
                  type="button"
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isFilterPanelOpen || activeFilterCount > 0
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  onClick={() => setIsFilterPanelOpen((isOpen) => !isOpen)}
                >
                  Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </button>
              </div>

              {isFilterPanelOpen ? (
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="grid gap-1 text-xs font-semibold uppercase text-slate-500">
                    Category
                    <select
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium normal-case text-slate-700 outline-none focus:border-blue-400"
                      value={filterCategory}
                      onChange={(event) => setFilterCategory(event.target.value)}
                    >
                      <option value="">All categories</option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-1 text-xs font-semibold uppercase text-slate-500">
                    Difficulty
                    <select
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium normal-case text-slate-700 outline-none focus:border-blue-400"
                      value={filterDifficulty}
                      onChange={(event) => setFilterDifficulty(event.target.value)}
                    >
                      <option value="">All difficulty</option>
                      {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    className="self-end rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Container for the create project between the top and the discovery page */}
        <div>
          <Link
                  to="/discover/projects/new"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  + Create A Project
                </Link>
        </div>

        {isLoadingProjects ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-600 shadow-sm">
            Loading projects...
          </div>
        ) : null}

        {projectLoadError ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {projectLoadError}
          </div>
        ) : null}


        {!isLoadingProjects && isViewingResults ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {appliedSearchTerm ? `Search results for "${appliedSearchTerm}"` : "Filtered projects"}
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
        ) : !isLoadingProjects ? (
          <>
            {yourProjects.length > 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Your projects</h2>
                  <span className="text-sm text-slate-500">
                    {yourProjects.length} projects
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {yourProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      projectObject={project}
                      to={`/projects/${project.id}/dashboard`}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {discoverySections.map(([sectionName, sectionProjects]) => {
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
            })}
          </>
        ) : null}
      </div>
    </section>
  );
}
