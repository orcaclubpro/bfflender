"use client"
import ChallengeHeader from "./components/ChallengeHeader"
import ChallengeHero from "./components/ChallengeHero"
import ProgressSteps from "./components/ProgressSteps"
import ChallengeForm from "./components/ChallengeForm"
import ConfidenceSection from "./components/ConfidenceSection"
import ChallengeFooter from "./components/ChallengeFooter"

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-white">
      <ChallengeHeader />
      <ChallengeHero />
      <ProgressSteps />
      <ChallengeForm />
      <ConfidenceSection />
      <ChallengeFooter />
    </div>
  )
}
