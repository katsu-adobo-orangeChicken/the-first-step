const tracks = [
  {
    icon: '⚙️',
    title: 'Software Engineering',
    color: 'indigo',
    roles: ['Developer', 'Backend Engineer', 'Full-Stack'],
    projects: ['Full-stack web app', 'Mobile app prototype', 'API project', 'AI feature prototype'],
    outputs: ['GitHub repo', 'Deployed demo', 'Architecture notes', 'Resume bullets'],
    internships: 'Google SWE Intern · Microsoft Explore · Startup SWE',
  },
  {
    icon: '📊',
    title: 'Data Science & Analytics',
    color: 'emerald',
    roles: ['Data Analyst', 'ML Engineer', 'Data Scientist'],
    projects: ['Data dashboard', 'SQL/Python analysis', 'ML model prototype', 'Business insights report'],
    outputs: ['SQL/Python notebook', 'Dashboard', 'Findings memo', 'Resume bullets'],
    internships: 'Capital One Analytics · Data Intern · ML-adjacent roles',
  },
  {
    icon: '🗂️',
    title: 'Product Management',
    color: 'violet',
    roles: ['Product Lead', 'Product Analyst', 'Program Manager'],
    projects: ['Product discovery sprint', 'User research project', 'Feature proposal', 'Roadmap exercise'],
    outputs: ['PRD', 'User research summary', 'Roadmap slides', 'Interview story'],
    internships: 'Google APMM · Product internships · Business Analyst roles',
  },
  {
    icon: '🎨',
    title: 'UX / Product Design',
    color: 'pink',
    roles: ['UX Designer', 'Product Designer', 'UX Researcher'],
    projects: ['Mobile app redesign', 'Figma prototype', 'User interview study', 'Usability test'],
    outputs: ['Figma case study', 'Research summary', 'Usability report', 'Portfolio piece'],
    internships: 'Google UX · Adobe Design · Figma Design Intern',
  },
  {
    icon: '📣',
    title: 'Marketing & Growth',
    color: 'orange',
    roles: ['Marketing Lead', 'Growth Analyst', 'Content Strategist'],
    projects: ['Go-to-market strategy', 'Campaign plan', 'Content calendar', 'Growth experiment'],
    outputs: ['Campaign brief', 'KPI report', 'Experiment readout', 'Resume bullets'],
    internships: 'Product marketing · Growth roles · Marketing intern',
  },
  {
    icon: '📈',
    title: 'Consulting & Strategy',
    color: 'teal',
    roles: ['Business Strategist', 'Market Analyst', 'Strategy Lead'],
    projects: ['Market entry analysis', 'Business model case', 'Startup validation', 'Consulting deck'],
    outputs: ['Strategy deck', 'Market analysis', 'Recommendation memo', 'Interview story'],
    internships: 'McKinsey Summer BA · Bain ACI · BCG Consulting Intern',
  },
]

const colorMap = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', badge: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500', icon: 'bg-indigo-100' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', icon: 'bg-emerald-100' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-100', badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500', icon: 'bg-violet-100' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-100', badge: 'bg-pink-100 text-pink-700', dot: 'bg-pink-500', icon: 'bg-pink-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-100', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', icon: 'bg-orange-100' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-100', badge: 'bg-teal-100 text-teal-700', dot: 'bg-teal-500', icon: 'bg-teal-100' },
}

function TrackCard({ track }) {
  const c = colorMap[track.color]
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 card-hover flex flex-col gap-4`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center text-xl`}>
          {track.icon}
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {track.roles.map((r) => (
            <span key={r} className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>{r}</span>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900">{track.title}</h3>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Project Ideas</p>
        <ul className="space-y-1">
          {track.projects.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Final Outputs</p>
        <div className="flex flex-wrap gap-1.5">
          {track.outputs.map((o) => (
            <span key={o} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
              {o}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-2 border-t border-gray-200/60">
        <p className="text-xs text-gray-400">{track.internships}</p>
      </div>
    </div>
  )
}

export default function CareerTracks() {
  return (
    <section id="career-tracks" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Career Tracks</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Pick your path. Build the proof.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Every track is designed with real recruiters in mind. You'll know exactly what to build,
            what role to play, and what to show in interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map((track) => (
            <TrackCard key={track.title} track={track} />
          ))}
        </div>
      </div>
    </section>
  )
}
