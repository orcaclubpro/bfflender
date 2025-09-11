'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { 
  PasswordVerificationSchema,
  PasswordVerificationFormState 
} from '@/lib/validations'
import { redirect } from 'next/navigation'

/**
 * Get challenge data by ID for pre-filling the form
 */
export async function getChallengeData(challengeId: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
    })

    if (!challenge) {
      return { error: 'Challenge not found' }
    }

    if (challenge.user) {
      return { error: 'Challenge has already been verified' }
    }

    return {
      email: challenge.email,
      name: challenge.name,
      challengeId: challenge.id,
    }
  } catch (error) {
    console.error('Challenge data fetch error:', error)
    return { error: 'Failed to fetch challenge data' }
  }
}

/**
 * Create user account with password verification (single step)
 */
export async function createOwnerAccount(
  prevState: PasswordVerificationFormState,
  formData: FormData
): Promise<PasswordVerificationFormState> {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Validate form data
    const validatedFields = PasswordVerificationSchema.safeParse({
      challengeId: formData.get('challengeId'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { challengeId, password } = validatedFields.data

    // Get the challenge
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
    })

    if (!challenge) {
      return {
        errors: {
          general: ['Challenge not found'],
        },
      }
    }

    if (challenge.user) {
      return {
        errors: {
          general: ['This challenge has already been verified'],
        },
      }
    }

    // Check if user already exists with this email
    const existingUserQuery = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: challenge.email,
        },
      },
      limit: 1,
    })

    if (existingUserQuery.docs.length > 0) {
      return {
        errors: {
          general: ['An account with this email already exists'],
        },
      }
    }

    // Generate username from name if not provided
    const generateUsername = (name: string): string => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 15) + Math.random().toString(36).substring(2, 6)
    }

    const username = generateUsername(challenge.name)

    // Create the user
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: challenge.email,
        password: password,
        firstName: challenge.name.split(' ')[0] || challenge.name,
        lastName: challenge.name.split(' ').slice(1).join(' ') || '',
        username: username,
        roles: 'client',
      },
    })

    // Update the challenge to link to the user
    await payload.update({
      collection: 'challenges',
      id: challengeId,
      data: {
        user: newUser.id,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
      },
    })

    // Find and update all documents associated with this challenge
    const documentsQuery = await payload.find({
      collection: 'documents',
      where: {
        challengeId: {
          equals: challengeId,
        },
      },
    })

    // Update documents to link to the user
    for (const document of documentsQuery.docs) {
      await payload.update({
        collection: 'documents',
        id: document.id,
        data: {
          relatedUser: newUser.id,
        },
      })
    }

    return {
      success: true,
      message: 'Account created successfully! Redirecting to your dashboard...',
      redirectUrl: `/u/${username}`,
    }
  } catch (error) {
    console.error('User creation error:', error)
    return {
      errors: {
        general: ['An error occurred while creating your account. Please try again.'],
      },
    }
  }
}

/**
 * Complete user creation and redirect
 */
export async function completeUserCreation(redirectUrl: string) {
  redirect(redirectUrl)
}