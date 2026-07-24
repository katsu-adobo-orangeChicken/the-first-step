const steps = ["Account", "Profile", "Survey", "Track"];

export default function OnboardingSteps({ currentStep }) {
  return (
    <ol className="mx-auto grid w-full max-w-xl grid-cols-4 items-start gap-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <li key={step} className="relative flex flex-col items-center gap-2">
            {stepNumber < steps.length && (
              <span
                className={`absolute left-1/2 top-4 h-px w-full ${
                  isComplete ? "bg-blue-500/70" : "bg-slate-700"
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                isComplete
                  ? "border-blue-500 bg-blue-500 text-white"
                  : isCurrent
                    ? "border-blue-400 bg-slate-950 text-blue-300 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                    : "border-slate-700 bg-slate-900 text-slate-500"
              }`}
            >
              {stepNumber}
            </span>
            <span
              className={`text-center text-xs font-semibold ${
                isCurrent ? "text-slate-100" : "text-slate-500"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
