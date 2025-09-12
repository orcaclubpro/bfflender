import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { redirect, notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'

interface UserDashboardPageProps {
  params: Promise<{ username: string }>
}

export default async function UserDashboardPage({ params }: UserDashboardPageProps) {
  const { username } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Get currently authenticated user
  const { user: currentUser } = await payload.auth({ headers })

  // If not logged in, redirect to login with return URL
  if (!currentUser) {
    redirect(`/login?returnUrl=${encodeURIComponent(`/u/${username}`)}`)
  }

  // Find the user by username
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

  // Import dashboard components dynamically based on role
  const isAdmin = targetUser.roles === 'admin'
  
  if (isAdmin) {
    const { AdminDashboard } = await import('./components/AdminDashboard')
    return <AdminDashboard user={targetUser} currentUser={currentUser} />
  } else {
    const { ClientDashboard } = await import('./components/ClientDashboard')
    return <ClientDashboard user={targetUser} currentUser={currentUser} />
  }
}

export async function generateMetadata({ params }: UserDashboardPageProps) {
  const { username } = await params
  
  return {
    title: `${username} Dashboard - BFFLender Portal`,
    description: `Personalized dashboard for ${username} on BFFLender mortgage lending platform.`,
  }
}