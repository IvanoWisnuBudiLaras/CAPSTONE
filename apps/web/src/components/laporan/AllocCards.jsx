const formatRupiah = (val) => "Rp " + Number(val).toLocaleString("id-ID")

const ALLOC_CONFIG = [
  {
    key:         "pribadi",
    label:       "Total Pribadi",
    accentColor: "#1D9E75",
    badgeBg:     "#E1F5EE",
    badgeColor:  "#085041",
  },
  {
    key:         "keluarga",
    label:       "Total Keluarga",
    accentColor: "#378ADD",
    badgeBg:     "#E6F1FB",
    badgeColor:  "#0C447C",
  },
  {
    key:         "tabungan",
    label:       "Total Tabungan",
    accentColor: "#BA7517",
    badgeBg:     "#FAEEDA",
    badgeColor:  "#633806",
  },
]

function AllocCard({ label, amount, percentage, accentColor, badgeBg, badgeColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="h-1" style={{ background: accentColor }} />
      <div className="p-4 md:p-5">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg md:text-xl font-medium text-gray-900 mb-2 leading-tight">
          {formatRupiah(amount)}
        </p>
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {percentage}% dari total
        </span>
      </div>
    </div>
  )
}

export default function AllocCards({ data }) {
  const total = data.pribadi + data.keluarga + data.tabungan

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {ALLOC_CONFIG.map((cfg) => (
        <AllocCard
          key={cfg.key}
          label={cfg.label}
          amount={data[cfg.key]}
          percentage={((data[cfg.key] / total) * 100).toFixed(1)}
          accentColor={cfg.accentColor}
          badgeBg={cfg.badgeBg}
          badgeColor={cfg.badgeColor}
        />
      ))}
    </div>
  )
}