import React from 'react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - BFFLender Portal",
  description: "Access your BFFLender dashboard for mortgage lending services and account management.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  )
}