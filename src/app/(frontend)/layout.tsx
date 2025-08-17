import type React from "react"
import { ChatbotProvider } from "../_components/ChatbotProvider"

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChatbotProvider>
      {children}
    </ChatbotProvider>
  )
}