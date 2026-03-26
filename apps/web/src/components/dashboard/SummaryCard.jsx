const colorMap = {
  pemasukan:   "bg-teal",
  pengeluaran: "bg-red",
  saldo:       "bg-blue",
};

export default function SummaryCard({ type, icon, title, value }) {
  return (
    <div className={`${colorMap[type]} rounded-2xl p-6 text-white flex flex-col items-center gap-2 min-h-44 border-2 border-white/25 transition-transform hover:-translate-y-1`}>
      <div className="w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="font-bebas text-xl tracking-widest text-center leading-tight whitespace-pre-line">
        {title}
      </div>
      <div className="font-bebas text-4xl tracking-widest">
        {value ?? "-"}
      </div>
      <div className="text-sm font-bold opacity-85 mt-auto">
        Bulan ini
      </div>
    </div>
  );
}