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

function UserIcon() {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
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

export default function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    // Simpan data user ke context
    // Ganti dengan API call ke backend jika sudah ada
    login({
      username: form.username,
      email: form.email,
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
        SIGN UP
      </h1>

      {/* Error */}
      {error && (
        <div className="bg-red/10 border border-red text-red text-sm font-semibold rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Username */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <UserIcon />
          </span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            placeholder="Username"
            aria-label="Username"
            className="w-full border-2 border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

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
            autoComplete="new-password"
            placeholder="Password"
            aria-label="Password"
            className="w-full border-2 border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

        {/* Konfirmasi Password */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <LockIcon />
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Konfirmasi Password"
            aria-label="Konfirmasi Password"
            className="w-full border-2 border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-teal text-white font-bebas text-lg tracking-widest py-2.5 rounded-full hover:bg-teal-dark transition-colors shadow-md mt-1"
        >
          SIGN UP
        </button>

        {/* Login Link */}
        <p className="text-center text-sm font-semibold text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-teal font-bold hover:text-teal-dark">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
