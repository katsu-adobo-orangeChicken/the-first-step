import { useNavigate } from "react-router-dom";
import { useOnboardingDraftSection } from "../data/onboarding-persistence.js";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";
import StepsNavBar from "./component-stepNavigationBar.jsx";

export default function BuildProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useOnboardingDraftSection("profile");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Profile Submitted:", formData);

    navigate("/onboarding-process/build-profile/survey");
  };

  return (
    <MultiStepFormWrapper
      title="Build your profile"
      description="Tell us a little about yourself so we can find projects that fit you."
      currentStep={2}
    >
      <div className="mx-auto w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          {/* ABOUT YOU */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                About you
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Start with the basics.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Preferred Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="preferredName"
                  className="text-sm font-medium text-slate-300"
                >
                  Preferred Name
                </label>

                <input
                  id="preferredName"
                  type="text"
                  name="preferredName"
                  value={formData.preferredName ?? ""}
                  onChange={handleInputChange}
                  placeholder="Samantha"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-slate-300"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location ?? ""}
                  onChange={handleInputChange}
                  placeholder="San Jose, CA"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Current Role */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="currentRole"
                  className="text-sm font-medium text-slate-300"
                >
                  Current Role
                </label>

                <select
                  id="currentRole"
                  name="currentRole"
                  value={formData.currentRole ?? ""}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Choose one</option>
                  <option value="high-school">
                    High school student
                  </option>
                  <option value="college">
                    College student
                  </option>
                  <option value="career-switcher">
                    Career switcher
                  </option>
                  <option value="early-career">
                    Early career
                  </option>
                </select>
              </div>

              {/* Weekly Availability */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="availability"
                  className="text-sm font-medium text-slate-300"
                >
                  Weekly Availability
                </label>

                <select
                  id="availability"
                  name="availability"
                  value={formData.availability ?? ""}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Choose one</option>
                  <option value="1-3">
                    1–3 hours per week
                  </option>
                  <option value="4-6">
                    4–6 hours per week
                  </option>
                  <option value="7-plus">
                    7+ hours per week
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="my-8 border-t border-slate-800" />

          {/* YOUR STORY */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Your story
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Give project teams a little more context about you.
              </p>
            </div>

            <div className="space-y-5">
              {/* Portfolio / LinkedIn */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="portfolioLink"
                    className="text-sm font-medium text-slate-300"
                  >
                    Portfolio or LinkedIn
                  </label>

                  <span className="text-xs text-slate-500">
                    Optional
                  </span>
                </div>

                <input
                  id="portfolioLink"
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink ?? ""}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium text-slate-300"
                  >
                    Short Bio
                  </label>

                  <span className="text-xs text-slate-500">
                    {(formData.bio ?? "").length} / 200
                  </span>
                </div>

                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio ?? ""}
                  onChange={handleInputChange}
                  placeholder="What do you want to learn, build, or contribute?"
                  rows={4}
                  maxLength={200}
                  className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="mt-8 border-t border-slate-800 pt-6">
            <StepsNavBar
              onBack={() =>
                navigate("/onboarding-process")
              }
              continueLabel="Continue"
              continueType="submit"
            />
          </div>
        </form>
      </div>
    </MultiStepFormWrapper>
  );
}