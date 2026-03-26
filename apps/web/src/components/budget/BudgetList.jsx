"use client";

import React from 'react';
import BudgetItem from './BudgetItem';

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">
          Belum ada budget
        </h3>
        <p className="text-sm">
          Mulai atur budget pengeluaran Anda untuk bulan ini
        </p>
      </div>
    );
  }

  return (
    <div>
      {budgets.map((budget) => (
        <BudgetItem 
          key={budget.id} 
          budget={budget} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BudgetList;