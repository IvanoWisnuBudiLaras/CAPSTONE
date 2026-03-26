// Simpan ke: frontend/src/app/sitemap.js
// Next.js otomatis generate /sitemap.xml dari file ini

export default function sitemap() {
  const baseUrl = 'https://finsmart.vercel.app'
  const now     = new Date()

  return [
    {
      url:          baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority:     1.0,
    },
    {
      url:          `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority:     0.8,
    },
    {
      url:          `${baseUrl}/dashboard`,
      lastModified: now,
      changeFrequency: 'daily',
      priority:     0.9,
    },
    {
      url:          `${baseUrl}/transactions`,
      lastModified: now,
      changeFrequency: 'daily',
      priority:     0.8,
    },
    {
      url:          `${baseUrl}/budgets`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority:     0.7,
    },
    {
      url:          `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority:     0.6,
    },
    {
      url:          `${baseUrl}/reports`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority:     0.7,
    },
  ]
}