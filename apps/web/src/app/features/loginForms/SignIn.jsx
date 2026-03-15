"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Tambahkan logika autentikasi di sini
  };

  return ( 
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-black">
         <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <div className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl w-full border border-gray-100">
        
        {/* Sisi Kiri: Visual (Sama dengan Sign Up agar konsisten) */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop')" }}
        >
          <div className="w-full h-full bg-black/10 backdrop-blur-[10px] flex items-center justify-center">
             <h1 className="shadow-black-100 text-white/90 text-4xl font-black tracking-tighter drop-shadow-lg">WELCOME BACK</h1>
          </div>
        </div>

        {/* Sisi Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-gray-800 tracking-tighter uppercase">Sign In</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">Please enter your details</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL ADDRESS" 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm hover:border-gray-300" 
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="PASSWORD" 
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm hover:border-gray-300" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-2 text-[11px] font-bold text-gray-500 tracking-tight">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 accent-red-600 w-3 h-3" 
                />
                <span className="group-hover:text-gray-700 transition-colors">REMEMBER ME</span>
              </label>
              <button type="button" className="hover:text-red-600 transition-colors uppercase">
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#db0804] hover:bg-red-700 text-white font-bold py-3 rounded-full transition-all shadow-lg shadow-red-200 mt-4 active:scale-[0.98]"
            >
              LOG IN
            </button>
          </form>

          {/* Link ke Sign Up */}
          <p className="text-center text-[11px] mt-8 text-gray-500 font-bold tracking-widest uppercase">
            Don't have an account? <span className="text-red-600 cursor-pointer hover:underline ml-1"><a href="./UserPage/signup">Sign Up Free</a></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;