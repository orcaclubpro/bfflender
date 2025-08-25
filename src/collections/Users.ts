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
      required: true,
      admin: {
        placeholder: 'Enter first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter last name',
      },
    },
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
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
  ],
  access: {
    // Only admins can create new users
    create: ({ req }) => {
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
