import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Fin Smart</h1>
      <p className="mt-3 text-gray-600">Kelola keuanganmu dengan login, kategori, budget, dan transaksi.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/login" className="rounded-full bg-teal-500 px-6 py-3 text-white font-semibold">
          Masuk
        </Link>
        <Link href="/dashboard" className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 font-semibold">
          Dashboard
        </Link>
      </div>
    </main>
  )
}
