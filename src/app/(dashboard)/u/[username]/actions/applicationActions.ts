'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload, type Payload } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User, Challenge, Document } from '@/payload-types'

// Types for application management
export interface ApplicationData extends Challenge {
  documents?: Document[]
  documentCount?: number
}

export interface ApplicationResponse {
  success: boolean
  message: string
  data?: ApplicationData[]
  errors?: Record<string, string>
}

export interface SingleApplicationResponse {
  success: boolean
  message: string
  data?: ApplicationData
  errors?: Record<string, string>
}

export interface ApplicationStatusUpdateData {
  status: Challenge['status']
  notes?: string
}

export interface ApplicationStatusResponse {
  success: boolean
  message: string
  data?: Challenge
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
 * Get all applications/challenges for a user with populated documents
 */
export async function getUserApplications(userId?: string): Promise<ApplicationResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()
    const targetUserId = userId || currentUser.id

    // Ensure users can only access their own applications (unless admin)
    if (targetUserId !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view your own applications.',
      }
    }

    // Get all challenges for the user
    const challengesResult = await payload.find({
      collection: 'challenges',
      where: {
        user: {
          equals: targetUserId,
        },
      },
      sort: '-createdAt', // Most recent first
      depth: 1,
      overrideAccess: false,
      user: currentUser,
    })

    // For each challenge, get associated documents
    const applicationsWithDocuments: ApplicationData[] = []

    for (const challenge of challengesResult.docs) {
      // Find documents related to this challenge
      const documentsResult = await payload.find({
        collection: 'documents',
        where: {
          relatedChallenge: {
            equals: challenge.id,
          },
        },
        sort: '-createdAt',
        overrideAccess: false,
        user: currentUser,
      })

      applicationsWithDocuments.push({
        ...challenge,
        documents: documentsResult.docs,
        documentCount: documentsResult.totalDocs,
      })
    }

    return {
      success: true,
      message: 'Applications retrieved successfully',
      data: applicationsWithDocuments,
    }
  } catch (error) {
    console.error('Get user applications error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve applications',
    }
  }
}

/**
 * Get a specific application/challenge by ID with populated documents
 */
export async function getApplicationById(
  challengeId: string,
  userId?: string
): Promise<SingleApplicationResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()
    const targetUserId = userId || currentUser.id

    // Get the challenge
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
      depth: 1,
      overrideAccess: false,
      user: currentUser,
    })

    if (!challenge) {
      return {
        success: false,
        message: 'Application not found',
      }
    }

    // Ensure users can only access their own applications (unless admin)
    if (challenge.user !== targetUserId && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view your own applications.',
      }
    }

    // Get associated documents
    const documentsResult = await payload.find({
      collection: 'documents',
      where: {
        relatedChallenge: {
          equals: challengeId,
        },
      },
      sort: '-createdAt',
      overrideAccess: false,
      user: currentUser,
    })

    const applicationWithDocuments: ApplicationData = {
      ...challenge,
      documents: documentsResult.docs,
      documentCount: documentsResult.totalDocs,
    }

    return {
      success: true,
      message: 'Application retrieved successfully',
      data: applicationWithDocuments,
    }
  } catch (error) {
    console.error('Get application by ID error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve application',
    }
  }
}

/**
 * Update application/challenge status (admin only)
 */
export async function updateApplicationStatus(
  challengeId: string,
  updateData: ApplicationStatusUpdateData
): Promise<ApplicationStatusResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // Only admins can update application status
    if (currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. Only administrators can update application status.',
      }
    }

    // Validate status
    const validStatuses = ['submitted', 'pending_verification', 'verified', 'in_progress', 'completed', 'rejected']
    if (!validStatuses.includes(updateData.status)) {
      return {
        success: false,
        message: 'Invalid status provided',
      }
    }

    const updatePayload: Record<string, unknown> = {
      status: updateData.status,
    }

    if (updateData.notes) {
      updatePayload.notes = updateData.notes
    }

    // Auto-set timestamps based on status
    const now = new Date().toISOString()
    switch (updateData.status) {
      case 'verified':
        updatePayload.verifiedAt = now
        break
      case 'completed':
        updatePayload.completedAt = now
        break
    }

    const updatedChallenge = await payload.update({
      collection: 'challenges',
      id: challengeId,
      data: updatePayload,
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Application status updated successfully',
      data: updatedChallenge,
    }
  } catch (error) {
    console.error('Update application status error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update application status',
    }
  }
}

/**
 * Get application documents by challenge ID
 */
export async function getApplicationDocuments(
  challengeId: string,
  userId?: string
): Promise<{ success: boolean; message: string; data?: Document[]; errors?: Record<string, string> }> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()
    const targetUserId = userId || currentUser.id

    // First verify the user has access to this challenge
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
      overrideAccess: false,
      user: currentUser,
    })

    if (!challenge) {
      return {
        success: false,
        message: 'Application not found',
      }
    }

    // Ensure users can only access documents for their own applications
    if (challenge.user !== targetUserId && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view documents for your own applications.',
      }
    }

    // Get documents for this challenge
    const documentsResult = await payload.find({
      collection: 'documents',
      where: {
        relatedChallenge: {
          equals: challengeId,
        },
      },
      sort: '-createdAt',
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Documents retrieved successfully',
      data: documentsResult.docs,
    }
  } catch (error) {
    console.error('Get application documents error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve documents',
    }
  }
}

// Timeline generation moved to component file to avoid server action restrictions