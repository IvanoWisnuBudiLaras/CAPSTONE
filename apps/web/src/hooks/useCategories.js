"use client";

import { useState, useEffect, useCallback } from 'react';
import { dummyCategories, categoryTypes } from '@/data/dummyCategories';

// ✅ Validator biar data selalu bersih
const isValidCategory = (c) => {
  return c && c.id && c.name && c.type;
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories((dummyCategories || []).filter(isValidCategory));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addCategory = useCallback((newCategory) => {
    if (!newCategory) return;

    const category = {
      id: Date.now(),
      type: newCategory.type || categoryTypes.ALLOCATION,
      name: newCategory.name || 'Unnamed',
      icon: newCategory.icon || '📦',
      color: newCategory.color || '#ccc',
      isDefault: false
    };

    setCategories(prev => [
      ...prev.filter(isValidCategory),
      category
    ]);
  }, []);

  const updateCategory = useCallback((id, updates) => {
    if (!id || !updates) return;

    setCategories(prev =>
      prev
        .filter(isValidCategory)
        .map(c => c.id === id ? { ...c, ...updates } : c)
    );
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories(prev => {
      const safe = prev.filter(isValidCategory);
      const category = safe.find(c => c.id === id);

      if (category?.isDefault) {
        alert('Kategori default tidak dapat dihapus!');
        return safe;
      }

      if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
        return safe.filter(c => c.id !== id);
      }

      return safe;
    });
  }, []);

  const getCategoriesByType = useCallback((type) => {
    return categories
      .filter(isValidCategory)
      .filter(c => c.type === type);
  }, [categories]);

  return {
    categories: categories.filter(isValidCategory),
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByType,
    categoryTypes
  };
};