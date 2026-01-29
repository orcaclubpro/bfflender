import React from 'react'
import type { Metadata } from "next"
import { ChatbotProvider } from "./components/ChatbotProvider"
import Header from "@/components/layout/Header"

export const metadata: Metadata = {
  title: "BFFLender - The P&L Challenge | AllWestern Mortgage",
  description:
    "Take the P&L Challenge with BFFLender. If we can't beat your current mortgage P&L, we'll give you two Las Vegas show tickets. 30+ years of trusted mortgage experience.",
  keywords: "mortgage, P&L challenge, AllWestern Mortgage, BFFLender, Las Vegas, mortgage solutions",
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <ChatbotProvider>
      <Header />
      <main>{children}</main>
    </ChatbotProvider>
  )
}