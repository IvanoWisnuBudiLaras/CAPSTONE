"use client";

import React from 'react';
import { categoryTypes, typeLabels } from '@/data/dummyCategories';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  if (!category) return null;

  const typeInfo = (typeLabels || {})[category?.type] || { 
    label: 'Unknown', 
    color: '#999999',
    badge: 'bg-gray-400'
  };

  return (
    <div className="relative bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-[#00bfa5] hover:shadow-lg transition-all duration-300 group">
      {/* Default Badge */}
      {category?.isDefault && (
        <div className="absolute -top-2 -right-2 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          DEFAULT
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
          style={{ 
            backgroundColor: `${category?.color || '#ccc'}15`,
            border: `2px solid ${category?.color || '#ccc'}`
          }}
        >
          {category?.icon || '📦'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#2c3e50] truncate mb-1">
            {category?.name || 'Unnamed'}
          </h3>
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: typeInfo.color }}
          >
            {typeInfo.label}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(category)}
            className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white hover:border-[#00bfa5] hover:text-[#00bfa5] transition-colors flex items-center justify-center"
            title="Edit"
          >
            ✏️
          </button>
          
          {!category?.isDefault && (
            <button 
              onClick={() => onDelete(category?.id)}
              className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center"
              title="Hapus"
            >
              🗑️
            </button>
          )}
          
          {category?.isDefault && (
            <div 
              className="w-10 h-10 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-400 flex items-center justify-center cursor-not-allowed"
              title="Kategori default tidak dapat dihapus"
            >
              🔒
            </div>
          )}
        </div>
      </div>

      {/* Color Indicator */}
      <div 
        className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
        style={{ backgroundColor: category?.color || '#ccc' }}
      />
    </div>
  );
};

export default CategoryItem;