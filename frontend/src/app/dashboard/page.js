import Dashboard from '@/client/dashboardclient'

export const metadata = {
  title:       'Dashboard',
  description: 'Lihat ringkasan keuangan bulan ini — pemasukan, pengeluaran, saldo, dan progress budget.',
}

export default function Page() {
  return <Dashboard />
}