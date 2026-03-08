import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export default function LoginForm() {
  return (
    <div className="w-full max-w-sm">

      <h1 className="text-4xl font-bold text-center mb-8">
        LOGIN
      </h1>

      <form className="space-y-4">

        <AuthInput
          type="email"
          placeholder="Email"
        />

        <AuthInput
          type="password"
          placeholder="Password"
        />

        <AuthButton text="LOGIN" />

        <p className="text-center text-gray-400 text-sm">
          OR
        </p>

        <button className="w-full border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition">
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Not have an account?{" "}
          <span className="text-sky-500 cursor-pointer font-medium">
            Sign Up
          </span>
        </p>

      </form>
    </div>
  );
}