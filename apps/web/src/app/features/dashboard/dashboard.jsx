// app/page.tsx
import { Wallet, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import SummaryCard from './SummaryCard';
import ExpenseChart from './ExpenseChart';
import RecentTransactions from './RecentTransactions';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8">

        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Selamat datang kembali, mari kelola keuanganmu.</p>
          </div>
          <button className="bg-[#db0804] hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg shadow-red-200">
            <Plus size={18} /> Tambah Transaksi
          </button>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Saldo" amount={15750000} icon={Wallet} type="balance" />
          <SummaryCard title="Pemasukan (Bulan Ini)" amount={10500000} icon={ArrowUpRight} type="income" />
          <SummaryCard title="Pengeluaran (Bulan Ini)" amount={4250000} icon={ArrowDownRight} type="expense" />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExpenseChart />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
}