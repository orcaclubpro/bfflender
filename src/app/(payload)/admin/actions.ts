'use server'

import { login, logout, refresh } from '@payloadcms/next/auth'
import config from '@payload-config'

export async function loginAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const result = await login({
      collection: 'users',
      config,
      email,
      password,
    })
    return result
  } catch (error) {
    throw new Error(
      `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

export async function logoutAction() {
  try {
    return await logout({ allSessions: true, config })
  } catch (error) {
    throw new Error(
      `Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export async function refreshAction() {
  try {
    return await refresh({
      config,
    })
  } catch (error) {
    throw new Error(
      `Refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}