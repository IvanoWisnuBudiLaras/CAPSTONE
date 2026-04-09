/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Set basePath ke nama repository jika deploy di GitHub Pages (hanya saat production)
  basePath: isProd ? '/CAPSTONE' : '',
  images: {
    unoptimized: true, 
  },
}

const withPWA = require('next-pwa')({
  dest:            'public',
  register:        true,
  skipWaiting:     true,
  disable:         process.env.NODE_ENV === 'development',
})

// Menyelesaikan konfigurasi
module.exports = withPWA(nextConfig)
