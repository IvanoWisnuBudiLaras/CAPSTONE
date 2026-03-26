"use client";

import React from 'react';

const BudgetSummary = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Budget',
      value: summary.total,
      change: 'Semua kategori',
      color: '#00bfa5',
      icon: '💰',
      textColor: 'text-gray-600'
    },
    {
      title: 'Terpakai',
      value: summary.used,
      change: `${summary.percentage}% dari total`,
      color: '#ff5252',
      icon: '💸',
      textColor: 'text-red-500'
    },
    {
      title: 'Sisa Budget',
      value: summary.remaining,
      change: summary.remaining > 0 ? 'Masih aman' : 'Over budget!',
      color: '#448aff',
      icon: '💎',
      textColor: summary.remaining > 0 ? 'text-green-600' : 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
          style={{ borderColor: `${card.color}20` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold text-[#2c3e50]">
                {formatCurrency(card.value)}
              </h3>
            </div>
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${card.color}15` }}
            >
              {card.icon}
            </div>
          </div>
          
          <p className={`text-sm font-semibold ${card.textColor}`}>
            {card.change}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BudgetSummary;