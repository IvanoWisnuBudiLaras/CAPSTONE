import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
  } catch (err) {
    console.warn('[axios] Gagal ambil session:', err?.message || err)
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error('[axios] Backend tidak merespons. Pastikan server berjalan (npm run dev:backend).')
    } else if (err.response.status === 401) {
      console.warn('[axios] Akses ditolak (401). Sesi mungkin kadaluarsa — redirect ke login.')
    }
    return Promise.reject(err)
  }
)

export default api