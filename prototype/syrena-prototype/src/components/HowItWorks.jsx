const steps = [
  {
    number: '01',
    title: 'Choose your career track',
    description:
      'Tell us your major, interests, and target role. The platform maps you to a career track and shows you exactly what experience recruiters look for.',
    detail: 'Software Engineering · Data Analytics · Product · UX Design · Marketing · Consulting',
  },
  {
    number: '02',
    title: 'Get matched with a team',
    description:
      'We match you with 3–4 motivated students at your skill level. Your team has clear roles — Developer, Designer, Strategist, and more — so no one gets lost.',
    detail: 'Matched by skill level, availability, and project interest · School email verified',
  },
  {
    number: '03',
    title: 'Follow guided milestones',
    description:
      'Over 5 weeks, your team follows a structured project roadmap with weekly tasks, role-specific checklists, and deliverables. No blank-page anxiety.',
    detail: 'Week 1: Define → Week 2: Research → Week 3: Build → Week 4: Refine → Week 5: Ship',
  },
  {
    number: '04',
    title: 'Export your career proof',
    description:
      'At the end, your project becomes a GitHub repo, resume bullet, portfolio case study, and interview story. Career-ready output, automatically structured.',
    detail: 'Resume bullets · GitHub repo · Portfolio case study · LinkedIn post · Interview story',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            From "I don't know where to start"<br />to career-ready in 5 weeks.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Four simple steps. One complete career project. Everything you need to turn motivation into proof.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row gap-6 items-start rounded-2xl p-7 border transition-all
                ${i === 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'}`}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-3">{step.description}</p>
                <p className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 inline-block">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
