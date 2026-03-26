const ALOKASI_BADGE = {
  Pribadi:  "bg-indigo-100 text-indigo-700",
  Keluarga: "bg-pink-100 text-pink-700",
  Tabungan: "bg-green-100 text-green-700",
};

function formatRupiah(nominal) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(nominal);
}

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TransaksiList({ data, onEdit, onDelete }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center gap-3">
        <span className="text-4xl">📭</span>
        <p className="font-bebas text-xl tracking-widest text-gray-400">
          Belum Ada Transaksi
        </p>
        <p className="text-sm font-semibold text-gray-400 text-center">
          Tambahkan transaksi pertamamu dengan menekan tombol + Tambah Transaksi
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Indikator tipe */}
          <div className={`w-1.5 self-stretch rounded-full ${item.tipe === "income" ? "bg-teal" : "bg-red"}`} />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-navy">{item.kategori}</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${ALOKASI_BADGE[item.alokasi]}`}>
                {item.alokasi}
              </span>
            </div>
            {item.catatan && (
              <p className="text-xs text-gray-400 font-semibold mt-0.5 truncate">
                {item.catatan}
              </p>
            )}
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              {formatTanggal(item.tanggal)}
            </p>
          </div>

          {/* Nominal */}
          <div className={`font-bebas text-lg tracking-wide shrink-0 ${item.tipe === "income" ? "text-teal" : "text-red"}`}>
            {item.tipe === "income" ? "+" : "-"}{formatRupiah(item.nominal)}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onEdit(item)}
              className="text-xs font-bold text-gray-400 hover:text-navy transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-xs font-bold text-gray-400 hover:text-red transition-colors px-2 py-1 rounded-lg hover:bg-red/10"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}