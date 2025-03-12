import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return new NextResponse(null, { status: 500 })
  }

  return NextResponse.redirect(new URL('/auth/login', request.url))
}
