import { useEffect, useState } from "react";

const STORAGE_KEY = "the-first-step:onboarding-draft";

export const defaultOnboardingDraft = {
  account: {
    fullName: "",
    email: "",
  },
  profile: {
    preferredName: "",
    location: "",
    currentRole: "",
    experienceLevel: "",
    availability: "",
    interests: [],
    portfolioLink: "",
    bio: "",
  },
  survey: {
    goals: [],
    confidenceLevel: "",
    interestedIndustries: [],
    experienceLevel: [],
  },
  track: "",
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function mergeDraft(savedDraft) {
  return {
    ...defaultOnboardingDraft,
    ...savedDraft,
    account: {
      ...defaultOnboardingDraft.account,
      ...savedDraft?.account,
    },
    profile: {
      ...defaultOnboardingDraft.profile,
      ...savedDraft?.profile,
    },
    survey: {
      ...defaultOnboardingDraft.survey,
      ...savedDraft?.survey,
    },
  };
}

export function loadOnboardingDraft() {
  if (!canUseLocalStorage()) {
    return defaultOnboardingDraft;
  }

  try {
    const storedDraft = window.localStorage.getItem(STORAGE_KEY);

    if (!storedDraft) {
      return defaultOnboardingDraft;
    }

    return mergeDraft(JSON.parse(storedDraft));
  } catch (error) {
    console.warn("Unable to load onboarding draft", error);
    return defaultOnboardingDraft;
  }
}

export function saveOnboardingDraft(nextDraft) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeDraft(nextDraft)));
  } catch (error) {
    console.warn("Unable to save onboarding draft", error);
  }
}

export function updateOnboardingDraftSection(section, value) {
  const currentDraft = loadOnboardingDraft();
  const nextDraft = {
    ...currentDraft,
    [section]: value,
  };

  saveOnboardingDraft(nextDraft);
}

export function clearOnboardingDraft() {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear onboarding draft", error);
  }
}

export function useOnboardingDraftSection(section) {
  const [sectionValue, setSectionValue] = useState(
    () => loadOnboardingDraft()[section]
  );

  useEffect(() => {
    updateOnboardingDraftSection(section, sectionValue);
  }, [section, sectionValue]);

  return [sectionValue, setSectionValue];
}
