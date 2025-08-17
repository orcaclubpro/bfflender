import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

export const generateMetadata = async (args: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}): Promise<Metadata> => generatePageMetadata({ config: configPromise, ...args })

const AdminPage = (props: any) => {
  return RootPage({ config: configPromise, ...props })
}

export default AdminPage