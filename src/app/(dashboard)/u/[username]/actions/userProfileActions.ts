'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload, type Payload } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User } from '@/payload-types'

// Type definitions for profile management
export interface UserProfileFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  employmentStatus: 'employed' | 'self-employed' | 'contract' | 'retired' | 'unemployed' | 'student' | ''
  employer: string
  annualIncome: string
}

export interface UserProfileUpdateData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  employmentStatus?: 'employed' | 'self-employed' | 'contract' | 'retired' | 'unemployed' | 'student'
  employer?: string
  annualIncome?: number
}

export interface UserProfileResponse {
  success: boolean
  message: string
  data?: User
  errors?: Record<string, string>
}

// Helper function to get current user with authentication
async function getCurrentUserAuth(): Promise<{ user: User; payload: Payload }> {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/login')
  }

  return { user: user as User, payload }
}

/**
 * Get current user profile data
 */
export async function getUserProfile(userId?: string): Promise<UserProfileResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // If no userId provided, use current user
    const targetUserId = userId || currentUser.id

    // Ensure users can only access their own profile (unless admin)
    if (targetUserId !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view your own profile.',
      }
    }

    const userProfile = await payload.findByID({
      collection: 'users',
      id: targetUserId,
      depth: 0,
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: userProfile,
    }
  } catch (error) {
    console.error('Get user profile error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve profile',
    }
  }
}

/**
 * Update user profile data
 */
export async function updateUserProfile(
  formData: UserProfileFormData,
  userId?: string
): Promise<UserProfileResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // If no userId provided, use current user
    const targetUserId = userId || currentUser.id

    // Ensure users can only update their own profile (unless admin)
    if (targetUserId !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only update your own profile.',
      }
    }

    // Validate required fields
    const errors: Record<string, string> = {}

    if (!formData.firstName?.trim()) {
      errors.firstName = 'First name is required'
    }

    if (!formData.lastName?.trim()) {
      errors.lastName = 'Last name is required'
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Validate phone number if provided
    if (formData.phone && !/^[\d\s\(\)\-\+\.]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    // Validate ZIP code if provided
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
    }

    // Validate annual income if provided
    const annualIncomeNum = formData.annualIncome ? parseFloat(formData.annualIncome) : null
    if (formData.annualIncome && (isNaN(annualIncomeNum!) || annualIncomeNum! < 0)) {
      errors.annualIncome = 'Please enter a valid annual income'
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please fix the validation errors',
        errors,
      }
    }

    // Check if email is already taken by another user
    if (formData.email !== currentUser.email) {
      const existingUser = await payload.find({
        collection: 'users',
        where: {
          and: [
            { email: { equals: formData.email } },
            { id: { not_equals: targetUserId } },
          ],
        },
        limit: 1,
        overrideAccess: false,
        user: currentUser,
      })

      if (existingUser.docs.length > 0) {
        return {
          success: false,
          message: 'A user with this email address already exists',
          errors: { email: 'This email address is already in use' },
        }
      }
    }

    // Prepare update data
    const updateData: UserProfileUpdateData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || undefined,
      address: formData.address?.trim() || undefined,
      city: formData.city?.trim() || undefined,
      state: formData.state?.trim() || undefined,
      zipCode: formData.zipCode?.trim() || undefined,
      employmentStatus: formData.employmentStatus !== '' ? formData.employmentStatus as ('employed' | 'self-employed' | 'contract' | 'retired' | 'unemployed' | 'student' | undefined) : undefined,
      employer: formData.employer?.trim() || undefined,
      annualIncome: annualIncomeNum || undefined,
    }

    // Update the user profile
    const updatedUser = await payload.update({
      collection: 'users',
      id: targetUserId,
      data: updateData,
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    }
  } catch (error) {
    console.error('Update user profile error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    }
  }
}

/**
 * Get a user profile by username (for dashboard access)
 */
export async function getUserProfileByUsername(username: string): Promise<UserProfileResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    const userResult = await payload.find({
      collection: 'users',
      where: {
        username: { equals: username },
      },
      limit: 1,
      depth: 0,
      overrideAccess: false,
      user: currentUser,
    })

    if (userResult.docs.length === 0) {
      return {
        success: false,
        message: 'User not found',
      }
    }

    const targetUser = userResult.docs[0]

    // Ensure users can only access their own profile (unless admin)
    if (targetUser.id !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view your own profile.',
      }
    }

    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: targetUser,
    }
  } catch (error) {
    console.error('Get user profile by username error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve profile',
    }
  }
}