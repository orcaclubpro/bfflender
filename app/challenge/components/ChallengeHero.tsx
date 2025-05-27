import { Shield, Clock, Target } from "lucide-react"

export default function ChallengeHero() {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The P&L Challenge <span className="text-orange-400">Deep Dive</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Submit your P&L for a confidential analysis. If we can't beat your numbers, Vegas show tickets are on us.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-400" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <span>48-Hour Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-400" />
              <span>Zero Risk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
