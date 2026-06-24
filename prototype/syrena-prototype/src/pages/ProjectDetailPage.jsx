import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { tracks, trackColorMap, difficultyColor } from '../data/tracks'

export default function ProjectDetailPage() {
  const { trackId, projectId } = useParams()
  const track = tracks.find((t) => t.id === trackId)
  const project = track?.projects.find((p) => p.id === projectId)

  if (!track || !project) return <Navigate to="/get-started" replace />

  const c = trackColorMap[track.color]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
            <Link to="/get-started" className="hover:text-gray-600 transition-colors">Tracks</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link to={`/tracks/${trackId}`} className="hover:text-gray-600 transition-colors">{track.title}</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">{project.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.badge}`}>
                    {track.icon} {track.title}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-lg text-gray-500 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <strong>{project.weeks} weeks</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <strong>{project.teamSize}</strong>
                  </span>
                </div>
              </div>

              {/* Team roles */}
              <Section title="Roles needed">
                <div className="space-y-3">
                  {project.rolesNeeded.map((r) => (
                    <div key={r.role} className={`flex gap-3 p-4 rounded-xl ${c.bg} border ${c.border}`}>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.role}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Weekly milestones */}
              <Section title="Week-by-week milestones">
                <MilestoneTimeline milestones={project.milestones} c={c} />
              </Section>

              {/* Skills */}
              <Section title="Skills you'll build">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((s) => (
                    <span key={s} className={`text-sm px-3 py-1.5 rounded-lg border font-medium ${c.bg} ${c.border} ${c.text}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Sample resume bullet */}
              <Section title="What your resume bullet looks like">
                <div className={`${c.selectedBg} rounded-xl p-5`}>
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">After 5 weeks, you can write:</p>
                  <p className="text-white leading-relaxed italic">"{project.sampleBullet}"</p>
                </div>
              </Section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Final outputs */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Final outputs</h3>
                <ul className="space-y-2">
                  {project.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className={`w-4 h-4 flex-shrink-0 ${c.bullet}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Internship targets */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Target internships</h3>
                <div className="space-y-2">
                  {project.internships.map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-base">🎯</span>
                      {i}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className={`${c.bg} border ${c.border} rounded-2xl p-5`}>
                <p className={`font-semibold ${c.text} mb-1`}>Ready to start?</p>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Join the waitlist and we'll match you with a team for this project when we launch.
                </p>
                <a
                  href="/#waitlist"
                  className={`block w-full text-center text-white text-sm font-semibold py-2.5 rounded-xl transition-all ${c.button}`}
                >
                  Join the waitlist
                </a>
              </div>

              {/* Other projects in track */}
              {track.projects.filter((p) => p.id !== projectId).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Other {track.shortTitle} projects
                  </p>
                  <div className="space-y-2">
                    {track.projects.filter((p) => p.id !== projectId).map((p) => (
                      <Link
                        key={p.id}
                        to={`/tracks/${trackId}/projects/${p.id}`}
                        className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white transition-all text-sm group"
                      >
                        <span className="text-gray-700 group-hover:text-gray-900">{p.title}</span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to={`/tracks/${trackId}`}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All {track.title} projects
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function MilestoneTimeline({ milestones, c }) {
  const [openWeek, setOpenWeek] = useState(null)

  return (
    <div className="space-y-3">
      {milestones.map((m, i) => {
        const isOpen = openWeek === i
        return (
          <div key={m.week} className={`rounded-xl border overflow-hidden transition-all ${isOpen ? `${c.bg} ${c.border}` : 'border-gray-200 bg-white'}`}>
            <button
              onClick={() => setOpenWeek(isOpen ? null : i)}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                ${isOpen ? `${c.selectedBg} text-white` : 'bg-gray-100 text-gray-500'}`}>
                {m.week}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${isOpen ? c.text : 'text-gray-700'}`}>
                  Week {m.week}
                </p>
                <p className="text-gray-500 text-sm">{m.goal}</p>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0">
                <div className={`ml-[52px] pt-3 border-t ${c.border}`}>
                  <ul className="space-y-2">
                    {m.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
