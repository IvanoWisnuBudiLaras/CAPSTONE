"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

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

function LockIcon() {
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
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.225 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.147 35.091 26.67 36 24 36c-5.204 0-9.621-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.66 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.793 2.237-2.231 4.166-4.084 5.565l.003-.002 6.191 5.238C36.97 39.212 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    login({
      email: form.email,
      username: form.email.split("@")[0],
    });

    router.push("/dashboard");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">

      {/* Logo */}
      <div className="flex items-center gap-2 justify-center mb-6">
        <img src="/img/logo.png" alt="FinSmart" className="h-10 w-auto object-contain" />
      </div>

      {/* Title */}
      <h1 className="font-bebas text-4xl tracking-widest text-navy text-center mb-6">
        LOGIN
      </h1>

      {/* Error */}
      {error && (
        <div className="bg-red/10 border border-red text-red text-sm font-semibold rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Email */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <EmailIcon />
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full border-2 border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <LockIcon />
          </span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            className="w-full border-2 border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-teal text-white font-bebas text-lg tracking-widest py-2.5 rounded-full hover:bg-teal-dark transition-colors shadow-md"
        >
          LOGIN
        </button>

        {/* Divider */}
        <p className="text-center text-gray-400 text-sm font-semibold">OR</p>

        {/* Google Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 border-2 border-gray-200 py-2.5 rounded-full hover:bg-gray-50 transition-colors text-sm font-bold text-navy"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm font-semibold text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-teal font-bold hover:text-teal-dark">
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  );
}