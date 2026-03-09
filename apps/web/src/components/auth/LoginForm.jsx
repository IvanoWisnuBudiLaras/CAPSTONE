import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const COPY = {
  title: "LOGIN",
  emailPlaceholder: "Email",
  passwordPlaceholder: "Password",
  loginButton: "LOGIN",
  divider: "OR",
  googleButton: "Sign in with Google",
  signupPrompt: "Not have an account?",
  signupAction: "Sign Up",
};

export default function LoginForm() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-4xl font-bold text-center mb-8">
        {COPY.title}
      </h1>

      <form className="space-y-4">
        <AuthInput
          type="email"
          name="email"
          autoComplete="email"
          placeholder={COPY.emailPlaceholder}
          aria-label="Email"
        />

        <AuthInput
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder={COPY.passwordPlaceholder}
          aria-label="Password"
        />

        <AuthButton>{COPY.loginButton}</AuthButton>

        <p className="text-center text-gray-400 text-sm">
          {COPY.divider}
        </p>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition"
        >
          {COPY.googleButton}
        </button>

        <p className="text-center text-sm text-gray-500">
          {COPY.signupPrompt}{" "}
          <span className="text-sky-500 cursor-pointer font-medium">
            {COPY.signupAction}
          </span>
        </p>
      </form>
    </div>
  );
}
