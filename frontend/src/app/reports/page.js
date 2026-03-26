import Report from '@/client/reportsclient'

export const metadata = {
  title:       'Laporan',
  description: 'Laporan split alokasi keuangan bulanan — breakdown Pribadi, Keluarga, dan Tabungan.',
}

export default function Page() {
  return <Report />
}