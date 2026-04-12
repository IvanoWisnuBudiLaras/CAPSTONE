
# Capstone Project

> Deskripsi singkat project ini. Jelaskan apa yang dilakukan aplikasi ini dan masalah apa yang diselesaikan.

---

## Daftar Isi

- [Deskripsi Proyek](#deskripsi-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Setup Environment](#setup-environment)
- [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)

---

## Deskripsi Proyek

Tuliskan deskripsi lengkap project di sini. Contoh:

> Aplikasi ini bertujuan untuk [tujuan aplikasi]. Dibangun menggunakan Next.js sebagai frontend dan Express sebagai backend dalam satu monorepo.

---

## Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Next.js | 16.x | Frontend |
| Express | 5.x | Backend / REST API |
| Zod | 4.x | Validasi data |
| Turborepo | 2.x | Build orchestrator |
| Node.js | 22.x | Runtime |

---

## Setup Environment

### Prasyarat

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) >= 22.0.0
- npm >= 10.0.0

Cek versi:
```bash
node -v
npm -v
```

### 1. Clone Repository

```bash
git clone https://github.com/username/capstone.git
cd capstone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
# API
cp apps/api/.env.example apps/api/.env

# Web
cp apps/web/.env.local.example apps/web/.env.local
```

Buka `apps/api/.env` dan isi nilai berikut:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
ACCESS_TOKEN_SECRET=isi_dengan_random_string_32_karakter
REFRESH_TOKEN_SECRET=isi_dengan_random_string_32_karakter_lain
```

Generate random string untuk secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Cara Menjalankan Aplikasi

### Development

Jalankan semua apps sekaligus dari root:
```bash
npm run dev
```

| App | URL |
|-----|-----|
| Frontend (Next.js) | http://localhost:3000 |
| Backend (Express) | http://localhost:3001 |

### Cek API berjalan

```bash
curl http://localhost:3001/health
# { "status": "ok" }
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

---

## Struktur Proyek

```
capstone/
├── apps/
│   ├── web/          → Frontend (Next.js)
│   └── api/          → Backend (Express)
├── packages/
│   ├── shared/       → Types, schemas, constants (dipakai web & api)
│   ├── tsconfig/     → Shared TypeScript config
│   └── eslint-config/→ Shared ESLint config
├── turbo.json
└── package.json
```

---

## Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur baru'`)
4. Push ke branch (`git push origin fitur/nama-fitur`)
5. Buat Pull Request

---

## Lisensi

[MIT](LICENSE) © 2025 — CAPSTONE CC26-PS104
