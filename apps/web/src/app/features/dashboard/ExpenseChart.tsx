// components/dashboard/ExpenseChart.tsx
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatRupiah } from '@/lib/utils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Data placeholder untuk tampilan UI
const placeholderData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Pemasukan',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Pengeluaran',
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12,
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#6b7280',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function (context) {
          const value = context.parsed.y;
          return `${context.dataset.label}: ${formatRupiah(value)}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
          family: 'Inter, sans-serif',
        },
      },
    },
    y: {
      grid: {
        color: '#e5e7eb',
        borderDash: [3, 3],
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
          family: 'Inter, sans-serif',
        },
        callback: function (value: any) {
          return `Rp${value / 1000}k`;
        },
      },
      beginAtZero: true,
    },
  },
};

export default function ExpenseChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Analisis Arus Kas</h3>
        <select className="text-sm border-gray-200 border rounded-md px-2 py-1 text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500">
          <option>7 Hari Terakhir</option>
          <option>Bulan Ini</option>
          <option>Tahun Ini</option>
        </select>
      </div>
      <div className="h-[300px] w-full">
        <Line data={placeholderData} options={options} />
      </div>
    </div>
  );
}