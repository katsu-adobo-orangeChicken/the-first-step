import { Link } from "react-router-dom";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";

const tracks = [
  {
    title: "Developer",
    description:
      "Build products and solve problems.",
  },
  {
    title: "Designer",
    description:
      "Design the product tailor to the user/consumer.",
  },
  {
    title: "Business/Marketing",
    description:
      "Deal with marketing, strategy, and communication within the team.",
  },
];

export default function ChooseTrack() {
  return (
    <MultiStepFormWrapper
      currentStep={4}
      title="Choose your starter track"
      description="Pick a direction for your first recommendations. You can change this later."
      contentWidth="max-w-3xl"
    >
      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
        {tracks.map((track) => (
          <article
            key={track.title}
            className="flex min-h-56 flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 transition-colors hover:border-blue-500/50"
          >
            <div>
              <h3 className="text-xl font-bold text-white">{track.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {track.description}
              </p>
            </div>

            <Link
              to="/discover"
              className="mt-6 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-500"
            >
              Select Track
            </Link>
          </article>
        ))}
      </div>
    </MultiStepFormWrapper>
  );
}
