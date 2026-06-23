import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { tracks, trackColorMap, difficultyColor } from '../data/tracks'

export default function ProjectListPage() {
  const { trackId } = useParams()
  const track = tracks.find((t) => t.id === trackId)

  if (!track) return <Navigate to="/get-started" replace />

  const c = trackColorMap[track.color]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/get-started" className="hover:text-gray-600 transition-colors">Tracks</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">{track.title}</span>
          </div>

          {/* Track header */}
          <div className={`rounded-2xl ${c.bg} border ${c.border} p-7 mb-10`}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl ${c.icon} flex items-center justify-center text-4xl flex-shrink-0`}>
                {track.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.badge}`}>
                    {track.projects.length} projects
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{track.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {track.internships.map((i) => (
                    <span key={i} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other tracks quick-switch */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-1">
            <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">Switch track:</span>
            {tracks.filter((t) => t.id !== trackId).map((t) => {
              const tc = trackColorMap[t.color]
              return (
                <Link
                  key={t.id}
                  to={`/tracks/${t.id}`}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${tc.border} ${tc.bg} ${tc.text} hover:opacity-80`}
                >
                  <span>{t.icon}</span>
                  {t.shortTitle}
                </Link>
              )
            })}
          </div>

          {/* Project cards */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Recommended projects for {track.title}
            </h2>

            {track.projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} trackId={trackId} c={c} featured={i === 0} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to track selection
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ProjectCard({ project, trackId, c, featured }) {
  return (
    <Link
      to={`/tracks/${trackId}/projects/${project.id}`}
      className={`block rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md
        ${featured ? `${c.bg} ${c.border}` : 'bg-white border-gray-200 hover:border-gray-300'}`}
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {featured && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                  Most popular
                </span>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[project.difficulty]}`}>
                {project.difficulty}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.weeks} weeks
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.teamSize}
              </span>
            </div>
          </div>

          <div className="sm:w-56 flex-shrink-0 space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Roles needed</p>
              <div className="space-y-1">
                {project.rolesNeeded.map((r) => (
                  <div key={r.role} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                    {r.role}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Final outputs</p>
              <div className="flex flex-wrap gap-1">
                {project.outputs.slice(0, 3).map((o) => (
                  <span key={o} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {o}
                  </span>
                ))}
                {project.outputs.length > 3 && (
                  <span className="text-xs text-gray-400">+{project.outputs.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-5 pt-4 border-t ${featured ? c.border : 'border-gray-100'} flex items-center justify-between`}>
          <div className="flex flex-wrap gap-1.5">
            {project.internships.slice(0, 2).map((i) => (
              <span key={i} className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-lg">
                {i}
              </span>
            ))}
          </div>
          <span className={`text-sm font-semibold flex items-center gap-1 ${c.text}`}>
            View project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
