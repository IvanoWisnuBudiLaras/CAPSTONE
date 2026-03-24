"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validasi email
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    // Validasi password
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    // Validasi konfirmasi password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Di sini Anda akan memanggil API registrasi
      console.log("Signing up with:", formData);
      
      // Jika berhasil, redirect ke sign in page
      router.push('/UserPage/signin');
      
    } catch (error) {
      setErrors({ general: 'Registrasi gagal. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl w-full border border-gray-100">
        
        {/* Sisi Kiri: Gambar*/}
         <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop')" }}
        >
          <div className="w-full h-full bg-black/10 backdrop-blur-[10px] flex items-center justify-center">
             <h1 className=" shadow-black-100 text-white/90 text-4xl font-black tracking-tighter drop-shadow-lg">WELCOME</h1>
          </div>
        </div>

        {/* Sisi Kanan: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-black text-center mb-10 text-gray-800 tracking-tighter">SIGN UP</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="relative " >
              <Mail className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL" 
                className={` w-full pl-12 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-red-500 outline-none text-sm text-black ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`} 
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="PASSWORD" 
                className={` w-full pl-12 pr-12 py-3 border rounded-full focus:ring-2 focus:ring-red-500 outline-none text-sm text-black ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="CONFIRM PASSWORD" 
                className={` w-full pl-12 pr-12 py-3 border rounded-full focus:ring-2 focus:ring-red-500 outline-none text-sm text-black ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`} 
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#db0804] hover:bg-red-700 disabled:bg-red-300 text-white font-bold py-3 rounded-full transition-all shadow-lg shadow-red-100 mt-4 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  SIGNING UP...
                </>
              ) : (
                'SIGN UP'
              )}
            </button>
          </form>

          <p className="text-center text-[10px] mt-8 text-gray-500 font-semibold tracking-widest">
            ALREADY HAVE AN ACCOUNT? <span className="text-red-600 cursor-pointer hover:underline"><a href="./UserPage/signin">SIGN IN</a></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;