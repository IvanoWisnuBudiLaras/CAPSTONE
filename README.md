# Finance App — Sandwich Gen

Monorepo: Next.js (frontend) + Express.js (backend) + Drizzle ORM + Supabase

---

## Struktur

```
/
├── package.json          ← root, jalankan keduanya sekaligus
├── frontend/             ← Next.js + Tailwind + Axios
│   └── src/
│       ├── app/          ← pages (App Router)
│       │   ├── page.js           → redirect otomatis
│       │   ├── login/page.js     → register & login
│       │   ├── dashboard/page.js → ringkasan + insight + budget
│       │   ├── transactions/page.js → CRUD transaksi
│       │   └── allocations/page.js  → Mode Gajian
│       ├── lib/
│       │   ├── axios.js     → axios instance + auth interceptor
│       │   └── supabase.js  → supabase client
│       └── services/
│           └── index.js    → semua API calls
└── backend/              ← Express.js + Drizzle + Supabase
    ├── src/
    │   ├── app.js          → entry point
    │   ├── db/
    │   │   ├── schema.js   → 5 tabel Drizzle
    │   │   └── index.js    → koneksi DB
    │   ├── middleware/
    │   │   └── auth.js     → verify Supabase JWT
    │   └── routes/
    │       ├── transactions.js  → CRUD + bulk (Mode Gajian)
    │       ├── dashboard.js     → summary + insight + budgets
    │       ├── categories.js
    │       ├── budgets.js
    │       ├── allocations.js   → rules + preview
    │       └── profiles.js
    ├── drizzle.config.js
    └── package.json
```

---

## Setup (pertama kali)

```bash
# 1. Install semua dependencies sekaligus
npm run install:all

# 2. Setup backend env
cp backend/.env.example backend/.env
# → isi SUPABASE_URL, SUPABASE_ANON_KEY, DATABASE_URL

# 3. Setup frontend env
cp frontend/.env.example frontend/.env.local
# → isi NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_REF

# 4. Push schema ke Supabase
npm run db:push

# 5. Jalankan keduanya sekaligus
npm run dev
# → frontend: http://localhost:3000
# → backend:  http://localhost:5000
```

---

## API Endpoints

| Method | URL | Keterangan |
|--------|-----|------------|
| GET | /api/health | Health check |
| GET | /api/transactions | List transaksi bulan ini |
| POST | /api/transactions | Tambah transaksi |
| POST | /api/transactions/bulk | Mode Gajian — split otomatis |
| PUT | /api/transactions/:id | Edit |
| DELETE | /api/transactions/:id | Hapus |
| GET | /api/dashboard/summary | Ringkasan bulan ini |
| GET | /api/dashboard/insight | Insight vs bulan lalu |
| GET | /api/dashboard/budgets | Progress budget |
| GET | /api/allocations | Ambil aturan alokasi |
| POST | /api/allocations | Simpan aturan (upsert) |
| POST | /api/allocations/preview | Preview split tanpa simpan |
| GET | /api/categories | List kategori |
| POST | /api/categories | Tambah kategori |
| PUT | /api/categories/:id | Edit |
| DELETE | /api/categories/:id | Hapus |
| GET | /api/budgets | List budget |
| POST | /api/budgets | Set budget |
| PUT | /api/budgets/:id | Update limit |
| DELETE | /api/budgets/:id | Hapus |
| GET | /api/profiles/me | Profil user |
| POST | /api/profiles | Buat profil |
| PUT | /api/profiles/me | Update profil |

---

## Halaman yang sudah ada

| Route | Keterangan |
|-------|------------|
| / | Redirect otomatis ke /dashboard atau /login |
| /login | Register & login |
| /dashboard | Ringkasan, budget progress, insight |
| /transactions | List + tambah + hapus transaksi |
| /allocations | Atur alokasi % + Mode Gajian |

## Halaman yang perlu dibuat sendiri

| Route | Keterangan |
|-------|------------|
| /budgets | Set budget per kategori |
| /categories | Kelola kategori |
| /reports | Laporan split alokasi |
