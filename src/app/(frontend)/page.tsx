"use client"

import Hero from "../_components/Hero"
import PLChallengeSection from "../_components/PLChallengeSection"
import BenefitsSection from "../_components/BenefitsSection"
import ProofSection from "../_components/ProofSection"
import RiskFreeSection from "../_components/RiskFreeSection"
import Header from "../_components/Header"
import Footer from "../_components/Footer"

export default function HomePage() {
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
