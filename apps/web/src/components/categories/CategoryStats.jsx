"use client";

import React from 'react';
import { categoryTypes, typeLabels } from '@/data/dummyCategories';

const CategoryStats = ({ categories }) => {
  const stats = {
    total: categories.length,
    default: categories.filter(c => c.isDefault).length,
    custom: categories.filter(c => !c.isDefault).length,
    byType: {
      [categoryTypes.ALLOCATION]: categories.filter(c => c.type === categoryTypes.ALLOCATION).length,
      [categoryTypes.INCOME]: categories.filter(c => c.type === categoryTypes.INCOME).length,
      [categoryTypes.EXPENSE]: categories.filter(c => c.type === categoryTypes.EXPENSE).length,
    }
  };

  const cards = [
    { title: 'Total Kategori', value: stats.total, icon: '📁', color: '#00bfa5' },
    { title: 'Kategori Default', value: stats.default, icon: '🔒', color: '#f9ca24' },
    { title: 'Kategori Custom', value: stats.custom, icon: '✨', color: '#6c5ce7' },
  ];

  return (
    <div className="mb-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border-2 hover:-translate-y-1 transition-transform duration-300"
            style={{ borderColor: `${card.color}20` }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${card.color}15` }}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-[#2c3e50]">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Type Distribution */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-600 mb-4">Distribusi per Tipe</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryTypes).map(([key, value]) => (
            <div 
              key={value}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: typeLabels[value].color }}
              />
              <span className="text-sm font-medium text-gray-600">
                {typeLabels[value].label}
              </span>
              <span className="text-sm font-bold text-[#2c3e50] ml-1">
                {stats.byType[value]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;