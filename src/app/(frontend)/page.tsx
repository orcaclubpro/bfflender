import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Hero from "./components/Hero"
import PLChallengeSection from "./components/PLChallengeSection"
import BenefitsSection from "./components/BenefitsSection"
import ProofSection from "./components/ProofSection"
import RiskFreeSection from "./components/RiskFreeSection"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user: _user } = await payload.auth({ headers })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PLChallengeSection />
      <BenefitsSection />
      <ProofSection />
      <RiskFreeSection />
      <Footer />
    </div>
  )
}
