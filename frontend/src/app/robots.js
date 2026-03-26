// Simpan ke: frontend/src/app/robots.js
// Next.js otomatis generate /robots.txt dari file ini

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/profile/'],
      },
    ],
    sitemap: 'https://finsmart.vercel.app/sitemap.xml',
  }
}