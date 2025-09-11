import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Test basic connection
    const collections = await payload.find({
      collection: 'users',
      limit: 0, // Just get count
    })
    
    const challengeCount = await payload.find({
      collection: 'challenges', 
      limit: 0,
    })
    
    const documentCount = await payload.find({
      collection: 'documents',
      limit: 0,
    })

    return NextResponse.json({
      success: true,
      message: 'Payload CMS connection successful',
      collections: {
        users: collections.totalDocs,
        challenges: challengeCount.totalDocs,
        documents: documentCount.totalDocs,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Test connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Payload CMS',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}