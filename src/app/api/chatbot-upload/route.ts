import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const goal = formData.get('goal') as string
    const experience = formData.get('experience') as string
    const volume = formData.get('volume') as string
    const challenge = formData.get('challenge') as string
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Convert file to buffer for Payload CMS upload
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Create document entry in Documents collection
    const document = await payload.create({
      collection: 'documents',
      data: {
        documentType: 'initial-submission',
        description: `P&L document from chatbot submission by ${name}`,
        tags: [
          { tag: 'chatbot-upload' },
          { tag: 'p-and-l' },
          { tag: 'challenge' }
        ],
        isPublic: false,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: buffer.length,
      },
    })

    // Create challenge entry with all chatbot data
    const challengeData = {
      name,
      email,
      answers: {
        question1: goal || 'Not provided',
        question2: experience || 'Not provided', 
        question3: volume || 'Not provided',
        additionalInfo: challenge || 'Not provided'
      },
      documentIds: [
        { documentId: document.id }
      ],
      status: 'pending_verification' as const,
      submittedAt: new Date().toISOString()
    }

    const challengeRecord = await payload.create({
      collection: 'challenges',
      data: challengeData,
    })

    // Update document to link to challenge
    await payload.update({
      collection: 'documents',
      id: document.id,
      data: {
        relatedChallenge: challengeRecord.id,
      },
    })

    // Check if user already exists with this email
    const existingUserQuery = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    let redirectUrl = `/owner?challenge=${challengeRecord.id}`
    let message = 'Challenge created successfully'

    if (existingUserQuery.docs.length > 0) {
      // User already exists - link challenge and documents to existing user
      const existingUser = existingUserQuery.docs[0]

      // Update challenge to link to existing user and mark as verified
      await payload.update({
        collection: 'challenges',
        id: challengeRecord.id,
        data: {
          user: existingUser.id,
          status: 'verified',
          verifiedAt: new Date().toISOString(),
        },
      })

      // Update document to link to existing user
      await payload.update({
        collection: 'documents',
        id: document.id,
        data: {
          relatedUser: existingUser.id,
          uploadedBy: existingUser.id,
        },
      })

      // Redirect to login page with message
      redirectUrl = `/login?returning=true&challenge=${challengeRecord.id}`
      message = 'Challenge linked to existing account - please log in to continue'

      console.log('Challenge auto-linked to existing user:', {
        challengeId: challengeRecord.id,
        userId: existingUser.id,
        email: existingUser.email,
      })
    }

    // Log the submission for tracking
    console.log('Chatbot challenge submission:', {
      challengeId: challengeRecord.id,
      documentId: document.id,
      filename: file.name,
      user: { name, email },
      chatbotData: { goal, experience, volume, challenge },
      timestamp: new Date().toISOString(),
      autoLinked: existingUserQuery.docs.length > 0,
    })

    return NextResponse.json({
      success: true,
      challengeId: challengeRecord.id,
      documentId: document.id,
      filename: document.filename,
      redirectUrl,
      message,
    })
  } catch (error) {
    console.error('Chatbot upload error:', error)
    
    // If we get here, try to clean up any partial records
    // This is a best-effort cleanup - if it fails, we'll log but not error
    try {
      const _payload = await getPayload({ config })
      // Note: In a production system, you'd want more sophisticated cleanup
      // For now, we'll just log the error and let manual cleanup handle it
      console.error('Failed to create challenge, manual cleanup may be needed')
      // TODO: Implement cleanup logic using payload if needed
    } catch (cleanupError) {
      console.error('Cleanup also failed:', cleanupError)
    }

    return NextResponse.json(
      { error: 'Failed to create challenge' },
      { status: 500 }
    )
  }
}