const progressData = [
  { label: "Makanan & Minuman", pct: 60, color: "bg-teal" },
  { label: "Transportasi",      pct: 35, color: "bg-teal" },
  { label: "Hiburan",           pct: 80, color: "bg-orange-400" },
  { label: "Tagihan",           pct: 95, color: "bg-red" },
  { label: "Belanja",           pct: 45, color: "bg-teal" },
];

function ProgressItem({ label, pct, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-bold mb-1.5">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressBar() {
  return (
    <div className="bg-white rounded-2xl border-2 border-teal p-5 h-full">
      <h2 className="font-bebas text-base tracking-widest text-navy mb-4">
        PROGRESS BAR
      </h2>
      {progressData.map((item) => (
        <ProgressItem key={item.label} {...item} />
      ))}
    </div>
  );
}