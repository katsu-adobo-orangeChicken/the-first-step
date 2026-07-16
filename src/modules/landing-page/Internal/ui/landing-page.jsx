export default function LandingPage() {
  return (
    <section className="-m-8 bg-slate-50 text-slate-950">
      {/* Top container which contains the images as well as the bio summary of what the website offers and the sign up button. As well as an example picture for the web app */}
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* I want a background image here */}
        <div className="mx-auto grid min-h-136 w-full max-w-8xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="flex min-h-80 flex-col justify-center gap-6 border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            {/* Add headline, bio summary, and sign-up button here. */}
          </div>

          <div className="grid min-h-80 place-items-center bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="h-full min-h-72 w-full rounded-xl border border-dashed border-slate-300 bg-white/70 shadow-inner">
              {/* Add landing/app preview image or visual component here. */}
            </div>
          </div>
        </div>
      </div>

      {/* Middle container which shows a linear workflow for the site, showing how quick and easy it is from making an account, setting up your profile, onboarding survey, reccomended projects based on the survey, join or start a project, and work on it and finish it to put on your resume */}
      <div className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {/* Add workflow steps here. */}
            Hello
          </div>
        </div>
      </div>

      {/* Bottom container, this would just be socials as well as maybe company logos like FAANG emphasizing that this is a great opportunity to jumpstart your chance to go to these tech companies. Basically emphasizing that we are building skills that are relevant towards these companies */}
      <div className="bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-h-24 rounded-xl border border-slate-700 bg-slate-800/70">
            {/* Add social links or footer copy here. */}
            Put Linke
          </div>

          <div className="grid min-h-24 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Add company logos or credibility badges here. */}
            Example
          </div>
        </div>
      </div>
    </section>
  );
}
