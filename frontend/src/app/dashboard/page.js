import Dashboard from '@/client/dashboardclient'
import { ProtectedRoute } from '@/lib/protected-route'

export const dynamic = 'force-dynamic'

export const metadata = {
  title:       'Dashboard',
  description: 'Lihat ringkasan keuangan bulan ini — pemasukan, pengeluaran, saldo, dan progress budget.',
}

export default function Page() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}