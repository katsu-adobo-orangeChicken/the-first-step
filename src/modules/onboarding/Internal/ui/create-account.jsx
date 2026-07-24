import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="-m-8 flex min-h-screen flex-col items-center gap-12 bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
     
      <div className="flex w-full max-w-md flex-col gap-6 text-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-slate-400">
            Let's get started on setting up your personalized profile.
          </p>
        </div>

        {/* Visual Progress Steps */}
        <div className="flex items-center justify-center gap-3 text-sm font-medium">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-blue-500">
            1. Account
          </span>
          <span className="text-slate-600">-&gt;</span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-500">
            2. Survey
          </span>
          <span className="text-slate-600">-&gt;</span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-500">
            3. Track
          </span>
        </div>
      </div>

     
        {/* Main Form */}
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name Input */}
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

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Submit/Continue Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}
