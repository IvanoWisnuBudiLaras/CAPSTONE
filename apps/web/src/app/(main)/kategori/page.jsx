"use client";

import React, { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { categoryTypes } from '@/data/dummyCategories';
import CategoryStats from '@/components/categories/CategoryStats';
import CategoryList from '@/components/categories/CategoryList';
import CategoryForm from '@/components/categories/CategoryForm';

const KategoriPage = () => {
  const { 
    categories, 
    loading, 
    addCategory, 
    updateCategory, 
    deleteCategory 
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // ✅ Sanitasi sekali, pakai di semua tempat
  const safeCategories = (categories || []).filter(Boolean);

  const handleEdit = (category) => {
    if (!category) return;
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleSubmit = (formData) => {
    if (!formData) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
  };

  const getFilteredCategories = () => {
    if (activeTab === 'all') return safeCategories;

    if (activeTab === 'default') {
      return safeCategories.filter(c => c.isDefault);
    }

    if (activeTab === 'custom') {
      return safeCategories.filter(c => !c.isDefault);
    }

    return safeCategories.filter(c => c.type === activeTab);
  };

  const tabs = [
    { id: 'all', label: 'Semua', count: safeCategories.length },
    { id: 'default', label: 'Default', count: safeCategories.filter(c => c.isDefault).length },
    { id: 'custom', label: 'Custom', count: safeCategories.filter(c => !c.isDefault).length },
    { id: categoryTypes.ALLOCATION, label: 'Alokasi', count: safeCategories.filter(c => c.type === categoryTypes.ALLOCATION).length },
    { id: categoryTypes.INCOME, label: 'Pemasukan', count: safeCategories.filter(c => c.type === categoryTypes.INCOME).length },
    { id: categoryTypes.EXPENSE, label: 'Pengeluaran', count: safeCategories.filter(c => c.type === categoryTypes.EXPENSE).length },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#00bfa5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat kategori...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Kategori</h1>
          <p className="text-gray-500 text-sm">Kelola kategori transaksi Anda</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#00bfa5] text-white px-6 py-3 rounded-full"
        >
          + Tambah Kategori
        </button>
      </div>

      <CategoryStats categories={safeCategories} />

      {/* Tabs */}
      <div className="mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="mr-2"
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <CategoryList 
        categories={getFilteredCategories()} 
        onEdit={handleEdit}
        onDelete={deleteCategory}
      />

      {showForm && (
        <CategoryForm 
          onSubmit={handleSubmit}
          onClose={handleClose}
          initialData={editingCategory}
        />
      )}
    </div>
  );
};

export default KategoriPage;