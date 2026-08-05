import { createClient } from '@supabase/supabase-js'

const createSupabaseAuthStub = () => ({
  async getSession() {
    return { data: { session: null }, error: null }
  },

  async getUser() {
    return { data: { user: null }, error: { message: 'Supabase belum dikonfigurasi' } }
  },

  async signInWithPassword() {
    return { data: { user: null, session: null }, error: { message: 'Supabase belum dikonfigurasi' } }
  },

  async signUp() {
    return { data: { user: null, session: null }, error: { message: 'Supabase belum dikonfigurasi' } }
  },

  async signInWithOAuth() {
    return { data: { user: null, session: null }, error: { message: 'Supabase belum dikonfigurasi' } }
  },
  

  async signOut() {
    return { error: null }
  },
})

let supabaseInstance = null
let supabaseInitError = null

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    } catch (error) {
      supabaseInitError = error
      console.error('[supabase] init error:', error)
    }
  } else {
    console.warn('[supabase] Env vars not set. Using auth stub.')
  }
}

export const supabase = supabaseInstance || { auth: createSupabaseAuthStub() }
export const supabaseReady = !!supabaseInstance
export const supabaseError = supabaseInitError

export function useSupabase() {
  return { supabase, supabaseReady, supabaseError }
}
