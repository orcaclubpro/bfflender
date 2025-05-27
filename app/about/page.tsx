import AboutHeader from "./components/AboutHeader"
import AboutHero from "./components/AboutHero"
import CompanyHistory from "./components/CompanyHistory"
import LeadershipTeam from "./components/LeadershipTeam"
import FinancialStrength from "./components/FinancialStrength"
import CompanyCulture from "./components/CompanyCulture"
import CommunityInvolvement from "./components/CommunityInvolvement"
import AboutCTA from "./components/AboutCTA"
import AboutFooter from "./components/AboutFooter"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeader />
      <AboutHero />
      <CompanyHistory />
      <LeadershipTeam />
      <FinancialStrength />
      <CompanyCulture />
      <CommunityInvolvement />
      <AboutCTA />
      <AboutFooter />
    </div>
  )
}
