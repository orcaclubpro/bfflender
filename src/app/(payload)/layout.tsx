/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { loginAction, logoutAction, refreshAction } from './admin/actions'
import './custom.scss'

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'BFFLender CMS Admin Panel',
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout 
    config={configPromise}
    serverFunction={{
      login: loginAction,
      logout: logoutAction,
      refresh: refreshAction,
    }}
  >
    {children}
  </RootLayout>
)

export default Layout