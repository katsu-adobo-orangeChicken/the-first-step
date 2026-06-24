const stats = [
  {
    value: '~90%',
    label: 'of employers look for problem-solving evidence on student resumes',
    source: 'NACE Job Outlook 2025',
  },
  {
    value: '~80%',
    label: 'of employers look for teamwork skills when reviewing undergraduate candidates',
    source: 'NACE Job Outlook 2025',
  },
  {
    value: '15%+',
    label: 'decline in internship postings between Jan 2023 and Jan 2025 — while applications grew',
    source: 'Handshake Internship Index 2025',
  },
  {
    value: '5 weeks',
    label: 'is all it takes to build career-ready project experience with the right structure and team',
    source: 'The First Step methodology',
  },
]

const principles = [
  {
    icon: '🎯',
    title: 'Beginner-first by design',
    body: 'Every project track is scoped for students with minimal experience. No prior internship required — just motivation and a few hours a week.',
  },
  {
    icon: '🤝',
    title: 'Real cross-functional teams',
    body: 'You work alongside engineers, designers, and strategists — just like real product teams. No solo projects. No vague club experiences.',
  },
  {
    icon: '📋',
    title: 'Structured milestones, not confusion',
    body: 'Weekly milestones with role-specific tasks eliminate blank-page anxiety. You always know what to do and when it\'s due.',
  },
  {
    icon: '📦',
    title: 'Portfolio-ready at the end',
    body: 'Every project produces tangible career assets: a GitHub repo, strategy deck, UX case study, or campaign brief — ready to show recruiters.',
  },
]

export default function Stats() {
  return (
    <section className="py-24 px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Why It Matters</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            The data is clear.<br />Project experience changes outcomes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {stats.map((stat) => (
            <div key={stat.value} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-4xl font-bold text-indigo-400 mb-2">{stat.value}</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">{stat.label}</p>
              <p className="text-gray-600 text-xs">{stat.source}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((p) => (
            <div key={p.title} className="flex gap-4">
              <div className="text-2xl flex-shrink-0">{p.icon}</div>
              <div>
                <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
