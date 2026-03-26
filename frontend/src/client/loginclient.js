"use client";

import Image from "next/image";
import { Mail, User, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { profileService } from "@/services";

// --- Komponen TextField tetap sama ---
const TextField = ({ label, value, onChange, type = "text", className = "", icon: Icon, showPasswordToggle = false, onKeyDown }) => {
  const [show, setShow] = useState(false);
  const inputType = type === "password" && show ? "text" : type;
  return (
    <div className={`relative flex items-center ${className}`}>
      {Icon && <div className="absolute left-4 text-black"><Icon size={20} /></div>}
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={label.toUpperCase()}
        className={`w-full py-4 ${Icon ? "pl-12" : "px-6"} pr-12 border-2 border-black rounded-full text-black placeholder:text-gray-400 focus:outline-none font-Inter text-l tracking-widest`}
      />
      {showPasswordToggle && (
        <button type="button" onClick={() => setShow(!show)} className="absolute right-4 text-black hover:text-gray-600">
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleToggle = () => {
    setIsSignInMode(prev => !prev);
    setEmail("");
    setPassword("");
    setFullName("");
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    if (isSignInMode) {
      // ── LOGIN ──────────────────────────────────────────────
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");

    } else {
      // ── REGISTER ───────────────────────────────────────────
      if (!fullName) {
        setError("Nama lengkap wajib diisi.");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }  // dikirim ke raw_user_meta_data
        }
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="flex flex-row min-h-screen w-full bg-white overflow-hidden">
      {/* KIRI: Gambar */}
      <div className="relative hidden md:block md:w-full h-screen p-4">
        <Image
          src="/img.jpg"
          alt="Illustration"
          fill
          className="object-cover rounded-4xl"
          priority
        />
      </div>

      {/* KANAN: Form Section */}
      <section className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 md:p-20 bg-white">
        <div className="w-full max-w-sm flex flex-col gap-5 text-center">
          <h1 className="font-bebas text-[100px] md:text-[120px] leading-none mb-4">
            {isSignInMode ? "Sign In" : "Sign Up"}
          </h1>

          {/* Field nama — hanya muncul saat Sign Up */}
          {!isSignInMode && (
            <TextField
              label="Nama Lengkap"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}

          <TextField
            label="Email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <TextField
            label="Password"
            icon={User}
            type="password"
            showPasswordToggle={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Error message */}
          {error && (
            <p className="text-red-500 font-bebas text-lg tracking-wide -mt-2">
              {error}
            </p>
          )}

          <button
            className="bg-[#00BFA6] text-white font-bebas text-2xl py-3 rounded-full hover:bg-[#019783] transition-all uppercase tracking-widest shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : isSignInMode ? "Sign In" : "Sign Up"}
          </button>

          <div className="relative flex items-center justify-center">
            <span className="font-bebas text-xl bg-white px-4 z-10">OR</span>
            <div className="absolute w-full h-px bg-gray-200"></div>
          </div>

          <button className="flex items-center justify-center gap-3 border-2 border-black py-3 rounded-full font-bebas text-2xl uppercase tracking-widest hover:bg-gray-50 transition-colors active:scale-95">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
            </div>
            Sign in Google
          </button>

          <p className="font-bebas text-lg mt-2">
            {isSignInMode ? "NOT HAVE A ACCOUNT ? " : "HAVE A ACCOUNT ? "}
            <span className="text-[#007BFF] cursor-pointer hover:underline" onClick={handleToggle}>
              {isSignInMode ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}