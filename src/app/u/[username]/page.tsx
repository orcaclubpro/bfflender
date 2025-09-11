import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { redirect, notFound } from 'next/navigation'

import config from '@/payload.config'

interface UserRedirectPageProps {
  params: Promise<{ username: string }>
}

export default async function UserRedirectPage({ params }: UserRedirectPageProps) {
  const { username } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Check if user is authenticated
  const { user: currentUser } = await payload.auth({ headers })

  // If not logged in, redirect to login with return URL
  if (!currentUser) {
    redirect(`/login?returnUrl=${encodeURIComponent(`/u/${username}`)}`)
  }

  // Verify the username exists in the system
  const userQuery = await payload.find({
    collection: 'users',
    where: {
      username: {
        equals: username,
      },
    },
    limit: 1,
  })

  // If user doesn't exist, show 404
  if (userQuery.docs.length === 0) {
    notFound()
  }

  const targetUser = userQuery.docs[0]

  // Check access permissions
  // Users can only access their own dashboard, admins can access any dashboard
  const canAccess = currentUser.id === targetUser.id || currentUser.roles?.includes('admin')
  
  if (!canAccess) {
    redirect('/')
  }

  // If user is authenticated and has access, redirect to the working dashboard
  redirect(`/login/u/${username}`)
}

export async function generateMetadata({ params }: UserRedirectPageProps) {
  const { username } = await params
  
  return {
    title: `${username} Dashboard - BFFLender Portal`,
    description: `Access dashboard for ${username} on BFFLender mortgage lending platform.`,
  }
}