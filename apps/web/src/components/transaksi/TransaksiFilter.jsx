const BULAN = [
  { value: "", label: "Semua Bulan" },
  { value: "2026-01", label: "Januari 2026" },
  { value: "2026-02", label: "Februari 2026" },
  { value: "2026-03", label: "Maret 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-05", label: "Mei 2026" },
  { value: "2026-06", label: "Juni 2026" },
  { value: "2026-07", label: "Juli 2026" },
  { value: "2026-08", label: "Agustus 2026" },
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "Oktober 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "Desember 2026" },
];

export default function TransaksiFilter({ filter, setFilter }) {
  const selectClass = "border-2 border-gray-200 rounded-full px-4 py-2 text-sm font-semibold outline-none focus:border-teal transition-colors bg-white cursor-pointer";

  return (
    <div className="flex flex-wrap gap-3">
      {/* Filter Bulan */}
      <select
        value={filter.bulan}
        onChange={(e) => setFilter({ ...filter, bulan: e.target.value })}
        className={selectClass}
      >
        {BULAN.map((b) => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>

      {/* Filter Tipe */}
      <select
        value={filter.tipe}
        onChange={(e) => setFilter({ ...filter, tipe: e.target.value })}
        className={selectClass}
      >
        <option value="">Semua Tipe</option>
        <option value="income">Pemasukan</option>
        <option value="expense">Pengeluaran</option>
      </select>

      {/* Filter Alokasi */}
      <select
        value={filter.alokasi}
        onChange={(e) => setFilter({ ...filter, alokasi: e.target.value })}
        className={selectClass}
      >
        <option value="">Semua Alokasi</option>
        <option value="Pribadi">Pribadi</option>
        <option value="Keluarga">Keluarga</option>
        <option value="Tabungan">Tabungan</option>
      </select>
    </div>
  );
}