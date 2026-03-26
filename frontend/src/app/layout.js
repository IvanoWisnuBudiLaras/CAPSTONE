import './globals.css'

const APP_NAME    = 'Fin Smart'
const APP_URL     = 'https://finsmart.vercel.app'
const APP_DESC    = 'Aplikasi manajemen keuangan untuk generasi sandwich. Catat pemasukan, pengeluaran, dan alokasi gaji secara otomatis — Pribadi, Keluarga, dan Tabungan.'
const APP_AUTHOR  = 'Fin Smart Team'
const APP_KEYWORDS = 'manajemen keuangan, generasi sandwich, catat pengeluaran, alokasi gaji, budget, tabungan, keuangan pribadi, finansial'

export const metadata = {
  metadataBase: new URL(APP_URL),

  // ── Basic ────────────────────────────────────────────────────
  title: {
    default:  `${APP_NAME} — Kelola Keuangan Generasi Sandwich`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESC,
  keywords:    APP_KEYWORDS,
  authors:     [{ name: APP_AUTHOR }],
  creator:     APP_AUTHOR,
  publisher:   APP_NAME,

  // ── Open Graph (WhatsApp, Facebook, LinkedIn preview) ────────
  openGraph: {
    type:        'website',
    locale:      'id_ID',
    url:          APP_URL,
    siteName:     APP_NAME,
    title:       `${APP_NAME} — Kelola Keuangan Generasi Sandwich`,
    description:  APP_DESC,
    images: [{
      url:    '/og-image.png',   // buat file 1200x630px di /public/og-image.png
      width:   1200,
      height:  630,
      alt:    `${APP_NAME} — Manajemen Keuangan`,
    }],
  },

  // ── Twitter / X Card ─────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       `${APP_NAME} — Kelola Keuangan Generasi Sandwich`,
    description:  APP_DESC,
    images:      ['/og-image.png'],
  },

  // ── Icons ────────────────────────────────────────────────────
  icons: {
    icon:        '/favicon.ico',
    shortcut:    '/favicon-16x16.png',
    apple:       '/apple-touch-icon.png',
  },

  // ── Manifest (PWA ready) ─────────────────────────────────────
  manifest: '/manifest.json',

  // ── Robots ───────────────────────────────────────────────────
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:          true,
      follow:         true,
      'max-image-preview':   'large',
      'max-snippet':          -1,
    },
  },

  // ── Verification (opsional, isi kalau sudah punya akun) ──────
  // verification: {
  //   google: 'google-site-verification-code',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href={APP_URL} />

        {/* Theme color browser */}
        <meta name="theme-color" content="#14b8a6" />

        {/* Mobile web app */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  )
}