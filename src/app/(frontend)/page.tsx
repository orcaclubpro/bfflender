import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Hero from "../_components/Hero"
import PLChallengeSection from "../_components/PLChallengeSection"
import BenefitsSection from "../_components/BenefitsSection"
import ProofSection from "../_components/ProofSection"
import RiskFreeSection from "../_components/RiskFreeSection"
import Header from "../_components/Header"
import Footer from "../_components/Footer"

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
