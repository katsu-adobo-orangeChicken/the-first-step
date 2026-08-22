import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth-provider.jsx";

function getFriendlyAuthError(error) {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  if (error.message?.toLowerCase().includes("already registered")) {
    return "An account already exists for this email. Try logging in instead.";
  }

  return error.message || "Unable to create your account right now. Please try again.";
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "All fields are required.";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setConfirmationMessage("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const authData = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (authData?.session) {
        navigate("/onboarding-process/build-profile", { replace: true });
        return;
      }

      setConfirmationMessage(
        "Account created. Check your email to confirm your address, then log in.",
      );
      setFormData((currentFormData) => ({
        ...currentFormData,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setErrorMessage(getFriendlyAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-113px)] items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-blue-400">
            Get started
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign up to save progress and unlock the guided onboarding flow.
          </p>
        </div>

        {errorMessage ? (
          <div className="mb-5 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        ) : null}

        {confirmationMessage ? (
          <div className="mb-5 rounded-lg border border-green-900/60 bg-green-950/40 px-4 py-3 text-sm text-green-200">
            <p>{confirmationMessage}</p>
            <Link to="/auth/login" className="mt-2 inline-flex font-semibold text-green-100 underline">
              Go to login
            </Link>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="signup-full-name" className="text-sm font-medium text-slate-300">
              Full name
            </label>
            <input
              id="signup-full-name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              autoComplete="name"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-email" className="text-sm font-medium text-slate-300">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-password" className="text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-confirm-password" className="text-sm font-medium text-slate-300">
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-blue-400 hover:text-blue-300">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
