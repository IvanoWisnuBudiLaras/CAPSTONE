import Link from "next/link";

const COPY = {
  title: "LOGIN",
  emailPlaceholder: "Email",
  passwordPlaceholder: "Password",
  loginButton: "LOGIN",
  divider: "OR",
  googleButton: "Sign in with Google",
  signupPrompt: "Don't have an account?",
  signupAction: "Sign Up",
};

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-5 w-5 shrink-0"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.225 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.17 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.147 35.091 26.67 36 24 36c-5.204 0-9.621-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.66 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.793 2.237-2.231 4.166-4.084 5.565l.003-.002 6.191 5.238C36.97 39.212 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function AuthInput({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
      {...props}
    />
  );
}

function AuthButton({
  children,
  className = "",
  type = "submit",
  ...props
}) {
  return (
    <button
      type={type}
      className={`w-full bg-sky-400 text-white py-2 rounded-full font-medium hover:bg-sky-500 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function LoginForm() {
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
          className="flex w-full items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition"
        >
          <GoogleIcon />
          {COPY.googleButton}
        </button>

        <p className="text-center text-sm text-gray-500">
          {COPY.signupPrompt}{" "}
          <Link href="/signup" className="text-sky-500 font-medium">
            {COPY.signupAction}
          </Link>
        </p>
      </form>
    </div>
  );
}
