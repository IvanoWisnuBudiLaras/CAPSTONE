"use client";

import React, { useState, useEffect } from 'react';
import { categories } from '@/data/dummyBudget';

const BudgetForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    month: new Date().toISOString().slice(0, 7)
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        limit: initialData.limit,
        month: initialData.month
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(c => c.name === formData.category);
    
    onSubmit({
      ...formData,
      limit: Number(formData.limit),
      icon: selectedCategory?.icon || '📦',
      color: selectedCategory?.color || '#b2bec3'
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-[slideUp_0.3s_ease]">
        <style jsx>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">
          {initialData ? 'Edit Budget' : 'Tambah Budget Baru'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Atur limit pengeluaran per kategori untuk bulan ini
        </p>

        <form onSubmit={handleSubmit}>
          {/* Category Select */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Kategori
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00bfa5] outline-none transition-colors bg-white"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Limit Input */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Limit Nominal (Rp)
            </label>
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Contoh: 2000000"
              required
              min="0"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00bfa5] outline-none transition-colors"
            />
          </div>

          {/* Month Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Bulan
            </label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00bfa5] outline-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:text-gray-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#00bfa5] text-white font-semibold hover:bg-[#00a896] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#00bfa5]/30"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambah Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;