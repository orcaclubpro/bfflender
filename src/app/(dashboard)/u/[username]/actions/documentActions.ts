'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload, type Payload } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'
import type { User, Document, Challenge } from '@/payload-types'

// Types for document management
export interface DocumentUploadData {
  description?: string
  tags?: string[]
  relatedChallenge?: string
  isPublic?: boolean
}

export interface DocumentUploadResponse {
  success: boolean
  message: string
  data?: Document
  errors?: Record<string, string>
}

export interface DocumentsResponse {
  success: boolean
  message: string
  data?: Document[]
  totalDocs?: number
  errors?: Record<string, string>
}

export interface DocumentDeleteResponse {
  success: boolean
  message: string
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
 * Upload a document with proper validation and relationships
 */
export async function uploadDocument(
  formData: FormData,
  uploadData?: DocumentUploadData
): Promise<DocumentUploadResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // Get the uploaded file
    const file = formData.get('file') as File
    if (!file || file.size === 0) {
      return {
        success: false,
        message: 'No file provided for upload',
        errors: { file: 'Please select a file to upload' },
      }
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return {
        success: false,
        message: 'File too large. Maximum size is 50MB.',
        errors: { file: 'File size must be less than 50MB' },
      }
    }

    // Validate file type against allowed MIME types
    const allowedMimeTypes = [
      // Document types
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Text files
      'text/plain',
      'text/csv',
      'text/rtf',
      // Images
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      // Archive files
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      // Other formats
      'application/json',
      'application/xml',
    ]

    if (!allowedMimeTypes.includes(file.type)) {
      return {
        success: false,
        message: 'File type not allowed. Please upload a PDF, Word document, image, or other supported file type.',
        errors: { file: 'Unsupported file type' },
      }
    }

    // Validate related challenge if provided
    let relatedChallenge: Challenge | null = null
    if (uploadData?.relatedChallenge) {
      try {
        relatedChallenge = await payload.findByID({
          collection: 'challenges',
          id: uploadData.relatedChallenge,
          overrideAccess: false,
          user: currentUser,
        })

        if (!relatedChallenge) {
          return {
            success: false,
            message: 'Related application not found',
            errors: { relatedChallenge: 'Invalid application ID' },
          }
        }

        // Ensure user owns the challenge
        if (relatedChallenge.user !== currentUser.id && currentUser.roles !== 'admin') {
          return {
            success: false,
            message: 'Access denied. You can only upload documents to your own applications.',
            errors: { relatedChallenge: 'Invalid application access' },
          }
        }
      } catch {
        return {
          success: false,
          message: 'Invalid application ID provided',
          errors: { relatedChallenge: 'Application not found' },
        }
      }
    }

    // Prepare document data
    const documentData = {
      description: uploadData?.description || '',
      tags: uploadData?.tags?.map(tag => ({ tag })) || [],
      relatedUser: currentUser.id,
      relatedChallenge: uploadData?.relatedChallenge || null,
      isPublic: uploadData?.isPublic || false,
      // uploadedBy is automatically set by the collection hook
    }

    // Create the document with file upload
    const createdDocument = await payload.create({
      collection: 'documents',
      data: {
        ...documentData,
      },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      overrideAccess: false,
      user: currentUser,
    })

    // If document is related to a challenge, update the challenge's documentIds array
    if (uploadData?.relatedChallenge && relatedChallenge) {
      const currentDocumentIds = relatedChallenge.documentIds || []
      const updatedDocumentIds = [
        ...currentDocumentIds,
        { documentId: createdDocument.id }
      ]

      await payload.update({
        collection: 'challenges',
        id: uploadData.relatedChallenge,
        data: {
          documentIds: updatedDocumentIds,
        },
        overrideAccess: false,
        user: currentUser,
      })
    }

    return {
      success: true,
      message: 'Document uploaded successfully',
      data: createdDocument,
    }
  } catch (error) {
    console.error('Document upload error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload document',
    }
  }
}

/**
 * Get all documents for a user
 */
export async function getDocumentsByUser(
  userId?: string,
  limit?: number,
  page?: number
): Promise<DocumentsResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()
    const targetUserId = userId || currentUser.id

    // Ensure users can only access their own documents (unless admin)
    if (targetUserId !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only view your own documents.',
      }
    }

    const documentsResult = await payload.find({
      collection: 'documents',
      where: {
        relatedUser: {
          equals: targetUserId,
        },
      },
      sort: '-createdAt',
      limit: limit || 50,
      page: page || 1,
      depth: 1, // Include related challenge info
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Documents retrieved successfully',
      data: documentsResult.docs,
      totalDocs: documentsResult.totalDocs,
    }
  } catch (error) {
    console.error('Get documents by user error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve documents',
    }
  }
}

/**
 * Get documents by challenge/application ID
 */
export async function getDocumentsByChallenge(
  challengeId: string,
  userId?: string
): Promise<DocumentsResponse> {
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
      message: 'Challenge documents retrieved successfully',
      data: documentsResult.docs,
      totalDocs: documentsResult.totalDocs,
    }
  } catch (error) {
    console.error('Get documents by challenge error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve challenge documents',
    }
  }
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(documentId: string): Promise<DocumentDeleteResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // First get the document to check ownership
    const document = await payload.findByID({
      collection: 'documents',
      id: documentId,
      overrideAccess: false,
      user: currentUser,
    })

    if (!document) {
      return {
        success: false,
        message: 'Document not found',
      }
    }

    // Ensure users can only delete their own documents (unless admin)
    if (document.relatedUser !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only delete your own documents.',
      }
    }

    // If document is related to a challenge, remove it from the challenge's documentIds array
    if (document.relatedChallenge) {
      const challengeId = typeof document.relatedChallenge === 'string' 
        ? document.relatedChallenge 
        : document.relatedChallenge.id

      const challenge = await payload.findByID({
        collection: 'challenges',
        id: challengeId,
        overrideAccess: false,
        user: currentUser,
      })

      if (challenge && challenge.documentIds) {
        const updatedDocumentIds = challenge.documentIds.filter(
          item => item.documentId !== documentId
        )

        await payload.update({
          collection: 'challenges',
          id: challengeId,
          data: {
            documentIds: updatedDocumentIds,
          },
          overrideAccess: false,
          user: currentUser,
        })
      }
    }

    // Delete the document
    await payload.delete({
      collection: 'documents',
      id: documentId,
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Document deleted successfully',
    }
  } catch (error) {
    console.error('Delete document error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete document',
    }
  }
}

/**
 * Update document metadata (description, tags, etc.)
 */
export async function updateDocument(
  documentId: string,
  updateData: {
    description?: string
    tags?: string[]
    isPublic?: boolean
  }
): Promise<DocumentUploadResponse> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    // First get the document to check ownership
    const document = await payload.findByID({
      collection: 'documents',
      id: documentId,
      overrideAccess: false,
      user: currentUser,
    })

    if (!document) {
      return {
        success: false,
        message: 'Document not found',
      }
    }

    // Ensure users can only update their own documents (unless admin)
    if (document.relatedUser !== currentUser.id && currentUser.roles !== 'admin') {
      return {
        success: false,
        message: 'Access denied. You can only update your own documents.',
      }
    }

    // Prepare update data
    const payloadUpdateData: Record<string, unknown> = {}

    if (updateData.description !== undefined) {
      payloadUpdateData.description = updateData.description
    }

    if (updateData.tags !== undefined) {
      payloadUpdateData.tags = updateData.tags.map(tag => ({ tag }))
    }

    if (updateData.isPublic !== undefined) {
      payloadUpdateData.isPublic = updateData.isPublic
    }

    // Update the document
    const updatedDocument = await payload.update({
      collection: 'documents',
      id: documentId,
      data: payloadUpdateData,
      overrideAccess: false,
      user: currentUser,
    })

    return {
      success: true,
      message: 'Document updated successfully',
      data: updatedDocument,
    }
  } catch (error) {
    console.error('Update document error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update document',
    }
  }
}

/**
 * Bulk upload documents for a specific challenge
 */
export async function bulkUploadDocuments(
  files: File[],
  uploadData: DocumentUploadData
): Promise<{ success: boolean; message: string; data?: Document[]; errors?: Record<string, string> }> {
  try {
    const { user: currentUser, payload } = await getCurrentUserAuth()

    if (!files || files.length === 0) {
      return {
        success: false,
        message: 'No files provided for upload',
        errors: { files: 'Please select files to upload' },
      }
    }

    // Validate related challenge if provided
    if (uploadData.relatedChallenge) {
      const relatedChallenge = await payload.findByID({
        collection: 'challenges',
        id: uploadData.relatedChallenge,
        overrideAccess: false,
        user: currentUser,
      })

      if (!relatedChallenge) {
        return {
          success: false,
          message: 'Related application not found',
          errors: { relatedChallenge: 'Invalid application ID' },
        }
      }

      // Ensure user owns the challenge
      if (relatedChallenge.user !== currentUser.id && currentUser.roles !== 'admin') {
        return {
          success: false,
          message: 'Access denied. You can only upload documents to your own applications.',
          errors: { relatedChallenge: 'Invalid application access' },
        }
      }
    }

    const uploadedDocuments: Document[] = []
    const errors: string[] = []

    // Process each file
    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const result = await uploadDocument(formData, uploadData)
        
        if (result.success && result.data) {
          uploadedDocuments.push(result.data)
        } else {
          errors.push(`${file.name}: ${result.message}`)
        }
      } catch {
        errors.push(`${file.name}: Upload failed`)
      }
    }

    if (uploadedDocuments.length === 0) {
      return {
        success: false,
        message: 'No files were uploaded successfully',
        errors: { files: errors.join(', ') },
      }
    }

    const message = errors.length > 0 
      ? `${uploadedDocuments.length} files uploaded successfully, ${errors.length} failed`
      : `All ${uploadedDocuments.length} files uploaded successfully`

    return {
      success: true,
      message,
      data: uploadedDocuments,
      errors: errors.length > 0 ? { files: errors.join(', ') } : undefined,
    }
  } catch (error) {
    console.error('Bulk upload documents error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload documents',
    }
  }
}