import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">FS</span>
          </div>
          <span className="font-semibold text-gray-900">The First Step</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isLanding ? (
            <>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
              <a href="#career-tracks" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Career Tracks</a>
              <a href="#for-you" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">For You</a>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/get-started" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Explore Tracks</Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#waitlist" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sign in</a>
          <Link
            to="/get-started"
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Get started
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-gray-700 transition-transform origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 transition-transform origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link to="/" className="text-sm text-gray-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/get-started" className="text-sm text-gray-600" onClick={() => setMenuOpen(false)}>Explore Tracks</Link>
          <Link
            to="/get-started"
            className="text-sm bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-center font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  )
}
