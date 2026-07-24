export default function StepsNavBar({
  onBack,
  onNext,
  canContinue = true,
  isSubmitting = false,
  onSkip,
  continueLabel = "Continue",
  continueType = "button",
}) {
  const shouldShowContinue = onNext || continueType === "submit";

  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-900 px-6 py-4">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            Back
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            Skip
          </button>
        )}
        {shouldShowContinue && (
          <button
            type={continueType}
            onClick={onNext}
            disabled={!canContinue || isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isSubmitting ? "Saving..." : continueLabel}
          </button>
        )}
      </div>
    </div>
  );
}
