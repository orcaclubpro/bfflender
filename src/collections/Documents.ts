import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    read: () => true,
    // Allow creation without user for chatbot uploads, but require user for manual uploads
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'documentType',
      type: 'select',
      options: [
        {
          label: 'Initial Submission',
          value: 'initial-submission',
        },
        {
          label: 'Completion Document',
          value: 'completion-document',
        },
        {
          label: 'Supporting Document',
          value: 'supporting-document',
        },
      ],
      required: false,
      admin: {
        description: 'Type of document for categorization',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Optional description for this document',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Tags to categorize this document',
      },
    },
    {
      name: 'relatedUser',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'User associated with this document',
      },
    },
    {
      name: 'relatedChallenge',
      type: 'relationship',
      relationTo: 'challenges',
      required: false,
      admin: {
        description: 'Challenge associated with this document (if applicable)',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Make this document publicly accessible',
      },
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        readOnly: true,
        description: 'User who uploaded this document',
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            if (operation === 'create' && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
    },
  ],
  upload: {
    staticDir: 'documents',
    mimeTypes: [
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
      // Images (as documents, not processed media)
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      // Archive files
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      // Other common formats
      'application/json',
      'application/xml',
    ],
    adminThumbnail: ({ doc }) => {
      // For documents, show a generic file icon or thumbnail based on type
      const mimeType = doc.mimeType as string | undefined
      if (mimeType?.startsWith('image/')) {
        return doc.url as string
      }
      return null // Let Payload handle generic file icon
    },
    filesRequiredOnCreate: true,
    bulkUpload: true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'description', 'mimeType', 'filesize', 'uploadedBy', 'updatedAt'],
  },
  timestamps: true,
}