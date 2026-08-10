export { default as CareerCatalogPage, default as DefaultCareerCatalogPage } from "../Internal/ui/career-catalog-page.jsx";
export { default as CreateProjectPage } from "../Internal/ui/create-project-page.jsx";
export { default as ProjectDetailPage } from "../Internal/ui/project-detail-page.jsx";
export { default as StartProjectPage } from "../Internal/ui/start-project-page.jsx";
export {
  buildDiscoverySections,
  createProjectRecord,
  joinDiscoveryProject,
  getProjectByIdFromBackend as getProjectDetail,
  listProjects as listRecommendedProjects,
  updateProjectRecord,
} from "../Internal/data/project-service.js";
export { getAllProjects, getProjectById } from "../Internal/data/project-storage.js";
