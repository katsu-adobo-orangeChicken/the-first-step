import { useNavigate } from "react-router-dom";
import { useOnboardingDraftSection } from "../data/onboarding-persistence.js";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";
import MultiSelect from "./component-multiSelect.jsx";
import SearchableMultiSelect from "./component-searchableMultiSelect.jsx";
import StepsNavBar from "./component-stepNavigationBar.jsx";

const learningGoals = [
  "Build a portfolio project",
  "Learn how teams work",
  "Try a new career path",
  "Find volunteer experience",
];

const industryList = [
  "Technology",
  "Healthcare",
  "Biotech",
  "Education",
  "Finance",
  "Entertainment"
];

const experienceList = [
  "None",
  "Beginner",
  "Intermediate",
  "Advanced"
];

export default function OnboardingSurvey() {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useOnboardingDraftSection("survey");

  const updateSurveyField = (field, value) => {
    setSurveyData((prevSurveyData) => ({
      ...prevSurveyData,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Survey Submitted:", surveyData);
    navigate("/onboarding-process/build-profile/survey/track");
  };

  return (
    <MultiStepFormWrapper
      currentStep={3}
      title="Tell us what you want from your first project"
      description="A few quick answers help us recommend a track that feels realistic."
    >
      <div className="w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <SearchableMultiSelect
            label="What are your main goals?"
            options={learningGoals}
            selectedValues={surveyData.goals}
            onChange={(goals) => updateSurveyField("goals", goals)}
            allowCustom={false}
            placeholder="Search goals"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confidenceLevel"
              className="text-sm font-medium text-slate-300"
            >
              How confident do you feel joining a project today?
            </label>
            <select
              id="confidenceLevel"
              name="confidenceLevel"
              value={surveyData.confidenceLevel}
              onChange={(event) =>
                updateSurveyField("confidenceLevel", event.target.value)
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose one</option>
              <option value="new">I need clear guidance</option>
              <option value="some">I can help with defined tasks</option>
              <option value="ready">I am ready to jump in</option>
            </select>


          </div>

          <SearchableMultiSelect 
            label="What are your industries of interest?"
            options={industryList}
            selectedValues={surveyData.interestedIndustries}
            onChange={(interestedIndustries) =>
              updateSurveyField("interestedIndustries", interestedIndustries)
            }
            allowCustom={false}
            placeholder="Filter industries"
          

          />

          <MultiSelect 
            label="What is your experience level?"
            options={experienceList}
            selectedValues={surveyData.experienceLevel}
            onChange={(experienceLevel) =>
              updateSurveyField("experienceLevel", experienceLevel)
            }
          

          />

          <StepsNavBar
            onBack={() => navigate("/onboarding-process/build-profile")}
            onSkip={() => navigate("/onboarding-process/build-profile/survey/track")}
            continueType="submit"
          />
        </form>
      </div>
    </MultiStepFormWrapper>
  );
}
