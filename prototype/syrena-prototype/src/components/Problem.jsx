const barriers = [
  {
    platform: 'LinkedIn',
    icon: '💼',
    problem: 'Feels too advanced. Most opportunities require prior experience — the very thing you\'re trying to get.',
  },
  {
    platform: 'Discord',
    icon: '🎮',
    problem: 'Messy and unstructured. Hard to find serious teammates or know where to start.',
  },
  {
    platform: 'Hackathons',
    icon: '⚡',
    problem: 'Great energy, but 48 hours isn\'t enough to develop real teamwork, confidence, or lasting skills.',
  },
  {
    platform: 'Student Clubs',
    icon: '🏫',
    problem: 'Access depends on your school, your network, and whether you got in. Not built for every student.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            You're working hard.<br />But the experience gap is real.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Nearly 90% of employers look for problem-solving evidence on student resumes.
            Nearly 80% look for teamwork. But no one teaches you how to build that experience before you apply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {barriers.map((b) => (
            <div key={b.platform} className="bg-white rounded-xl p-5 border border-gray-200 flex gap-4">
              <div className="text-2xl flex-shrink-0 mt-0.5">{b.icon}</div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">{b.platform}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{b.problem}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
          <p className="text-2xl md:text-3xl font-bold mb-3">
            The First Step fills the gap.
          </p>
          <p className="text-indigo-200 text-base md:text-lg max-w-2xl mx-auto">
            A structured platform designed for beginners — with project tracks, team matching,
            role guidance, and weekly milestones — so you can build real experience before you ever need it.
          </p>
        </div>
      </div>
    </section>
  )
}
