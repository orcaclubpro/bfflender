import BenefitsHeader from "./components/BenefitsHeader"
import BenefitsHero from "./components/BenefitsHero"
import WideProductSet from "./components/WideProductSet"
import RadicalTransparency from "./components/RadicalTransparency"
import FlatOrganization from "./components/FlatOrganization"
import PersonalBranding from "./components/PersonalBranding"
import TechnologyAdvantage from "./components/TechnologyAdvantage"
import BenefitsCTA from "./components/BenefitsCTA"
import BenefitsFooter from "./components/BenefitsFooter"

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BenefitsHeader />
      <BenefitsHero />
      <WideProductSet />
      <RadicalTransparency />
      <FlatOrganization />
      <PersonalBranding />
      <TechnologyAdvantage />
      <BenefitsCTA />
      <BenefitsFooter />
    </div>
  )
}
