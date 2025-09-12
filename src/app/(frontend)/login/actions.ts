'use server'

import { login } from '@payloadcms/next/auth'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User } from '@/payload-types'

interface LoginResult {
  success: boolean
  message?: string
}

/**
 * Get role-based redirect URL for authenticated user
 */
function getRoleBasedRedirect(user: User, returnUrl?: string): string {
  // If there's a return URL, validate it's safe and use it
  if (returnUrl) {
    try {
      const url = new URL(returnUrl, 'http://localhost')
      // Only allow internal paths that start with /u/ or are dashboard routes
      if (url.pathname.startsWith('/u/') || url.pathname.startsWith('/admin')) {
        return returnUrl
      }
    } catch {
      // Invalid URL, fall through to default logic
    }
  }

  // Role-based redirect logic
  if (user.roles === 'admin') {
    // Admin users get redirected to their dashboard (which shows admin interface)
    return `/u/${user.username}`
  } else {
    // Client users get redirected to their client dashboard
    return `/u/${user.username}`
  }
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const returnUrl = formData.get('returnUrl') as string | undefined

  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required'
    }
  }

  try {
    const result = await login({
      collection: 'users',
      config,
      email,
      password,
    })

    if (result.user) {
      // Use the user data from JWT claims directly (no additional database fetch needed)
      // The login result includes all saveToJWT fields: username, roles
      const user = result.user as User

      if (user.username) {
        // Get role-based redirect URL
        const redirectUrl = getRoleBasedRedirect(user, returnUrl)
        
        console.log(`User ${user.email} (${user.roles}) logged in successfully, redirecting to: ${redirectUrl}`)
        redirect(redirectUrl)
      } else {
        console.error('Username not found for user:', user.id)
        return {
          success: false,
          message: 'User account configuration incomplete. Please contact support.'
        }
      }
    }

    return {
      success: false,
      message: 'Invalid credentials'
    }
  } catch (error) {
    console.error('Login error:', error)
    
    // Handle specific Payload auth errors
    if (error instanceof Error) {
      if (error.message.includes('The email or password provided is incorrect')) {
        return {
          success: false,
          message: 'Invalid email or password'
        }
      }
      if (error.message.includes('locked')) {
        return {
          success: false,
          message: 'Account temporarily locked due to too many failed attempts. Please try again later.'
        }
      }
      if (error.message.includes('verify')) {
        return {
          success: false,
          message: 'Please verify your email address before logging in.'
        }
      }
    }

    return {
      success: false,
      message: 'Login failed. Please check your credentials and try again.'
    }
  }
}