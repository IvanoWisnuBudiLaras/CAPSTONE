"use client";
import { useState } from "react";

const KATEGORI_INCOME = ["Gaji", "Bonus", "Investasi", "Freelance", "Lainnya"];
const KATEGORI_EXPENSE = ["Makanan & Minuman", "Transportasi", "Hiburan", "Tagihan", "Belanja", "Kesehatan", "Tabungan", "Lainnya"];

export default function TransaksiForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    tipe: initial?.tipe ?? "expense",
    alokasi: initial?.alokasi ?? "Pribadi",
    nominal: initial?.nominal ?? "",
    kategori: initial?.kategori ?? "",
    tanggal: initial?.tanggal ?? new Date().toISOString().split("T")[0],
    catatan: initial?.catatan ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset kategori kalau tipe berubah
      ...(name === "tipe" ? { kategori: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nominal || !form.kategori || !form.tanggal) return;
    onSave({ ...form, nominal: Number(form.nominal) });
  };

  const inputClass = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors";
  const labelClass = "font-bold text-sm text-navy mb-1 block";
  const kategoriList = form.tipe === "income" ? KATEGORI_INCOME : KATEGORI_EXPENSE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="font-bebas text-2xl tracking-widest text-navy mb-5">
          {initial ? "Edit Transaksi" : "Tambah Transaksi"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Tipe */}
          <div>
            <label className={labelClass}>Tipe</label>
            <div className="grid grid-cols-2 gap-2">
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, tipe: t, kategori: "" })}
                  className={`py-2.5 rounded-xl font-bebas text-sm tracking-widest transition-colors
                    ${form.tipe === t
                      ? t === "income" ? "bg-teal text-white" : "bg-red text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                >
                  {t === "income" ? "Pemasukan" : "Pengeluaran"}
                </button>
              ))}
            </div>
          </div>

          {/* Alokasi */}
          <div>
            <label className={labelClass}>Alokasi</label>
            <div className="grid grid-cols-3 gap-2">
              {["Pribadi", "Keluarga", "Tabungan"].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setForm({ ...form, alokasi: a })}
                  className={`py-2 rounded-xl font-bold text-xs tracking-wide transition-colors
                    ${form.alokasi === a
                      ? a === "Pribadi" ? "bg-indigo-500 text-white"
                        : a === "Keluarga" ? "bg-pink-500 text-white"
                        : "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Nominal */}
          <div>
            <label className={labelClass}>Nominal</label>
            <input
              type="number"
              name="nominal"
              value={form.nominal}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={inputClass}
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className={labelClass}>Kategori</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Pilih Kategori</option>
              {kategoriList.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label className={labelClass}>Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Catatan */}
          <div>
            <label className={labelClass}>Catatan Konteks</label>
            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Tambahkan catatan..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-full border-2 border-gray-200 font-bebas text-sm tracking-widest text-gray-400 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="py-2.5 rounded-full bg-teal text-white font-bebas text-sm tracking-widest hover:bg-teal-dark transition-colors shadow-md"
            >
              {initial ? "Simpan" : "Tambah"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}