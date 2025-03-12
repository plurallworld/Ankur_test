'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const supabase = createClientComponentClient()
  const [session, setSession] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Session check error:', error)
          setError(error.message)
          return
        }
        setSession(session)
      } catch (err) {
        console.error('Session check failed:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  if (error) {
    return (
      <div className="mt-4 rounded-md bg-red-50 p-4">
        <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-md bg-gray-50 p-4">
      <h3 className="text-sm font-medium text-gray-900">Authentication Debug</h3>
      <pre className="mt-2 overflow-auto text-xs text-gray-700">
        {JSON.stringify({ 
          authenticated: !!session,
          user: session?.user ? {
            id: session.user.id,
            email: session.user.email,
            provider: session.user.app_metadata.provider
          } : null
        }, null, 2)}
      </pre>
    </div>
  )
}
