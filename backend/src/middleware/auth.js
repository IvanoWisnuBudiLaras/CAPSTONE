import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

let supabase = null

if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  } catch (error) {
    console.warn('Supabase client init failed:', error.message)
  }
}

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' })
  }

  const token = authHeader.split(' ')[1]
  const useLocalFallback = process.env.LOCAL_DEV_AUTH_BYPASS === 'true'

  if (useLocalFallback && (token === 'local-dev-token' || token.startsWith('local-dev-token-'))) {
    req.user = {
      id: 'local-user',
      email: req.headers['x-user-email'] || 'local@example.com',
    }
    return next()
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' })
  req.user = user
  next()
}
