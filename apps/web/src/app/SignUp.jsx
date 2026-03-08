"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 

const SignUp = () => {
  // 1. Buat state untuk masing-masing field password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return ( 
    // containeer 

    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
       <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <div className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl w-full border border-gray-100">
        
        {/* Sisi Kiri: Gambar dengan teknik Background agar tidak peyot */}
        <div 
          className="md:w-1/2 min-h-[300px] md:min-h-[500px] bg-cover bg-center rounded-br-[80px]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop')" }}
        >
          {/* Ganti URL di atas dengan path gambar lokalmu misal: '/saving.jpg' */}
        </div>

        {/* Sisi Kanan: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-black text-center mb-10 text-gray-800 tracking-tighter">SIGN UP</h2>
          
          <form className="space-y-5">
            <div className="relative " >
              <Mail className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="email" placeholder="EMAIL" className="transform transition-transform duration-300 focus:translate-y-[-3px] w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm text-black" />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="PASSWORD" className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm text-black" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="CONFIRM PASSWORD" className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm text-black" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-all shadow-lg shadow-blue-100 mt-4">
              LOGIN
            </button>
          </form>

          <p className="text-center text-[10px] mt-8 text-gray-500 font-semibold tracking-widest">
            ALREADY HAVE AN ACCOUNT? <span className="text-blue-600 cursor-pointer hover:underline">SIGN IN</span>
          </p>
        </div>
      </div>
    </div>
 
  );
};

export default SignUp;