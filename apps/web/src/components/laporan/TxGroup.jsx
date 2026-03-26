"use client"

import { useState } from "react"

const formatRupiah = (val) => "Rp " + Number(val).toLocaleString("id-ID")

const TX_CONFIG = [
  { key: "pribadi",  label: "Pribadi",  dotColor: "#1D9E75" },
  { key: "keluarga", label: "Keluarga", dotColor: "#378ADD" },
  { key: "tabungan", label: "Tabungan", dotColor: "#BA7517" },
]

function TxItem({ name, date, amount }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 pl-7 border-t border-gray-100">
      <div>
        <p className="text-xs text-gray-800">{name}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <p className="text-xs font-medium text-gray-800 whitespace-nowrap">
        {formatRupiah(amount)}
      </p>
    </div>
  )
}

function TxAccordion({ label, dotColor, amount, transactions }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5
                   bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: dotColor }}
          />
          <span className="text-sm font-medium text-gray-800">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {transactions.length} transaksi
          </span>
          <span className="text-sm font-medium text-gray-800">
            {formatRupiah(amount)}
          </span>
          <span
            className={`text-xs text-gray-400 inline-block transition-transform
                        duration-200 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div className="bg-white">
          {transactions.map((tx, i) => (
            <TxItem key={i} {...tx} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TxGroup({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5">
      <p className="text-sm font-medium text-gray-800 mb-3">
        Detail transaksi per tipe
      </p>
      <div className="flex flex-col gap-2">
        {TX_CONFIG.map((cfg) => (
          <TxAccordion
            key={cfg.key}
            label={cfg.label}
            dotColor={cfg.dotColor}
            amount={data[cfg.key]}
            transactions={data.transactions[cfg.key]}
          />
        ))}
      </div>
    </div>
  )
}