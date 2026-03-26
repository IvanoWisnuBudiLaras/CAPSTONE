"use client"

import { useState } from "react"
import TopBar       from "@/components/laporan/TopBar"
import AllocCards   from "@/components/laporan/AllocCards"
import LaporanChart from "@/components/laporan/LaporanChart"
import TxGroup      from "@/components/laporan/TxGroup"

const PERIODS = [
  {
    label: "Maret 2026",
    pribadi: 2450000, keluarga: 1800000, tabungan: 805000,
    transactions: {
      pribadi: [
        { name: "Makan siang",  date: "24 Mar", amount: 45000 },
        { name: "Kopi pagi",    date: "23 Mar", amount: 28000 },
        { name: "Bensin motor", date: "22 Mar", amount: 80000 },
      ],
      keluarga: [
        { name: "Belanja bulanan", date: "20 Mar", amount: 650000 },
        { name: "Listrik & air",   date: "15 Mar", amount: 420000 },
        { name: "Internet rumah",  date: "10 Mar", amount: 250000 },
      ],
      tabungan: [
        { name: "Investasi reksa dana", date: "1 Mar", amount: 500000 },
        { name: "Tabungan darurat",     date: "1 Mar", amount: 305000 },
      ],
    },
  },
  {
    label: "Februari 2026",
    pribadi: 2300000, keluarga: 1750000, tabungan: 700000,
    transactions: {
      pribadi: [
        { name: "Transport online", date: "20 Feb", amount: 75000 },
        { name: "Bensin motor",     date: "18 Feb", amount: 80000 },
      ],
      keluarga: [
        { name: "Belanja bulanan", date: "18 Feb", amount: 600000 },
        { name: "Listrik & air",   date: "14 Feb", amount: 400000 },
      ],
      tabungan: [
        { name: "Investasi reksa dana", date: "1 Feb", amount: 400000 },
        { name: "Tabungan darurat",     date: "1 Feb", amount: 300000 },
      ],
    },
  },
]

export default function LaporanPage() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const data = PERIODS[selectedIdx]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        <TopBar
          periods={PERIODS}
          selectedIdx={selectedIdx}
          onPeriodChange={setSelectedIdx}
          data={data}
        />

        <AllocCards data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <LaporanChart periods={PERIODS} selectedIdx={selectedIdx} />
          </div>
          <div className="lg:col-span-2">
            <TxGroup data={data} />
          </div>
        </div>

      </div>
    </div>
  )
}