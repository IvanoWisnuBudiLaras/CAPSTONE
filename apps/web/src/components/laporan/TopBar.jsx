"use client"

export default function TopBar({ periods, selectedIdx, onPeriodChange, data }) {

  const handleExport = () => {
    const rows = [["Tipe", "Nama", "Tanggal", "Nominal"]]
    Object.entries(data.transactions).forEach(([tipe, txs]) => {
      txs.forEach((tx) => rows.push([tipe, tx.name, tx.date, tx.amount]))
    })
    const csv = rows.map((r) => r.join(",")).join("\n")
    const a   = document.createElement("a")
    a.href    = "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    a.download = `laporan-${data.label}.csv`
    a.click()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-xl font-medium text-gray-900">
          Laporan Split Alokasi
        </h1>
        <span className="text-xs px-3 py-1 rounded-full bg-teal-50
                         text-teal-700 border border-teal-200">
          {data.label}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={selectedIdx}
          onChange={(e) => onPeriodChange(Number(e.target.value))}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-200
                     bg-white text-gray-700 focus:outline-none
                     focus:ring-2 focus:ring-teal-400"
        >
          {periods.map((p, i) => (
            <option key={i} value={i}>{p.label}</option>
          ))}
        </select>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-lg
                     bg-teal-500 hover:bg-teal-600 text-white font-medium
                     transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
            <path d="M2 11v3h12v-3M8 2v8M5 7l3 3 3-3"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export CSV
        </button>
      </div>
    </div>
  )
}
