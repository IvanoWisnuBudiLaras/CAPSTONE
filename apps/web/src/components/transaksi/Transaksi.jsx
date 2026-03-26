"use client";
import { useState } from "react";
import TransaksiList from "@/components/transaksi/TransaksiList";
import TransaksiForm from "@/components/transaksi/TransaksiForm";
import TransaksiFilter from "@/components/transaksi/TransaksiFilter";
import DeleteDialog from "@/components/transaksi/DeleteDialog";

const DUMMY_DATA = [
  {
    id: 1,
    kategori: "Makanan & Minuman",
    tipe: "expense",
    alokasi: "Pribadi",
    tanggal: "2026-03-20",
    nominal: 50000,
    catatan: "Makan siang di kantin",
  },
  {
    id: 2,
    kategori: "Gaji",
    tipe: "income",
    alokasi: "Keluarga",
    tanggal: "2026-03-15",
    nominal: 5000000,
    catatan: "Gaji bulan Maret",
  },
  {
    id: 3,
    kategori: "Tabungan",
    tipe: "expense",
    alokasi: "Tabungan",
    tanggal: "2026-03-10",
    nominal: 500000,
    catatan: "Setoran tabungan bulanan",
  },
];

export default function Transaksi() {
  const [transaksi, setTransaksi] = useState(DUMMY_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({ bulan: "", tipe: "", alokasi: "" });

  // Filter logic
  const filtered = transaksi.filter((t) => {
    const matchBulan = filter.bulan ? t.tanggal.startsWith(filter.bulan) : true;
    const matchTipe = filter.tipe ? t.tipe === filter.tipe : true;
    const matchAlokasi = filter.alokasi ? t.alokasi === filter.alokasi : true;
    return matchBulan && matchTipe && matchAlokasi;
  });

  const handleSave = (data) => {
    if (editData) {
      setTransaksi(transaksi.map((t) => (t.id === editData.id ? { ...data, id: editData.id } : t)));
    } else {
      setTransaksi([{ ...data, id: Date.now() }, ...transaksi]);
    }
    setShowForm(false);
    setEditData(null);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleDeleteConfirm = () => {
    setTransaksi(transaksi.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-nunito text-navy">

      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-bebas text-3xl tracking-widest">Transaksi</h1>
          <button
            onClick={() => { setEditData(null); setShowForm(true); }}
            className="bg-teal text-white font-bebas text-sm tracking-widest px-5 py-2.5 rounded-full hover:bg-teal-dark transition-colors shadow-md"
          >
            + Tambah Transaksi
          </button>
        </div>

        {/* Filter */}
        <TransaksiFilter filter={filter} setFilter={setFilter} />

        {/* List */}
        <TransaksiList
          data={filtered}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteId(id)}
        />

      </main>

      {/* Form Modal */}
      {showForm && (
        <TransaksiForm
          initial={editData}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditData(null); }}
        />
      )}

      {/* Delete Dialog */}
      {deleteId && (
        <DeleteDialog
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}