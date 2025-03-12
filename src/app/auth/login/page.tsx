import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import EnvTest from '@/components/EnvTest'
import AuthDebug from '@/components/AuthDebug'

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
            Plural
          </h1>
          <p className="text-lg text-gray-400 italic">
            Nurture Curiosity
          </p>
        </div>
        
        <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-8">
          <LoginForm />
        </div>
        
        <div className="mt-8 text-gray-500 text-xs">
          <EnvTest />
          <AuthDebug />
        </div>
      </div>
    </div>
  )
}
