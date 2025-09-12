import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ],
      defaultValue: 'client',
      required: true,
      saveToJWT: true,
      admin: {
        description: 'Select the user role for access control',
      },
      hooks: {
        beforeChange: [
          (args) => {
            // Prevent non-admins from changing roles
            if (args.operation === 'update' && args.req?.user) {
              const currentUser = args.req.user as { roles?: 'admin' | 'client' }
              if (currentUser?.roles !== 'admin') {
                // Return the existing value to prevent changes
                return (args.req as { originalDoc?: { roles?: string | string[] } }).originalDoc?.roles || args.value
              }
            }
            return args.value
          },
        ],
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter last name',
      },
    },
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      saveToJWT: true,
      admin: {
        placeholder: 'Enter unique username',
        description: 'Used for dashboard URL: /u/username',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Username is required'
        if (value.length < 3) return 'Username must be at least 3 characters'
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Username can only contain letters, numbers, underscores, and hyphens'
        }
        return true
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter phone number',
        description: 'Contact phone number for the user',
      },
      validate: (value: string | null | undefined) => {
        if (value && !/^[\d\s\(\)\-\+\.]+$/.test(value)) {
          return 'Please enter a valid phone number'
        }
        return true
      },
    },
    {
      name: 'address',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter street address',
        description: 'Primary street address',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter city',
        description: 'City of residence',
      },
    },
    {
      name: 'state',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter state',
        description: 'State or province of residence',
      },
    },
    {
      name: 'zipCode',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter ZIP code',
        description: 'Postal/ZIP code',
      },
      validate: (value: string | null | undefined) => {
        if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
          return 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
        }
        return true
      },
    },
    {
      name: 'employmentStatus',
      type: 'select',
      options: [
        {
          label: 'Full-time Employed',
          value: 'employed',
        },
        {
          label: 'Self-employed',
          value: 'self-employed',
        },
        {
          label: 'Contract Worker',
          value: 'contract',
        },
        {
          label: 'Retired',
          value: 'retired',
        },
        {
          label: 'Unemployed',
          value: 'unemployed',
        },
        {
          label: 'Student',
          value: 'student',
        },
      ],
      required: false,
      admin: {
        description: 'Current employment status',
      },
    },
    {
      name: 'employer',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter employer name',
        description: 'Current employer or company name',
      },
    },
    {
      name: 'annualIncome',
      type: 'number',
      required: false,
      admin: {
        placeholder: 'Enter annual income',
        description: 'Annual income in USD',
        step: 1000,
      },
      validate: (value: number | null | undefined) => {
        if (value !== null && value !== undefined && value < 0) {
          return 'Annual income must be a positive number'
        }
        return true
      },
    },
  ],
  access: {
    // Allow system creation (for API routes) and admin creation
    create: ({ req }) => {
      // Allow creation without user context (system/API routes)
      if (!req?.user) return true
      // Otherwise require admin privileges
      return req?.user?.roles?.includes('admin') ?? false
    },
    // Users can read their own profile, admins can read all
    read: ({ req, id }) => {
      if (req?.user?.roles?.includes('admin')) return true
      return req?.user?.id === id
    },
    // Users can update their own profile (except roles), admins can update all
    update: ({ req, id }) => {
      if (req?.user?.roles?.includes('admin')) return true
      return req?.user?.id === id
    },
    // Only admins can delete users
    delete: ({ req }) => {
      return req?.user?.roles?.includes('admin') ?? false
    },
  },
}
