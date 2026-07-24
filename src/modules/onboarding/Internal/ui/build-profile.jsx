import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";
import SearchableMultiSelect from "./component-searchableMultiSelect.jsx";
import StepsNavBar from "./component-stepNavigationBar.jsx";

const interestOptions = [
  "Technology",
  "Community",
  "Education",
  "Environment",
  "Arts",
  "Health",
];

export default function BuildProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    preferredName: "",
    location: "",
    currentRole: "",
    experienceLevel: "",
    availability: "",
    portfolioLink: "",
    bio: "",
  });

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile Submitted:", {
      ...formData,
      interests: selectedInterests,
    });
    navigate("/onboarding-process/build-profile/survey");
  };

  return (
    <MultiStepFormWrapper
      currentStep={2}
      title="Build your profile"
      description="Tell us what you are interested in so project matches feel useful from the start."
    >
      <div className="w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
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
                value={formData.preferredName}
                onChange={handleInputChange}
                placeholder="Samantha"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

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
                value={formData.location}
                onChange={handleInputChange}
                placeholder="San Jose, CA"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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
                value={formData.currentRole}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Choose one</option>
                <option value="high-school">High school student</option>
                <option value="college">College student</option>
                <option value="career-switcher">Career switcher</option>
                <option value="early-career">Early career</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="experienceLevel"
                className="text-sm font-medium text-slate-300"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Choose one</option>
                <option value="new">New to projects</option>
                <option value="some">Some project experience</option>
                <option value="comfortable">Comfortable joining teams</option>
              </select>
            </div>
          </div>

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
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose one</option>
              <option value="1-3">1-3 hours per week</option>
              <option value="4-6">4-6 hours per week</option>
              <option value="7-plus">7+ hours per week</option>
            </select>
          </div>

          <SearchableMultiSelect
            label="Interests"
            options={interestOptions}
            selectedValues={selectedInterests}
            onChange={setSelectedInterests}
            placeholder="Search interests or add your own"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="portfolioLink"
              className="text-sm font-medium text-slate-300"
            >
              Portfolio or LinkedIn
            </label>
            <input
              id="portfolioLink"
              type="url"
              name="portfolioLink"
              value={formData.portfolioLink}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourname"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium text-slate-300">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Share what you want to learn, build, or contribute."
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <StepsNavBar
            onBack={() => navigate("/onboarding-process")}
            continueLabel="Save Profile"
            continueType="submit"
          />
        </form>
      </div>
    </MultiStepFormWrapper>
  );
}
