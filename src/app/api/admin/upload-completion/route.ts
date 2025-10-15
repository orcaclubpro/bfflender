import { NextRequest, NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { User } from '@/payload-types'

export async function POST(request: NextRequest) {
  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Check admin authentication
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const typedUser = user as User
    if (!typedUser.roles?.includes('admin') && typedUser.roles !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    const challengeId = formData.get('challengeId') as string

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!userId || !challengeId) {
      return NextResponse.json(
        { error: 'userId and challengeId are required' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, Word, Excel, or image files only.' },
        { status: 400 }
      )
    }

    // Verify challenge exists and belongs to user
    const challenge = await payload.findByID({
      collection: 'challenges',
      id: challengeId,
      depth: 0,
      overrideAccess: false,
      user: typedUser,
    })

    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      )
    }

    // Verify challenge belongs to the specified user
    if (challenge.user !== userId && typeof challenge.user === 'object' && challenge.user?.id !== userId) {
      return NextResponse.json(
        { error: 'Challenge does not belong to the specified user' },
        { status: 400 }
      )
    }

    // Verify target user exists
    const targetUser = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
      overrideAccess: false,
      user: typedUser,
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Convert file to buffer for Payload CMS upload
    const buffer = Buffer.from(await file.arrayBuffer())

    // Create document entry in Documents collection
    const document = await payload.create({
      collection: 'documents',
      data: {
        documentType: 'completion-document',
        description: `Completion document for ${targetUser.firstName || targetUser.email}'s challenge`,
        tags: [
          { tag: 'admin-upload' },
          { tag: 'completion-document' },
          { tag: 'challenge' }
        ],
        isPublic: false,
        relatedUser: userId,
        relatedChallenge: challengeId,
        uploadedBy: typedUser.id,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: buffer.length,
      },
      overrideAccess: false,
      user: typedUser,
    })

    // Update challenge to include new document ID
    const currentDocumentIds = challenge.documentIds || []
    await payload.update({
      collection: 'challenges',
      id: challengeId,
      data: {
        documentIds: [
          ...currentDocumentIds,
          { documentId: document.id }
        ],
      },
      overrideAccess: false,
      user: typedUser,
    })

    // Log the upload for tracking
    console.log('Admin completion document upload:', {
      documentId: document.id,
      filename: file.name,
      challengeId,
      userId,
      uploadedBy: typedUser.email,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      documentId: document.id,
      filename: document.filename,
      message: 'Completion document uploaded successfully',
    })
  } catch (error) {
    console.error('Admin upload error:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload completion document' },
      { status: 500 }
    )
  }
}
