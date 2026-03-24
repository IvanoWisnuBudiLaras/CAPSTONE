// components/dashboard/Sidebar.tsx
"use client";

import { Wallet, PieChart, CreditCard, TrendingUp, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: PieChart, href: '/', active: true },
    { name: 'Transaksi', icon: CreditCard, href: '/transactions', active: false },
    { name: 'Budget', icon: TrendingUp, href: '/budget', active: false },
    { name: 'Pengaturan', icon: Settings, href: '/settings', active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-red-600 mb-8">
          <Wallet className="fill-red-600" />
          <span>FinTrack</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                item.active
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-6 w-full px-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">User Name</p>
            <p className="text-xs text-gray-500">user@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}