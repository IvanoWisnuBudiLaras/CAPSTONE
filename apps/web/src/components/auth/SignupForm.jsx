import Link from "next/link";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { EmailIcon, GoogleIcon } from "./AuthIcons";

const COPY = {
  title: "SIGN UP",
  emailPlaceholder: "Email",
  passwordPlaceholder: "Password",
  confirmPasswordPlaceholder: "Confirm Password",
  signupButton: "SIGN UP",
  divider: "OR",
  googleButton: "Sign up with Google",
  loginPrompt: "Already have an account?",
  loginAction: "Login",
};

export default function SignupForm() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-4xl font-bold text-center mb-8">
        {COPY.title}
      </h1>

      <form className="space-y-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <EmailIcon />
          </span>
          <AuthInput
            type="email"
            name="email"
            autoComplete="email"
            placeholder={COPY.emailPlaceholder}
            aria-label="Email"
            className="pl-11"
          />
        </div>

        <AuthInput
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder={COPY.passwordPlaceholder}
          aria-label="Password"
        />

        <AuthInput
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder={COPY.confirmPasswordPlaceholder}
          aria-label="Confirm Password"
        />

        <AuthButton>{COPY.signupButton}</AuthButton>

        <p className="text-center text-gray-400 text-sm">
          {COPY.divider}
        </p>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition"
        >
          <GoogleIcon />
          {COPY.googleButton}
        </button>

        <p className="text-center text-sm text-gray-500">
          {COPY.loginPrompt}{" "}
          <Link href="/login" className="text-sky-500 font-medium">
            {COPY.loginAction}
          </Link>
        </p>
      </form>
    </div>
  );
}
