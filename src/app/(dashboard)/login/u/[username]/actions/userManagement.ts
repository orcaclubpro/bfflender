'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload, type Payload, type Where } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User } from '@/payload-types'

// Type definitions for user management
export interface UserData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  roles: 'admin' | 'client'
}

export interface UpdateUserData {
  email?: string
  firstName?: string
  lastName?: string
  username?: string
  roles?: 'admin' | 'client'
}

export interface UserManagementResponse {
  success: boolean
  message: string
  data?: unknown
}

// Helper function to check if user is admin
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
 * Get all users with pagination and filtering
 */
export async function getUsers(
  page = 1,
  limit = 10,
  search = '',
  roleFilter = ''
): Promise<UserManagementResponse> {
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

    const result = await payload.find({
      collection: 'users',
      page,
      limit,
      where: whereQuery,
      sort: '-createdAt',
      depth: 0,
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    }
  } catch (error) {
    console.error('Get users error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve users',
    }
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: UserData): Promise<UserManagementResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    // Validate required fields
    if (!userData.email || !userData.password || !userData.firstName || 
        !userData.lastName || !userData.username || !userData.roles) {
      return {
        success: false,
        message: 'All fields are required',
      }
    }

    // Check if username already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        or: [
          { email: { equals: userData.email } },
          { username: { equals: userData.username } },
        ],
      },
      limit: 1,
      overrideAccess: false,
      user,
    })

    if (existingUser.docs.length > 0) {
      return {
        success: false,
        message: 'A user with this email or username already exists',
      }
    }

    const newUser = await payload.create({
      collection: 'users',
      data: userData,
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'User created successfully',
      data: newUser,
    }
  } catch (error) {
    console.error('Create user error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create user',
    }
  }
}

/**
 * Update an existing user
 */
export async function updateUser(
  userId: string,
  updateData: UpdateUserData
): Promise<UserManagementResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      }
    }

    // Check if username/email already exists (exclude current user)
    if (updateData.email || updateData.username) {
      const whereConditions: Where[] = []
      
      if (updateData.email) {
        whereConditions.push({ email: { equals: updateData.email } })
      }
      
      if (updateData.username) {
        whereConditions.push({ username: { equals: updateData.username } })
      }

      const existingUser = await payload.find({
        collection: 'users',
        where: {
          and: [
            { id: { not_equals: userId } },
            { or: whereConditions },
          ],
        },
        limit: 1,
        overrideAccess: false,
        user,
      })

      if (existingUser.docs.length > 0) {
        return {
          success: false,
          message: 'A user with this email or username already exists',
        }
      }
    }

    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: updateData,
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    }
  } catch (error) {
    console.error('Update user error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update user',
    }
  }
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<UserManagementResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      }
    }

    // Prevent self-deletion
    if (user.id === userId) {
      return {
        success: false,
        message: 'You cannot delete your own account',
      }
    }

    const deletedUser = await payload.delete({
      collection: 'users',
      id: userId,
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    }
  } catch (error) {
    console.error('Delete user error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete user',
    }
  }
}

/**
 * Get a single user by ID
 */
export async function getUserById(userId: string): Promise<UserManagementResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      }
    }

    const foundUser = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'User retrieved successfully',
      data: foundUser,
    }
  } catch (error) {
    console.error('Get user by ID error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve user',
    }
  }
}

/**
 * Reset user password (admin only)
 */
export async function resetUserPassword(
  userId: string,
  newPassword: string
): Promise<UserManagementResponse> {
  try {
    const { user, payload } = await checkAdminAccess()

    if (!userId || !newPassword) {
      return {
        success: false,
        message: 'User ID and new password are required',
      }
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long',
      }
    }

    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: {
        password: newPassword,
      },
      overrideAccess: false,
      user,
    })

    return {
      success: true,
      message: 'Password reset successfully',
      data: updatedUser,
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to reset password',
    }
  }
}