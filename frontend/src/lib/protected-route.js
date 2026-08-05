'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useAuthGuard(redirectTo = '/login') {
  const router = useRouter()
  const [session,    setSession]    = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [user,       setUser]       = useState(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    async function checkSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.warn('[useAuthGuard] session error:', error.message)
        }

        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setInitialized(true)
          setLoading(false)

          if (!session) {
            router.replace(redirectTo)
          }
        }
      } catch (err) {
        console.error('[useAuthGuard] unexpected error:', err)
        if (mounted) {
          setSession(null)
          setUser(null)
          setInitialized(true)
          setLoading(false)
          router.replace(redirectTo)
        }
      }
    }

    // Check immediately
    checkSession()

    // Listen for auth state changes (login / logout in other tabs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)

        if (event === 'SIGNED_OUT' || !session) {
          router.replace(redirectTo)
        } else {
          setInitialized(true)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [router, redirectTo])

  return { session, user, loading, initialized }
}

export function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { loading, initialized } = useAuthGuard(redirectTo)

  if (loading || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-lg animate-pulse">Memuat halaman...</p>
      </div>
    )
  }

  return <>{children}</>
}
