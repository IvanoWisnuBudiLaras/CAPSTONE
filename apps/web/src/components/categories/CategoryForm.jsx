"use client";

import React, { useState, useEffect } from 'react';
import { categoryTypes, typeLabels } from '@/data/dummyCategories';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

const CategoryForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: categoryTypes.ALLOCATION,
    color: '#00bfa5',
    icon: '📦'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        color: initialData.color,
        icon: initialData.icon
      });
    }
  }, [initialData]);

  const typeInfo = typeLabels[formData.type] || typeLabels[categoryTypes.ALLOCATION];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-[slideUp_0.3s_ease] max-h-[90vh] overflow-y-auto">
        <style jsx>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">
          {initialData ? 'Edit Kategori' : 'Tambah Kategori Baru'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {initialData ? 'Ubah detail kategori yang sudah ada' : 'Buat kategori transaksi baru'}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nama Kategori */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Contoh: Makanan"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00bfa5] outline-none transition-colors"
            />
          </div>

          {/* Tipe Alokasi */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Tipe Alokasi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(categoryTypes).map(([key, value]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange('type', value)}
                  className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    formData.type === value
                      ? `border-transparent text-white`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                  style={{
                    backgroundColor: formData.type === value ? typeLabels[value].color : 'white'
                  }}
                >
                  {typeLabels[value].label}
                </button>
              ))}
            </div>
          </div>

          {/* Pilih Warna */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Pilih Warna
            </label>
            <ColorPicker 
              selectedColor={formData.color} 
              onChange={(color) => handleChange('color', color)} 
            />
          </div>

          {/* Pilih Icon */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Pilih Icon
            </label>
            <IconPicker 
              selectedIcon={formData.icon} 
              onChange={(icon) => handleChange('icon', icon)} 
            />
          </div>

          {/* Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Preview</p>
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${formData.color}20`, border: `2px solid ${formData.color}` }}
              >
                {formData.icon}
              </div>
              <div>
                <p className="font-bold text-[#2c3e50]">{formData.name || 'Nama Kategori'}</p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mt-1"
                  style={{ backgroundColor: typeLabels[formData.type].color }}
                >
                  {typeLabels[formData.type].label}
                </span>
              </div>
            </div>
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
              {initialData ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;