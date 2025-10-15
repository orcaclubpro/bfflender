'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload, type Payload, type Where } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User, Challenge, Document } from '@/payload-types'

// Type definitions
export interface UserWithChallenges extends User {
  challengeCount: number
  challenges?: Challenge[]
}

export interface ChallengeWithDetails extends Challenge {
  documents?: Document[]
  documentCount?: number
  user?: string | User | null
}

export interface QueriesResponse {
  success: boolean
  message: string
  data?: {
    users: UserWithChallenges[]
    totalPages: number
    totalUsers: number
    currentPage: number
  }
  errors?: Record<string, string>
}

export interface ChallengeDetailResponse {
  success: boolean
  message: string
  data?: ChallengeWithDetails
  errors?: Record<string, string>
}

export interface UpdateChallengeData {
  status?: Challenge['status']
  notes?: string
}

// Helper function to check admin access
async function checkAdminAccess(): Promise<{ user: User; payload: Payload }> {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/login')
  }

  const typedUser = user as User
  if (!typedUser.roles?.includes('admin') && typedUser.roles !== 'admin') {
    throw new Error('Access denied. Admin privileges required.')
  }

  return { user: typedUser, payload }
}

/**
 * Get all users with their challenge counts and summary
 * Admin only - for the queries management page
 */
export async function getUsersWithChallenges(
  page = 1,
  limit = 10,
  search = '',
  roleFilter = ''
): Promise<QueriesResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    // Build where query for search and filtering
    const whereQuery: Where = {}

    if (search) {
      whereQuery.or = [
        { email: { contains: search } },
        { username: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
      ]
    }

    if (roleFilter && roleFilter !== 'all') {
      whereQuery.roles = { equals: roleFilter }
    }

    // Get users with pagination
    const usersResult = await payload.find({
      collection: 'users',
      page,
      limit,
      where: whereQuery,
      sort: '-createdAt',
      depth: 0,
      overrideAccess: false,
      user,
    })

    // For each user, get their challenge count and recent challenges
    const usersWithChallenges: UserWithChallenges[] = await Promise.all(
      usersResult.docs.map(async (userData) => {
        // Get challenges for this user
        const challengesResult = await payload.find({
          collection: 'challenges',
          where: {
            user: {
              equals: userData.id,
            },
          },
          limit: 100, // Get all challenges for the user
          sort: '-submittedAt',
          depth: 0,
          overrideAccess: false,
          user,
        })

        return {
          ...userData,
          challengeCount: challengesResult.totalDocs,
          challenges: challengesResult.docs,
        }
      })
    )

    // Filter to only show users who have at least one challenge
    const filteredUsers = usersWithChallenges.filter(user => user.challengeCount > 0)

    return {
      success: true,
      message: 'Users with challenges retrieved successfully',
      data: {
        users: filteredUsers,
        totalPages: usersResult.totalPages,
        totalUsers: filteredUsers.length, // Use filtered count
        currentPage: usersResult.page || page,
      },
    }
  } catch (error) {
    console.error('Get users with challenges error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve users with challenges',
    }
  }
}

/**
 * Get a specific challenge with full details including documents and user info
 * Admin only
 */
export async function getChallengeWithDetails(
  challengeId: string
): Promise<ChallengeDetailResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    // Get the challenge with populated user
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
      depth: 2, // Populate relationships
      overrideAccess: false,
      user,
    })

    if (!challenge) {
      return {
        success: false,
        message: 'Challenge not found',
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
      depth: 0,
      overrideAccess: false,
      user,
    })

    const challengeWithDetails: ChallengeWithDetails = {
      ...challenge,
      documents: documentsResult.docs,
      documentCount: documentsResult.totalDocs,
    }

    return {
      success: true,
      message: 'Challenge details retrieved successfully',
      data: challengeWithDetails,
    }
  } catch (error) {
    console.error('Get challenge details error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve challenge details',
    }
  }
}

/**
 * Update challenge status and notes
 * Admin only
 */
export async function updateChallengeDetails(
  challengeId: string,
  updateData: UpdateChallengeData
): Promise<ChallengeDetailResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!challengeId) {
      return {
        success: false,
        message: 'Challenge ID is required',
      }
    }

    // Validate status if provided
    if (updateData.status) {
      const validStatuses = [
        'submitted',
        'pending_verification',
        'verified',
        'in_progress',
        'completed',
        'rejected',
      ]
      if (!validStatuses.includes(updateData.status)) {
        return {
          success: false,
          message: 'Invalid status provided',
        }
      }
    }

    const updatePayload: Record<string, unknown> = {}

    if (updateData.status) {
      updatePayload.status = updateData.status

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
    }

    if (updateData.notes !== undefined) {
      updatePayload.notes = updateData.notes
    }

    const updatedChallenge = await payload.update({
      collection: 'challenges',
      id: challengeId,
      data: updatePayload,
      depth: 2,
      overrideAccess: false,
      user,
    })

    // Get associated documents
    const documentsResult = await payload.find({
      collection: 'documents',
      where: {
        relatedChallenge: {
          equals: challengeId,
        },
      },
      sort: '-createdAt',
      depth: 0,
      overrideAccess: false,
      user,
    })

    const challengeWithDetails: ChallengeWithDetails = {
      ...updatedChallenge,
      documents: documentsResult.docs,
      documentCount: documentsResult.totalDocs,
    }

    return {
      success: true,
      message: 'Challenge updated successfully',
      data: challengeWithDetails,
    }
  } catch (error) {
    console.error('Update challenge error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update challenge',
    }
  }
}

/**
 * Get all challenges for a specific user
 * Admin only - for viewing user's application history
 */
export async function getUserChallengesDetailed(
  userId: string
): Promise<{
  success: boolean
  message: string
  data?: ChallengeWithDetails[]
  errors?: Record<string, string>
}> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      }
    }

    // Verify user exists
    const targetUser = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
      overrideAccess: false,
      user,
    })

    if (!targetUser) {
      return {
        success: false,
        message: 'User not found',
      }
    }

    // Get all challenges for the user
    const challengesResult = await payload.find({
      collection: 'challenges',
      where: {
        user: {
          equals: userId,
        },
      },
      sort: '-submittedAt',
      depth: 1,
      pagination: false, // Get all challenges
      overrideAccess: false,
      user,
    })

    // For each challenge, get document count
    const challengesWithDetails: ChallengeWithDetails[] = await Promise.all(
      challengesResult.docs.map(async (challenge) => {
        const documentsResult = await payload.find({
          collection: 'documents',
          where: {
            relatedChallenge: {
              equals: challenge.id,
            },
          },
          limit: 1,
          depth: 0,
          overrideAccess: false,
          user,
        })

        return {
          ...challenge,
          documentCount: documentsResult.totalDocs,
        }
      })
    )

    return {
      success: true,
      message: 'User challenges retrieved successfully',
      data: challengesWithDetails,
    }
  } catch (error) {
    console.error('Get user challenges detailed error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve user challenges',
    }
  }
}

/**
 * Get challenge statistics for admin dashboard
 * Admin only
 */
export async function getChallengeStatistics(): Promise<{
  success: boolean
  message: string
  data?: {
    total: number
    pending: number
    verified: number
    inProgress: number
    completed: number
    rejected: number
  }
  errors?: Record<string, string>
}> {
  try {
    const { user, payload } = await checkAdminAccess()

    // Get counts for each status
    const [total, pending, verified, inProgress, completed, rejected] = await Promise.all([
      payload.count({ collection: 'challenges', overrideAccess: false, user }),
      payload.count({
        collection: 'challenges',
        where: { status: { equals: 'pending_verification' } },
        overrideAccess: false,
        user,
      }),
      payload.count({
        collection: 'challenges',
        where: { status: { equals: 'verified' } },
        overrideAccess: false,
        user,
      }),
      payload.count({
        collection: 'challenges',
        where: { status: { equals: 'in_progress' } },
        overrideAccess: false,
        user,
      }),
      payload.count({
        collection: 'challenges',
        where: { status: { equals: 'completed' } },
        overrideAccess: false,
        user,
      }),
      payload.count({
        collection: 'challenges',
        where: { status: { equals: 'rejected' } },
        overrideAccess: false,
        user,
      }),
    ])

    return {
      success: true,
      message: 'Challenge statistics retrieved successfully',
      data: {
        total: total.totalDocs,
        pending: pending.totalDocs,
        verified: verified.totalDocs,
        inProgress: inProgress.totalDocs,
        completed: completed.totalDocs,
        rejected: rejected.totalDocs,
      },
    }
  } catch (error) {
    console.error('Get challenge statistics error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve challenge statistics',
    }
  }
}
