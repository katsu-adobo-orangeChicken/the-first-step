import OnboardingSteps from "./component-stepIndicator.jsx";
import SectionHeader from "./component-sectionHeader.jsx";

export default function MultiStepFormWrapper({
  currentStep,
  title,
  description,
  children,
  contentWidth = "max-w-2xl",
}) {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col items-center gap-8 bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className={`flex w-full ${contentWidth} flex-col gap-6`}>
        <SectionHeader title={title} description={description} />
        <OnboardingSteps currentStep={currentStep} />
      </div>

      {children}
    </section>
  );
}
