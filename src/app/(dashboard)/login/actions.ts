'use server'

import { login } from '@payloadcms/next/auth'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

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
      // The login result might not include custom fields like username
      // So we need to fetch the full user data to get the username
      const payload = await getPayload({ config })
      
      const fullUser = await payload.findByID({
        collection: 'users',
        id: result.user.id,
        depth: 0, // We don't need relationship population, just the user fields
      })

      if (fullUser.username) {
        // Successful login - redirect to user dashboard
        redirect(`/u/${fullUser.username}`)
      } else {
        // Fallback if username is still not available
        console.error('Username not found for user:', fullUser.id)
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
    return {
      success: false,
      message: 'Login failed. Please check your credentials and try again.'
    }
  }
}