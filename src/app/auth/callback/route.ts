import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')

    if (error) {
      console.error('OAuth error:', error, error_description)
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent(error_description || error)}`, request.url)
      )
    }

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(sessionError.message)}`, request.url)
        )
      }
    }

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(
      new URL('/auth/login?error=An unexpected error occurred', request.url)
    )
  }
}
