import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const OWNER_PASSWORD = process.env.OWNER_VERIFICATION_PASSWORD || 'bfflender2024'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const { challengeId, password, email } = await request.json()
    
    if (!challengeId || !password || !email) {
      return NextResponse.json(
        { error: 'Challenge ID, password, and email are required' },
        { status: 400 }
      )
    }

    // Verify owner password
    if (password !== OWNER_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid owner password' },
        { status: 401 }
      )
    }

    // Get the challenge record
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
    })

    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      )
    }

    // Verify email matches challenge email
    if (challenge.email !== email) {
      return NextResponse.json(
        { error: 'Email does not match challenge submission' },
        { status: 400 }
      )
    }

    // Check if user already exists
    let user
    try {
      const existingUsers = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      user = existingUsers.docs.length > 0 ? existingUsers.docs[0] : null
    } catch (_error) {
      console.log('User search error (expected if none exist):', _error)
    }

    // Create user if doesn't exist
    if (!user) {
      // Extract username from email (part before @)
      const username = email.split('@')[0].toLowerCase()
        // Ensure username is valid (alphanumeric, underscore, hyphen only)
        .replace(/[^a-z0-9_-]/g, '')
        // Ensure minimum length
        .padEnd(3, '123')

      // Check if username is already taken
      let finalUsername = username
      let attempts = 0
      let usernameExists = true

      while (usernameExists && attempts < 10) {
        try {
          const existingUser = await payload.find({
            collection: 'users',
            where: {
              username: {
                equals: finalUsername,
              },
            },
          })
          
          if (existingUser.docs.length === 0) {
            usernameExists = false
          } else {
            attempts++
            finalUsername = `${username}${attempts}`
          }
        } catch {
          // If search fails, assume username is available
          usernameExists = false
        }
      }

      // Generate a temporary password (user can change later)
      const tempPassword = `temp${Date.now().toString().slice(-6)}`

      try {
        user = await payload.create({
          collection: 'users',
          data: {
            email,
            password: tempPassword,
            username: finalUsername,
            roles: 'client',
            firstName: challenge.name.split(' ')[0] || '',
            lastName: challenge.name.split(' ').slice(1).join(' ') || '',
          },
        })

        console.log(`Created user: ${email} with username: ${finalUsername} and temp password: ${tempPassword}`)
      } catch (userCreateError) {
        console.error('Failed to create user:', userCreateError)
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        )
      }
    }

    // Update challenge with user relationship and status
    const updatedChallenge = await payload.update({
      collection: 'challenges',
      id: challengeId,
      data: {
        user: user.id,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
      },
    })

    // Update related documents to link to the user
    if (challenge.documentIds && challenge.documentIds.length > 0) {
      for (const docRef of challenge.documentIds) {
        try {
          await payload.update({
            collection: 'documents',
            id: docRef.documentId,
            data: {
              relatedUser: user.id,
            },
          })
        } catch (docUpdateError) {
          console.error(`Failed to update document ${docRef.documentId}:`, docUpdateError)
          // Continue with other documents even if one fails
        }
      }
    }

    // Log the verification for tracking
    console.log('Challenge verification completed:', {
      challengeId,
      userId: user.id,
      userEmail: email,
      username: user.username,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Owner verification successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      },
      challenge: {
        id: updatedChallenge.id,
        status: updatedChallenge.status,
        verifiedAt: updatedChallenge.verifiedAt,
      },
      dashboardUrl: `/u/${user.username}`,
    })
  } catch (error) {
    console.error('Owner verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify owner' },
      { status: 500 }
    )
  }
}

// GET endpoint to check challenge status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const challengeId = searchParams.get('challengeId')

    if (!challengeId) {
      return NextResponse.json(
        { error: 'Challenge ID is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })
    
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
    })

    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      )
    }

    // Return basic challenge info without sensitive data
    return NextResponse.json({
      id: challenge.id,
      name: challenge.name,
      email: challenge.email,
      status: challenge.status,
      submittedAt: challenge.submittedAt,
      verifiedAt: challenge.verifiedAt,
    })
  } catch (error) {
    console.error('Challenge status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check challenge status' },
      { status: 500 }
    )
  }
}