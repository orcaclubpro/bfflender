'use server'

import { logout } from '@payloadcms/next/auth'
import { redirect } from 'next/navigation'
import config from '@/payload.config'

export async function logoutAction() {
  try {
    // Use Payload's built-in logout function with allSessions for better security
    await logout({
      allSessions: true, // Log out from all sessions for enhanced security
      config,
    })

    // Redirect to login page after successful logout
    redirect('/login')
  } catch (error) {
    console.error('Logout error:', error)
    
    // Still redirect to login page even if there's an error
    // This ensures the user is logged out from the frontend perspective
    redirect('/login')
  }
}