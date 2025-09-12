'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ClientRedirectProps {
  isLoggedIn: boolean
  username: string
  returnUrl?: string
}

export default function ClientRedirect({ isLoggedIn, username, returnUrl }: ClientRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn && username) {
      // User is already logged in, redirect them to their dashboard or return URL
      const redirectUrl = returnUrl && returnUrl.startsWith('/u/') 
        ? returnUrl 
        : `/u/${username}`
      
      console.log(`User already logged in, redirecting to: ${redirectUrl}`)
      router.replace(redirectUrl)
    }
  }, [isLoggedIn, username, returnUrl, router])

  // This component doesn't render anything visible
  return null
}