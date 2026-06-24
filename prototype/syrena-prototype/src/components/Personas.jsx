const personas = [
  {
    avatar: '👩‍💻',
    name: 'Sophie',
    label: 'The CS student stuck in tutorial hell',
    color: 'indigo',
    description:
      'You can write code, but you\'ve never shipped a real project with a team. You feel productive watching tutorials or prompting AI — but your GitHub is empty and your resume has no proof.',
    needs: [
      'Pre-scoped project tracks with clear boundaries',
      'A real developer role with specific weekly tasks',
      'Teammates who are serious but also beginners',
      'A deployed app and clean GitHub repo at the end',
    ],
    track: 'Software Engineering Track',
    resume: '"Built and deployed a full-stack web app with a team of four, implementing authentication, REST APIs, and analytics."',
  },
  {
    avatar: '📊',
    name: 'Daniel',
    label: 'The business student with no concrete experience',
    color: 'emerald',
    description:
      'You have strong grades and real interest in consulting or product, but nothing to show for it. You\'ve joined clubs, but the experience isn\'t legible to recruiters — no PRD, no strategy deck, no real deliverable.',
    needs: [
      'Cross-functional teams seeking a business or strategy lead',
      'Pre-formatted deliverable templates (PRD, strategy deck)',
      'A final output recruiters at consulting firms will recognize',
      'Non-code proof of leadership and business thinking',
    ],
    track: 'Consulting & Strategy Track',
    resume: '"Led a four-person product discovery project, conducting 12 user interviews and writing a PRD with prioritized features and KPIs."',
  },
  {
    avatar: '🎨',
    name: 'Maya',
    label: 'The design student with no portfolio-ready case study',
    color: 'violet',
    description:
      'You know Figma, you understand user research, but your portfolio is full of class projects and redesigns. You want real cross-functional collaboration — with engineers who will actually build what you design.',
    needs: [
      'Teams with developers who need a UX designer',
      'Embedded Figma workspace with design-to-dev handoff',
      'A structured path from user research to final prototype',
      'Auto-generated portfolio case study at Week 5',
    ],
    track: 'UX / Product Design Track',
    resume: '"Designed a mobile-first product experience by conducting user research, building a high-fidelity Figma prototype, and incorporating usability feedback into final recommendations."',
  },
]

const colorMap = {
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    tag: 'bg-indigo-100 text-indigo-700',
    avatar: 'bg-indigo-100',
    bullet: 'text-indigo-500',
    quote: 'bg-indigo-600',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    tag: 'bg-emerald-100 text-emerald-700',
    avatar: 'bg-emerald-100',
    bullet: 'text-emerald-500',
    quote: 'bg-emerald-600',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    tag: 'bg-violet-100 text-violet-700',
    avatar: 'bg-violet-100',
    bullet: 'text-violet-500',
    quote: 'bg-violet-600',
  },
}

function PersonaCard({ persona }) {
  const c = colorMap[persona.color]
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-7 flex flex-col gap-5`}>
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl ${c.avatar} flex items-center justify-center text-3xl flex-shrink-0`}>
          {persona.avatar}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{persona.name}</h3>
          <p className="text-sm text-gray-500">{persona.label}</p>
          <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${c.tag}`}>
            {persona.track}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{persona.description}</p>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">What they need</p>
        <ul className="space-y-1.5">
          {persona.needs.map((need) => (
            <li key={need} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.bullet}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {need}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${c.quote} rounded-xl p-4`}>
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1.5">Resume bullet after 5 weeks</p>
        <p className="text-sm text-white italic leading-relaxed">{persona.resume}</p>
      </div>
    </div>
  )
}

export default function Personas() {
  return (
    <section id="for-you" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Built For You</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            We built this for students<br />who are already trying.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            The problem isn't effort. It's lack of structure, teammates, and a clear path to career-ready output.
            The First Step closes that gap — for every kind of student.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <PersonaCard key={persona.name} persona={persona} />
          ))}
        </div>
      </div>
    </section>
  )
}
