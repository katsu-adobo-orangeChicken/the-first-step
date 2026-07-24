import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepFormWrapper from "./component-multiStepFormWrapper.jsx";
import StepsNavBar from "./component-stepNavigationBar.jsx";

export default function CreateAccount() {
  const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);
    navigate("/onboarding-process/build-profile");
  };

  return (
    <MultiStepFormWrapper
      currentStep={1}
      title="Create your account"
      description="Let's get started on setting up your personalized profile."
    >
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-slate-300">
                Confirm Password
            </label>
            <input 
                id="confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                required
            />

          </div>

          <StepsNavBar
            continueLabel="Create Account"
            continueType="submit"
          />
        </form>
      </div>
    </MultiStepFormWrapper>
  );
}
