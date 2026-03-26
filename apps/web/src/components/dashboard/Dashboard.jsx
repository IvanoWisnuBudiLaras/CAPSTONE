"use client";
import { useState } from "react";
import SummaryCard from "@/components/dashboard/SummaryCard";
import PieChart from "@/components/dashboard/PieChart";
import ProgressBar from "@/components/dashboard/DashboardProgressBar";
import Insight from "@/components/dashboard/Insight";
import TransaksiForm from "@/components/transaksi/TransaksiForm";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [formTipe, setFormTipe] = useState("income");
  const [transaksi, setTransaksi] = useState([]);

  const handleOpenForm = (tipe) => {
    setFormTipe(tipe);
    setShowForm(true);
  };

  const handleSave = (data) => {
    setTransaksi((prev) => [{ ...data, id: Date.now() }, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-nunito text-navy">

      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard type="pemasukan"   icon="↑" title={"TOTAL\nPEMASUKAN"}   />
          <SummaryCard type="pengeluaran" icon="↓" title={"TOTAL\nPENGELUARAN"} />
          <SummaryCard type="saldo"       icon="💰" title="SALDO"               />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-4">
            <PieChart />
            <Insight />
          </div>
          <div>
            <ProgressBar />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOpenForm("income")}
            className="bg-teal text-white font-bebas text-base tracking-widest py-5 rounded-full shadow-lg hover:bg-teal-dark hover:-translate-y-0.5 transition-all"
          >
            + TAMBAH PEMASUKAN
          </button>
          <button
            onClick={() => handleOpenForm("expense")}
            className="bg-teal text-white font-bebas text-base tracking-widest py-5 rounded-full shadow-lg hover:bg-teal-dark hover:-translate-y-0.5 transition-all"
          >
            + TAMBAH PENGELUARAN
          </button>
        </div>

      </main>

      {/* Form Modal */}
      {showForm && (
        <TransaksiForm
          initial={{ tipe: formTipe }}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}