import BenefitsHero from "./components/BenefitsHero"
import WideProductSet from "./components/WideProductSet"
import RadicalTransparency from "./components/RadicalTransparency"
import FlatOrganization from "./components/FlatOrganization"
import PersonalBranding from "./components/PersonalBranding"
import TechnologyAdvantage from "./components/TechnologyAdvantage"
import BenefitsCTA from "./components/BenefitsCTA"
import Header from "../../_components/Header"
import Footer from "../../_components/Footer"

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BenefitsHero />
      <WideProductSet />
      <RadicalTransparency />
      <FlatOrganization />
      <PersonalBranding />
      <TechnologyAdvantage />
      <BenefitsCTA />
      <Footer />
    </div>
  )
}
