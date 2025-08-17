import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ChatbotProvider } from "./_components/ChatbotProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BFFLender - The P&L Challenge | AllWestern Mortgage",
  description:
    "Take the P&L Challenge with BFFLender. If we can't beat your current mortgage P&L, we'll give you two Las Vegas show tickets. 30+ years of trusted mortgage experience.",
  keywords: "mortgage, P&L challenge, AllWestern Mortgage, BFFLender, Las Vegas, mortgage solutions",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatbotProvider>
          {children}
        </ChatbotProvider>
      </body>
    </html>
  )
}
