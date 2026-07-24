import { useState } from "react";

const interestOptions = [
  "Technology",
  "Community",
  "Education",
  "Environment",
  "Arts",
  "Health",
];

export default function BuildProfile() {
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

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile Submitted:", {
      ...formData,
      interests: selectedInterests,
    });
  };

  return (
    <section className="-m-8 flex min-h-screen flex-col items-center gap-12 bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-2xl flex-col gap-6 text-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Build your profile
          </h2>
          <p className="mt-2 text-slate-400">
            Tell us what you are interested in so project matches feel useful
            from the start.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-400">
            1. Account
          </span>
          <span className="text-slate-600">-&gt;</span>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-blue-500">
            2. Profile
          </span>
          <span className="text-slate-600">-&gt;</span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-500">
            3. Survey
          </span>
          <span className="text-slate-600">-&gt;</span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-500">
            4. Track
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
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

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-300">
              Interests
            </span>
            <div className="grid gap-2 sm:grid-cols-3">
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

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

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </section>
  );
}
