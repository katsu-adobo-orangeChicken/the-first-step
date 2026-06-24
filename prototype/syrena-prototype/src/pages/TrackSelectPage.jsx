import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { tracks, trackColorMap } from '../data/tracks'

const experienceLevels = [
  { id: 'none', label: 'No experience yet', desc: 'I\'ve never done a real team project' },
  { id: 'weak', label: 'Some experience', desc: 'I\'ve tried things but nothing portfolio-ready' },
  { id: 'confused', label: 'Not sure where to start', desc: 'I don\'t know what experience I even need' },
]

export default function TrackSelectPage() {
  const [step, setStep] = useState(1)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const navigate = useNavigate()

  function handleContinue() {
    if (step === 1 && selectedLevel) setStep(2)
    else if (step === 2 && selectedTrack) navigate(`/tracks/${selectedTrack}`)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-12">
            {[1, 2].map((n) => (
              <div key={n} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                  ${step >= n ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > n ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : n}
                </div>
                <div className={`text-sm font-medium transition-colors ${step >= n ? 'text-gray-900' : 'text-gray-400'}`}>
                  {n === 1 ? 'Your situation' : 'Your track'}
                </div>
                {n < 2 && <div className={`flex-1 h-0.5 rounded-full ml-2 transition-colors ${step > n ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Experience level */}
          {step === 1 && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Where are you starting from?
                </h1>
                <p className="text-gray-500 text-lg">
                  This helps us show you the most relevant projects for your situation.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all
                      ${selectedLevel === level.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold text-base mb-0.5 ${selectedLevel === level.id ? 'text-indigo-700' : 'text-gray-900'}`}>
                          {level.label}
                        </p>
                        <p className="text-sm text-gray-500">{level.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors flex items-center justify-center
                        ${selectedLevel === level.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {selectedLevel === level.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedLevel}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Track selection */}
          {step === 2 && (
            <div>
              <div className="mb-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Which career track fits you?
                </h1>
                <p className="text-gray-500 text-lg">
                  Pick the path that matches your target internship. You'll see recommended projects built for that track.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {tracks.map((track) => {
                  const c = trackColorMap[track.color]
                  const selected = selectedTrack === track.id
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrack(track.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all
                        ${selected ? `border-transparent ring-2 ${c.ring} ${c.bg}` : `border-gray-200 hover:border-gray-300 bg-white`}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${selected ? c.icon : 'bg-gray-100'}`}>
                          {track.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm mb-0.5 ${selected ? c.text : 'text-gray-900'}`}>
                            {track.title}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">{track.tagline}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors flex items-center justify-center
                          ${selected ? `${c.selectedBg} border-transparent` : 'border-gray-300'}`}>
                          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {track.internships.slice(0, 2).map((i) => (
                          <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${selected ? c.badge : 'bg-gray-100 text-gray-500'}`}>
                            {i}
                          </span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedTrack}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                See recommended projects →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
