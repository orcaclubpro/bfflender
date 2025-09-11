import { AlertCircle, TrendingDown, DollarSign, Clock } from "lucide-react"
import TakeChallengeButton from "./TakeChallengeButton"

export default function ProblemIdentification() {
  const problems = [
    {
      icon: <TrendingDown className="w-8 h-8 text-red-500" />,
      title: "Hidden Rate Markups",
      description: "Most brokers add 0.25-0.75% to your base rate without you knowing. That's $2,500-$7,500 extra per year on a $1M loan.",
      stat: "78% of loans"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      title: "Unnecessary Fees",
      description: "Processing fees, origination fees, and 'convenience' charges that can be waived with the right connections.",
      stat: "$3,200 average"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Slow Approval Times",
      description: "Extended approval processes cost you deals and tie up your capital when speed matters most in real estate.",
      stat: "23 days average"
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-purple-500" />,
      title: "Poor Communication",
      description: "Left in the dark about loan status, last-minute surprises, and unclear terms that hurt your business planning.",
      stat: "67% report issues"
    }
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              The Hidden Problems <span className="text-emerald-600">Killing Your Profit</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Most mortgage professionals don't realize how much money they're leaving on the table. 
              Here's what we consistently find in P&L analyses:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {problem.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-navy-900">{problem.title}</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        {problem.stat}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-900 to-blue-900 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Sound Familiar? You're Not Alone.
            </h3>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              We've analyzed hundreds of P&Ls and found that <span className="text-amber-400 font-semibold">93.7% of mortgage professionals</span> 
              were overpaying in at least 2 of these areas. The average savings? <span className="text-emerald-400 font-semibold">$47,000 per year.</span>
            </p>
            <TakeChallengeButton 
              variant="inline" 
              text="See How Your P&L Compares"
              className="bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold"
            />
          </div>
        </div>
      </div>
    </section>
  )
}