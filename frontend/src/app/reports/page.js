import Report from '@/client/reportsclient'
import { ProtectedRoute } from '@/lib/protected-route'

export const dynamic = 'force-dynamic'

export const metadata = {
  title:       'Laporan',
  description: 'Laporan split alokasi keuangan bulanan — breakdown Pribadi, Keluarga, dan Tabungan.',
}

export default function Page() {
  return (
    <ProtectedRoute>
      <Report />
    </ProtectedRoute>
  )
}