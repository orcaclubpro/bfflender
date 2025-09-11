import { Calendar, Users, TrendingUp, Zap, Clock } from "lucide-react"
import TakeChallengeButton from "./TakeChallengeButton"

export default function FinalConversion() {
  const urgencyStats = [
    {
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      stat: "This Month Only",
      detail: "27 spots remaining"
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      stat: "67 Completed",
      detail: "This quarter"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      stat: "$2.8M Saved",
      detail: "Total this year"
    }
  ]

  const reasons = [
    "Rates are rising - lock in your savings now before terms change",
    "Q4 is peak season - get ahead of the rush with priority processing",
    "Our Vegas guarantee expires December 31st - don't miss out",
    "Limited analysis slots available due to holiday schedules"
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-navy-900 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Let Another Year of 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400"> Overpaying</span> Go By
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every month you wait is money left on the table. The average client who takes our challenge 
              saves <span className="text-amber-400 font-semibold">$47,000 annually</span> - that's nearly $4,000 per month.
            </p>
          </div>

          {/* Urgency Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {urgencyStats.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{item.stat}</div>
                <div className="text-slate-400 text-sm">{item.detail}</div>
              </div>
            ))}
          </div>

          {/* Reasons to Act Now */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">
              Why Smart Professionals Are Taking Action Now
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-2xl p-8 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Take the P&L Challenge Now
              </h3>
              <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
                Join the 93.7% who discovered they were overpaying. Your confidential analysis 
                takes 2 minutes to start and could save you thousands every month.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <TakeChallengeButton 
                  variant="final" 
                  className="text-xl px-12 py-6"
                />
                <div className="text-sm text-slate-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Takes 2 minutes to start
                </div>
              </div>
              
              <div className="text-amber-400 font-semibold text-lg animate-pulse">
                Vegas guarantee expires December 31st
              </div>
            </div>
            
            <div className="text-slate-400 text-sm">
              Still unsure? That's exactly why we offer the Vegas guarantee. 
              <br />
              <span className="text-amber-400">Zero risk, maximum reward.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}