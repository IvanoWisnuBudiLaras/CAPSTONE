"use client";

import React from 'react';
import ProgressBar from './BudgetProgressBar';

const BudgetItem = ({ budget, onEdit, onDelete }) => {
  const percentage = Math.round((budget.used / budget.limit) * 100);
  const remaining = budget.limit - budget.used;
  
  const getStatusColor = () => {
    if (percentage < 50) return '#00bfa5';
    if (percentage < 80) return '#ffc107';
    return '#ff5252';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="relative bg-[#fafbfc] rounded-2xl p-6 border-2 border-[#e8eaed] hover:border-[#00bfa5] hover:shadow-lg transition-all duration-300 mb-5 overflow-hidden group">
      {/* Indicator Strip */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: getStatusColor() }}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 pl-2">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2"
            style={{ 
              backgroundColor: `${budget.color}20`,
              borderColor: budget.color
            }}
          >
            {budget.icon}
          </div>
          
          <div>
            <h3 className="text-base font-bold text-[#2c3e50] mb-1">
              {budget.category}
            </h3>
            <p className="text-[13px] text-gray-500">
              {new Date(budget.month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(budget)}
            className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white hover:border-[#00bfa5] hover:text-[#00bfa5] transition-colors flex items-center justify-center"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(budget.id)}
            className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4 pl-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] text-gray-500 font-medium">Progress</span>
          <span 
            className="text-sm font-bold"
            style={{ color: getStatusColor() }}
          >
            {percentage}%
          </span>
        </div>
        <ProgressBar percentage={percentage} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 pl-2">
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Limit</p>
          <p className="text-sm font-bold text-[#2c3e50]">{formatCurrency(budget.limit)}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Terpakai</p>
          <p className="text-sm font-bold text-red-500">{formatCurrency(budget.used)}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Sisa</p>
          <p className={`text-sm font-bold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>

      {/* Warning jika over budget */}
      {percentage >= 100 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-700 text-[13px] font-semibold">
          <span>⚠️</span>
          Budget telah melebihi limit!
        </div>
      )}
    </div>
  );
};

export default BudgetItem;