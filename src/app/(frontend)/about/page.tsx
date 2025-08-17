import AboutHero from "./components/AboutHero"
import CompanyHistory from "./components/CompanyHistory"
import LeadershipTeam from "./components/LeadershipTeam"
import FinancialStrength from "./components/FinancialStrength"
import CompanyCulture from "./components/CompanyCulture"
import CommunityInvolvement from "./components/CommunityInvolvement"
import AboutCTA from "./components/AboutCTA"
import Header from "../../_components/Header"
import Footer from "../../_components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <CompanyHistory />
      <LeadershipTeam />
      <FinancialStrength />
      <CompanyCulture />
      <CommunityInvolvement />
      <AboutCTA />
      <Footer />
    </div>
  )
}
