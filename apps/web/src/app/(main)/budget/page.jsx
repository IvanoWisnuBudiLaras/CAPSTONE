"use client";

import React, { useState } from 'react';
import { useBudget } from '@/hooks/useBudget';
import BudgetSummary from '@/components/budget/BudgetSummary';
import BudgetList from '@/components/budget/BudgetList';
import BudgetForm from '@/components/budget/BudgetForm';

const BudgetPage = () => {
  const { 
    budgets, 
    loading, 
    addBudget, 
    updateBudget, 
    deleteBudget, 
    calculateSummary 
  } = useBudget();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const summary = calculateSummary();

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  const handleSubmit = (formData) => {
    if (editingBudget) {
      updateBudget(editingBudget.id, formData);
    } else {
      addBudget(formData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus budget ini?')) {
      deleteBudget(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#00bfa5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50] mb-1">Budget</h1>
          <p className="text-gray-500 text-sm">
            Kelola dan pantau batas pengeluaran per kategori
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#00bfa5] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00a896] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#00bfa5]/30"
        >
          <span className="text-xl">+</span>
          Set Budget
        </button>
      </div>

      {/* Summary Cards */}
      <BudgetSummary summary={summary} />

      {/* Budget List Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-bold text-[#2c3e50] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00bfa5] rounded-full" />
            Budget Bulan Ini
          </h2>
          
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600">
            <span>📅</span>
            {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        <BudgetList 
          budgets={budgets} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Form */}
      {showForm && (
        <BudgetForm 
          onSubmit={handleSubmit}
          onClose={handleClose}
          initialData={editingBudget}
        />
      )}
    </div>
  );
};

export default BudgetPage;