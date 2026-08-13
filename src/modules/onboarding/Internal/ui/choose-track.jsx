import { Link } from "react-router-dom";
import {
  clearOnboardingDraft,
  loadOnboardingDraft,
  saveOnboardingDraft,
} from "../data/onboarding-persistence.js";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";

const tracks = [
  {
    title: "Developer",
    description:
      "Build real products and learn by turning ideas into working solutions.",
    focus: "Apps, tools, and product delivery",
    bestFor:
      "Great for people who enjoy building, problem-solving, and experimenting with technology.",
  },
  {
    title: "Designer",
    description:
      "Create thoughtful experiences by understanding users and shaping how products feel.",
    focus: "Research, UX, and visual design",
    bestFor:
      "Great for people who enjoy creativity, user research, and improving how things work.",
  },
  {
    title: "Business / Marketing",
    description:
      "Help projects grow through strategy, communication, research, and execution.",
    focus: "Strategy, marketing, and growth",
    bestFor:
      "Great for people who enjoy business ideas, teamwork, communication, and solving market problems.",
  },
];

export default function ChooseTrack() {
  const handleTrackSelect = (trackTitle) => {
    const completedDraft = {
      ...loadOnboardingDraft(),
      track: trackTitle,
    };

    saveOnboardingDraft(completedDraft);

    console.log("Onboarding Completed:", completedDraft);

    clearOnboardingDraft();
  };

  return (
    <MultiStepFormWrapper>
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Final step
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Choose your starting track
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Pick the path that feels closest to what you want to explore.
            You can always try something different later.
          </p>
        </div>

        {/* Track Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {tracks.map((track) => (
            <article
              key={track.title}
              className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/60 hover:bg-slate-900"
            >
              {/* Track label */}
              <div className="mb-5">
                <span className="inline-flex rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-400">
                  Track
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-white">
                {track.title}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {track.description}
              </p>

              {/* Focus */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  What you'll work on
                </p>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  {track.focus}
                </p>
              </div>

              {/* Best For */}
              <div className="mt-5 border-t border-slate-800 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Good fit if...
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {track.bestFor}
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/discover"
                onClick={() => handleTrackSelect(track.title)}
                className="mt-auto pt-7"
              >
                <div className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors group-hover:bg-blue-500">
                  Choose this track →
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <Link
            to="/onboarding-process/build-profile/survey"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            ← Back
          </Link>

          <p className="text-center text-xs text-slate-500 sm:text-right">
            Don't worry — your track isn't permanent. You can explore other
            projects anytime.
          </p>
        </div>
      </div>
    </MultiStepFormWrapper>
  );
}