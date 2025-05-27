"use client"

import Hero from "./components/Hero"
import PLChallengeSection from "./components/PLChallengeSection"
import BenefitsSection from "./components/BenefitsSection"
import ProofSection from "./components/ProofSection"
import RiskFreeSection from "./components/RiskFreeSection"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
