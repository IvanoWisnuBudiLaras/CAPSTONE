"use client";

import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onEdit, onDelete, typeFilter = null }) => {
  const filteredCategories = typeFilter 
    ? categories.filter(c => c.type === typeFilter)
    : categories;

  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">
          Belum ada kategori
        </h3>
        <p className="text-sm">
          Tambahkan kategori untuk mulai mengatur transaksi
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCategories.map((category) => (
        <CategoryItem 
          key={category.id} 
          category={category} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryList;