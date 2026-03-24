// components/dashboard/RecentTransactions.tsx
"use client";

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

// Data placeholder untuk tampilan UI
const placeholderTransactions = [
  { id: 1, title: 'Gaji Bulanan', date: '2023-10-25', amount: 8000000, type: 'income' },
  { id: 2, title: 'Belanja Bulanan', date: '2023-10-24', amount: 1500000, type: 'expense' },
  { id: 3, title: 'Netflix Subscription', date: '2023-10-22', amount: 186000, type: 'expense' },
  { id: 4, title: 'Freelance Project', date: '2023-10-20', amount: 2500000, type: 'income' },
  { id: 5, title: 'Bensin Motor', date: '2023-10-18', amount: 50000, type: 'expense' },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Transaksi Terakhir</h3>
        <a href="#" className="text-sm text-red-600 hover:underline font-medium">Lihat Semua</a>
      </div>

      <div className="space-y-4">
        {placeholderTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{tx.title}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
              {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}