"use client"

import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const formatRupiah = (val) => "Rp " + Number(val).toLocaleString("id-ID")

const LEGEND = [
  { label: "Pribadi",  color: "#1D9E75" },
  { label: "Keluarga", color: "#378ADD" },
  { label: "Tabungan", color: "#BA7517" },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-xs">
      <p className="font-medium text-gray-700 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-0.5">
          <span
            className="w-2 h-2 rounded-sm inline-block"
            style={{ background: p.fill }}
          />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-medium text-gray-800">
            {formatRupiah(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function LaporanChart({ periods, selectedIdx }) {
  // Bangun chart data dari semua periods, highlight periode aktif
  const chartData = periods.map((p, i) => ({
    bulan:    p.label.split(" ")[0], // ambil nama bulan saja, ex: "Maret"
    Pribadi:  p.pribadi,
    Keluarga: p.keluarga,
    Tabungan: p.tabungan,
    active:   i === selectedIdx,     // tandai periode yang aktif
  }))

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5">
      <p className="text-sm font-medium text-gray-800 mb-3">
        Perbandingan tipe alokasi
      </p>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap mb-3">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ background: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barCategoryGap="30%" barGap={3}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="bulan"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              v >= 1000000
                ? (v / 1000000).toFixed(1) + "jt"
                : (v / 1000).toFixed(0) + "rb"
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="Pribadi"
            fill="#1D9E75"
            radius={[4, 4, 0, 0]}
            // bar periode aktif lebih gelap, lainnya transparan
            fillOpacity={1}
          />
          <Bar dataKey="Keluarga" fill="#378ADD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Tabungan" fill="#BA7517" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Keterangan periode aktif */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        Periode aktif:{" "}
        <span className="text-gray-600 font-medium">
          {periods[selectedIdx].label}
        </span>
      </p>
    </div>
  )
}