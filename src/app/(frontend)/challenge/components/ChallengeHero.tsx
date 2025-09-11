import { Shield, Clock, Target } from "lucide-react"
import BFFLogo from "@/components/layout/BFFLogo"
import TakeChallengeButton from "./TakeChallengeButton"

export default function ChallengeHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Put Your P&L Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Your Mouth Is</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed font-medium">
            Think you've got the best mortgage terms possible?
          </p>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Show us your P&L and we'll prove you wrong. If we can't beat your numbers, <span className="text-amber-400 font-semibold">Vegas is on us!</span>
          </p>
          
          <div className="mb-10">
            <TakeChallengeButton variant="primary" />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm mb-8">
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
