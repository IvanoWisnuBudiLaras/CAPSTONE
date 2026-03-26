import Transaction from '@/client/transactionsclient'

export const metadata = {
  title:       'Transaksi',
  description: 'Catat dan kelola semua transaksi keuangan harian. Filter berdasarkan kategori, tipe, dan periode.',
}

export default function Page() {
  return <Transaction />
}