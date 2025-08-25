import React from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "BFFLender - Professional Mortgage Solutions",
    template: "%s | BFFLender"
  },
  description: "Professional mortgage lending solutions with BFFLender. Access your dashboard, manage applications, and work with experienced mortgage professionals.",
  keywords: "mortgage, lending, BFFLender, AllWestern Mortgage, dashboard, loan applications",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
