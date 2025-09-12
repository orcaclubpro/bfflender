import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware for basic route protection and cookie validation
 * Note: Full auth validation happens at the page level due to Edge runtime limitations
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/login') ||
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/benefits') ||
    pathname.startsWith('/challenge') ||
    pathname.startsWith('/contact') ||
    pathname.includes('.') // Skip for static files
  ) {
    return NextResponse.next()
  }

  // Basic protection for dashboard routes (/u/*)
  if (pathname.startsWith('/u/')) {
    // Check for common Payload auth cookie patterns
    const payloadToken = request.cookies.get('payload-token') || 
                         request.cookies.get('payload_token') ||
                         request.cookies.get('users-token') ||
                         request.cookies.get('users_token')
    
    if (!payloadToken) {
      // No auth cookie found, redirect to login with return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      loginUrl.searchParams.set('error', 'You must be logged in to access this page.')
      
      return NextResponse.redirect(loginUrl)
    }

    // Cookie exists, let the page handle full auth validation
    // This provides a fast redirect for completely unauthenticated users
    // while full validation (including role checks) happens at the page level
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}