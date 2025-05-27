"use client"

import HeroSection from "./components/HeroSection"
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
      <HeroSection />
      <PLChallengeSection />
      <BenefitsSection />
      <ProofSection />
      <RiskFreeSection />
      <Footer />
    </div>
  )
}
