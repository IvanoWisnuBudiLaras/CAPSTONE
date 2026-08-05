# Fin Smart — Finance App (Capstone)

> Aplikasi manajemen keuangan untuk generasi sandwich. Catat pemasukan, pengeluaran, dan alokasi gaji secara otomatis — Pribadi, Keluarga, dan Tabungan.

- **Frontend:** Next.js 15 (React 18, Tailwind CSS, PWA)
- **Backend:** Express 4.x (Node.js) — REST API
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **Database:** Supabase PostgreSQL (Drizzle ORM di backend)

---

## Struktur Proyek

```
CAPSTONE/
├── frontend/          → Next.js (port 3000)
│   ├── src/
│   │   ├── app/       → Halaman (App Router) + ProtectedRoute wrapper
│   │   ├── client/    → React client components (dashboard, login, dll)
│   │   ├── components/→ Navbar, AllocationModal, ProtectedRoute
│   │   ├── lib/       → supabase.js, axios.js, protected-route.js
│   │   └── services/  → API service layer (axios wrapper)
│   ├── .env.local     → Environment variables frontend (jangan Commit!)
│   └── package.json
├── backend/           → Express API (port 5000)
│   ├── src/
│   │   ├── routes/    → transactions, dashboard, categories, budgets, allocations, profiles
│   │   ├── middleware/→ auth.js (Supabase JWT verification)
│   │   └── db/        → schema.js (Drizzle), index.js (connection)
│   ├── sql/           → supabase-schema.sql (manual SQL setup)
│   ├── .env           → Environment variables backend (jangan Commit!)
│   └── package.json
├── .gitignore
└── package.json       → Root: npm run dev (concurrently frontend + backend)
```

---

## Prasyarat

- Node.js >= 18
- Akun [Supabase](https://supabase.co) (project sudah tersedia)
- npm >= 9

---

## Setup Environment

### 1. Backend (.env)

Salin `.env.example` dan edit nilainya:

```bash
cd CAPSTONE/backend
cp .env.example .env
```

Edit `.env`:

```env
# Supabase Project yang DIPAKAI
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_ANON_KEY=eyJ...  # dari Project Settings → API → anon key
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-[REGION].pooler.supabase.com:6543/postgres
FRONTEND_URL=http://localhost:3000
PORT=5000
LOCAL_DEV_AUTH_BYPASS=false
```

> **Penting:** `DATABASE_URL` & `SUPABASE_URL` & `SUPABASE_ANON_KEY` harus dari **project Supabase yang SAMA**.

### 2. Frontend (.env.local)

```bash
cd CAPSTONE/frontend
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # harus SAMA dengan backend
```

---

## Database Schema

Jalankan SQL ini di **Supabase Dashboard → SQL Editor** (project yang sama di `.env`):

```bash
# Atau pakai drizzle-kit (otomatis sync schema):
cd CAPSTONE/backend
npm run db:push
```

Atau copy-paste isi `backend/sql/supabase-schema.sql` ke SQL Editor Supabase.

---

## Cara Menjalankan

```bash
# Install semua dependencies + jalankan frontend & backend bersamaan
cd CAPSTONE
npm run install:all && npm run dev
```

| App       | URL                   |
|-----------|-----------------------|
| Frontend  | http://localhost:3000 |
| Backend   | http://localhost:5000 |
| API Docs  | http://localhost:5000/api-docs |
| Health    | http://localhost:5000/api/health |

### Development terpisah

```bash
# Terminal 1 — Backend
cd CAPSTONE/backend && npm run dev

# Terminal 2 — Frontend
cd CAPSTONE/frontend && npm run dev
```

---

## Fitur

| Fitur        | Auth via | Data via                                     |
|--------------|----------|----------------------------------------------|
| Sign In / Up | Supabase | Supabase Auth                                |
| Google OAuth | Supabase | Supabase Auth                                |
| Profil       | Supabase | Backend API → Supabase PostgreSQL            |
| Transaksi    | Supabase | Backend API → Supabase PostgreSQL            |
| Budget       | Supabase | Backend API → Supabase PostgreSQL            |
| Kategori     | Supabase | Backend API → Supabase PostgreSQL            |
| Alokasi Gaji | Supabase | Backend API → Supabase PostgreSQL            |
| Laporan      | Supabase | Backend API → Supabase PostgreSQL            |
| Export PDF   | —        | Frontend (jsPDF)                             |
| Export Excel | —        | Frontend (exceljs)                           |

> **Auth** (login, signup, Google OAuth, sesi) dikelola langsung oleh **Supabase Client** di frontend.
> **Semua data** (transaksi, budget, kategori, profil, alokasi) disimpan di **Supabase PostgreSQL** lewat **Backend REST API**. Backend menerima JWT token dari Supabase Auth, memverifikasinya, lalu query database lewat Drizzle ORM.

---

## Keamanan

- ProtectedRoute component otomatis redirect ke `/login` bila belum terautentikasi
- Setiap request API otomatis kirim `Bearer <access_token>` ke backend
- Backend verifikasi token JWT via `supabase.auth.getUser()`
- Semua tabel pakai Row Level Security (RLS) dengan policy isolasi per-user

---

## Troubleshooting

### `supabase.auth.getSession is not a function`
Pastikan `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah ter-set di `.env.local`.

### `Backend tidak merespons` (di frontend)
Pastikan backend sudah berjalan (`npm run dev:backend`) dan `NEXT_PUBLIC_API_URL` di `.env.local` mengarah ke backend yang benar.

### Data tidak tersimpan / kosong
1. Pastikan `DATABASE_URL` (backend) & `NEXT_PUBLIC_SUPABASE_URL` (frontend) merujuk ke **project Supabase yang SAMA**.
2. Jalankan schema SQL di Supabase Dashboard SQL Editor.

### Supabase project suspended
Buka [Supabase Dashboard](https://supabase.co/dashboard) → pilih project → klik **Restore** jika statusnya suspended.

---

## Kontribusi

1. Fork repository
2. Buat branch baru (`git checkout -b fitur/nama-fitur`)
3. Commit (`git commit -m 'feat: ...'`)
4. Push (`git push origin fitur/nama-fitur`)
5. Buka Pull Request

---

## Lisensi

MIT © 2025 — Capstone CC26-PS104
