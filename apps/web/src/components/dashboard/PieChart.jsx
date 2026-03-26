"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
  labels: ["Makanan", "Transport", "Hiburan", "Tagihan", "Belanja", "Lainnya"],
  datasets: [
    {
      data: [30, 15, 20, 18, 10, 7],
      backgroundColor: [
        "#1ECFB0", "#2979FF", "#E53935",
        "#FF9800", "#9C27B0", "#607D8B",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: { family: "Nunito", size: 11, weight: "700" },
        padding: 10,
        boxWidth: 12,
      },
    },
  },
};

export default function PieChart() {
  return (
    <div className="bg-white rounded-2xl border-2 border-teal p-5">
      <h2 className="font-bebas text-base tracking-widest text-navy mb-4">
        PIE CHART PENGELUARAN PER KATEGORI
      </h2>
      <div className="flex justify-center items-center min-h-48">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}