export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">FS</span>
              </div>
              <span className="font-semibold text-white">The First Step</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              A career-readiness project platform for early college students who want real experience — before they need it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Platform</p>
              <ul className="space-y-2">
                {['How It Works', 'Career Tracks', 'Role Guide', 'Team Matching'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">For Students</p>
              <ul className="space-y-2">
                {['Engineering Track', 'Design Track', 'Business Track', 'Join Waitlist'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs">
            © 2026 The First Step. Built for students, by students.
          </p>
          <p className="text-gray-600 text-xs">
            Designed to help motivated beginners take the first step.
          </p>
        </div>
      </div>
    </footer>
  )
}
