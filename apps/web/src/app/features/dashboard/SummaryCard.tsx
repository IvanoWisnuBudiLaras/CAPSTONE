// components/dashboard/SummaryCard.tsx
import { LucideIcon } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  type: 'balance' | 'income' | 'expense';
}

export default function SummaryCard({ title, amount, icon: Icon, type }: SummaryCardProps) {
  const styles = {
    balance: 'bg-blue-50 text-blue-600',
    income: 'bg-green-50 text-green-600',
    expense: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {formatRupiah(amount)}
          </h3>
        </div>
        <div className={`p-3 rounded-lg ${styles[type]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}