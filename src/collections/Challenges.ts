import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  admin: {
    useAsTitle: 'name',
    description: 'Challenge submissions from chatbot interactions',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter full name',
        description: 'Name provided during chatbot interaction',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        placeholder: 'Enter email address',
        description: 'Email provided during chatbot interaction',
      },
    },
    {
      name: 'answers',
      type: 'group',
      fields: [
        {
          name: 'question1',
          type: 'textarea',
          admin: {
            placeholder: 'First chatbot question response',
          },
        },
        {
          name: 'question2',
          type: 'textarea',
          admin: {
            placeholder: 'Second chatbot question response',
          },
        },
        {
          name: 'question3',
          type: 'textarea',
          admin: {
            placeholder: 'Third chatbot question response',
          },
        },
        {
          name: 'additionalInfo',
          type: 'textarea',
          admin: {
            placeholder: 'Additional information or notes',
          },
        },
      ],
      admin: {
        description: 'Responses to chatbot questions',
      },
    },
    {
      name: 'documentIds',
      type: 'array',
      fields: [
        {
          name: 'documentId',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'IDs of documents uploaded during this challenge',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User account created after password verification',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Pending Verification',
          value: 'pending_verification',
        },
        {
          label: 'Verified',
          value: 'verified',
        },
        {
          label: 'In Progress',
          value: 'in_progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      defaultValue: 'submitted',
      required: true,
      admin: {
        description: 'Current status of the challenge submission',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When the challenge was submitted',
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'verifiedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When the challenge was verified by owner password entry',
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When the challenge process was completed',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        placeholder: 'Internal notes about this challenge',
        description: 'Admin notes for internal tracking',
      },
    },
  ],
  access: {
    // Anyone can create challenges (from chatbot)
    create: () => true,
    // Users can read their own challenges, admins can read all
    read: ({ req }) => {
      if (req?.user?.roles?.includes('admin')) return true
      if (req?.user?.id) {
        return {
          user: {
            equals: req.user.id,
          },
        }
      }
      // Allow reading by email for unverified challenges
      return {
        user: {
          exists: false,
        },
      }
    },
    // Users can update their own challenges, admins can update all
    update: ({ req }) => {
      if (req?.user?.roles?.includes('admin')) return true
      if (req?.user?.id) {
        return {
          user: {
            equals: req.user.id,
          },
        }
      }
      return false
    },
    // Only admins can delete challenges
    delete: ({ req }) => {
      return req?.user?.roles?.includes('admin') ?? false
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Auto-update timestamps based on status changes
        if (operation === 'update') {
          const updates: Record<string, string> = {}
          
          if (doc.status === 'verified' && !doc.verifiedAt) {
            updates.verifiedAt = new Date().toISOString()
          }
          
          if (doc.status === 'completed' && !doc.completedAt) {
            updates.completedAt = new Date().toISOString()
          }
          
          if (Object.keys(updates).length > 0) {
            await req.payload.update({
              collection: 'challenges',
              id: doc.id,
              data: updates,
            })
          }
        }
      },
    ],
  },
}