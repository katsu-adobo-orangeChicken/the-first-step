import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.includes('.edu')) {
      setError('Please use your .edu school email to join the waitlist.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section id="waitlist" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          Early access · Limited spots
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
          Take your first step.<br />Start building today.
        </h2>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Join the waitlist and be among the first students to access project tracks, team matching,
          and structured milestones — for free.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">You're on the list!</h3>
            <p className="text-emerald-600 text-sm">
              We'll reach out with early access details as we get closer to launch.
              In the meantime, share with a friend who could use this.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@university.edu"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              {error && <p className="text-red-500 text-xs mt-1.5 text-left">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95 whitespace-nowrap"
            >
              Join waitlist
            </button>
          </form>
        )}

        <p className="text-gray-400 text-xs mt-4">
          School email required for verification · No spam, ever
        </p>

        <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3–5</div>
            <p>students per team, matched by skill and availability</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">5 weeks</div>
            <p>from kickoff to career-ready portfolio output</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">6 tracks</div>
            <p>across engineering, design, data, product, marketing, and strategy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
