import ChallengeHero from "./components/ChallengeHero"
import ProblemIdentification from "./components/ProblemIdentification"
import BFFLenderSolution from "./components/BFFLenderSolution"
import ProcessDeepDive from "./components/ProcessDeepDive"
import ConfidenceSection from "./components/ConfidenceSection"
import FinalConversion from "./components/FinalConversion"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ChallengeHero />
      <ProblemIdentification />
      <BFFLenderSolution />
      <ProcessDeepDive />
      <ConfidenceSection />
      <FinalConversion />
      <Footer />
    </div>
  )
}
