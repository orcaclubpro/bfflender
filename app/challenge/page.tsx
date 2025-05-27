"use client"
import ChallengeHero from "./components/ChallengeHero"
import ProgressSteps from "./components/ProgressSteps"
import ChallengeForm from "./components/ChallengeForm"
import ConfidenceSection from "./components/ConfidenceSection"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ChallengeHero />
      <ProgressSteps />
      <ChallengeForm />
      <ConfidenceSection />
      <Footer />
    </div>
  )
}
