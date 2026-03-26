export default function Insight({ text }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-teal p-5">
      <h2 className="font-bebas text-base tracking-widest text-navy mb-4">
        INSIGHT
      </h2>
      <p className="text-sm font-semibold text-gray-500 leading-relaxed">
        {text ?? "Belum ada data transaksi bulan ini. Mulai catat pemasukan dan pengeluaranmu untuk mendapatkan insight keuangan yang akurat."}
      </p>
    </div>
  );
}