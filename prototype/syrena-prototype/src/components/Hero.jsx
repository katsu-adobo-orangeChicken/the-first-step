import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 hero-gradient overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 right-1/4 w-56 h-56 bg-violet-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          Now accepting early access signups
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Build real experience.{' '}
          <span className="gradient-text">Land your first internship.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          The First Step matches motivated college students into beginner-friendly teams,
          gives you a structured project to complete, and turns your work into
          resume bullets, portfolio pieces, and interview stories — before you even apply.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/get-started"
            className="bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
          >
            Get started — it's free
          </Link>
          <a
            href="#how-it-works"
            className="bg-white text-gray-700 border border-gray-200 px-7 py-3.5 rounded-xl font-semibold text-base hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-95"
          >
            See how it works
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-5">
          For freshmen, sophomores, and juniors in the U.S. · No prior experience required
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-20">
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-gray-200/60 p-8 shadow-xl shadow-indigo-100/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-gray-400 font-mono">your-project-workspace</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Your Team</div>
              <div className="space-y-2.5">
                {[
                  { name: 'Sophie K.', role: 'Developer', color: 'bg-indigo-100 text-indigo-700' },
                  { name: 'Daniel B.', role: 'Strategist', color: 'bg-emerald-100 text-emerald-700' },
                  { name: 'Maya H.', role: 'Designer', color: 'bg-violet-100 text-violet-700' },
                  { name: 'You', role: 'Your Role', color: 'bg-orange-100 text-orange-700' },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{m.name}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.color}`}>{m.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Week 3 of 5</div>
              <div className="space-y-2">
                {[
                  { task: 'Define problem statement', done: true },
                  { task: 'Conduct 5 user interviews', done: true },
                  { task: 'Build core prototype', done: false },
                  { task: 'Write technical README', done: false },
                ].map((item) => (
                  <div key={item.task} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-indigo-600' : 'border-2 border-gray-200'}`}>
                      {item.done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.task}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>50%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-indigo-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Final Output</div>
              <div className="space-y-2">
                {[
                  { label: 'GitHub Repo', icon: '⚙️' },
                  { label: 'Resume Bullets', icon: '📝' },
                  { label: 'Portfolio Case Study', icon: '🎨' },
                  { label: 'Interview Story', icon: '💬' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-indigo-50 rounded-lg px-3 py-2 text-xs text-indigo-700 font-medium">
                Auto-exported at Week 5 ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
