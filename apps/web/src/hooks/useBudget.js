"use client";

import { useState, useEffect, useCallback } from 'react';
import { dummyBudgets } from '@/data/dummyBudget';

export const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBudgets(dummyBudgets);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const addBudget = useCallback((newBudget) => {
    const budget = {
      id: Date.now(),
      ...newBudget,
      used: 0
    };
    setBudgets(prev => [...prev, budget]);
  }, []);

  const updateBudget = useCallback((id, updates) => {
    setBudgets(prev => prev.map(b => 
      b.id === id ? { ...b, ...updates } : b
    ));
  }, []);

  const deleteBudget = useCallback((id) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  }, []);

  const getProgressColor = (percentage) => {
    if (percentage < 50) return '#00bfa5';
    if (percentage < 80) return '#ffc107';
    return '#ff5252';
  };

  const calculateSummary = useCallback(() => {
    const total = budgets.reduce((acc, b) => acc + b.limit, 0);
    const used = budgets.reduce((acc, b) => acc + b.used, 0);
    const remaining = total - used;
    
    return {
      total,
      used,
      remaining,
      percentage: total > 0 ? Math.round((used / total) * 100) : 0
    };
  }, [budgets]);

  return {
    budgets,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
    getProgressColor,
    calculateSummary
  };
};