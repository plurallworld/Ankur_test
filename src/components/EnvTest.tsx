'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function EnvTest() {
  const supabase = createClientComponentClient()
  
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...')
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      // Only log the first 10 characters of the key for security
      console.log('ANON KEY (first 10 chars):', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10))
      
      const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
      
      if (error) {
        console.log('Connection test error:', error.message)
        return
      }
      
      console.log('Supabase connection successful!')
    } catch (error) {
      console.error('Test failed:', error)
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={testConnection}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
      >
        Test Environment Variables
      </button>
    </div>
  )
}
