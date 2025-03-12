'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import AuthDebug from '@/components/AuthDebug'
import ChatComponent from '@/components/ChatComponent'

export default function Dashboard() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
          <p className="mt-3 text-blue-400 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-800">
          <div className="px-8 py-12 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-gray-800">
            <h1 className="text-5xl font-bold tracking-tight text-white">Plural</h1>
            <p className="mt-2 text-xl font-light italic text-gray-300">Nurture Curiosity</p>
          </div>
          
          <div className="p-8">
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">Welcome to your Dashboard</h2>
              
              {user && (
                <div className="space-y-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300"><span className="font-medium text-blue-400">Email:</span> {user.email}</p>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300"><span className="font-medium text-blue-400">User ID:</span> {user.id}</p>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300"><span className="font-medium text-blue-400">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* AI Chat Component */}
            <div className="mb-8">
              <ChatComponent />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
            
            <div className="mt-8 border-t border-gray-800 pt-6 text-gray-400">
              <h2 className="text-lg font-semibold text-gray-200">Debug Information</h2>
              <AuthDebug />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
