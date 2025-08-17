import { Shield, Clock, Target } from "lucide-react"
import BFFLogo from "@/components/layout/BFFLogo"

export default function ChallengeHero() {
  return (
    <section className="py-12 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <BFFLogo 
              size="lg" 
              variant="light" 
              showText={true}
              className="justify-center mb-6"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The P&L Challenge <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Deep Dive</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Submit your P&L for a confidential analysis. If we can't beat your numbers, Vegas show tickets are on us.
          </p>
          <div className="flex justify-center space-x-8 text-sm mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-amber-400" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <span>48-Hour Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-amber-400" />
              <span>Zero Risk</span>
            </div>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  )
}
