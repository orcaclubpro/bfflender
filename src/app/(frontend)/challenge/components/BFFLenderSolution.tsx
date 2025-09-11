import { CheckCircle, Users, Award, TrendingUp, Star } from "lucide-react"
import TakeChallengeButton from "./TakeChallengeButton"

export default function BFFLenderSolution() {
  const stats = [
    { number: "127", label: "Professionals Challenged", icon: <Users className="w-6 h-6" /> },
    { number: "119", label: "Switched to BFFLender", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "8", label: "Vegas Trips Paid", icon: <Award className="w-6 h-6" /> },
    { number: "93.7%", label: "Success Rate", icon: <Star className="w-6 h-6" /> }
  ]

  const advantages = [
    {
      title: "Direct Lender Relationships",
      description: "We work directly with 40+ institutional lenders, cutting out the middleman markups that inflate your rates."
    },
    {
      title: "Volume-Based Pricing",
      description: "Our $2.3B annual volume gives us negotiating power that individual brokers simply can't match."
    },
    {
      title: "Technology-First Process",
      description: "Automated underwriting and digital workflows reduce processing time from 23 days to 8 days average."
    },
    {
      title: "Transparent Fee Structure",
      description: "No hidden fees, no surprise charges. What we quote is what you pay, guaranteed in writing."
    },
    {
      title: "Dedicated Account Management",
      description: "Your dedicated loan officer with 15+ years experience, not a call center rotation."
    },
    {
      title: "Same-Day Pre-Approvals",
      description: "Technology-enabled underwriting gives you competitive advantages in multiple offer situations."
    }
  ]

  const testimonial = {
    text: "BFFLender found $73,000 in annual savings I didn't even know existed. The Vegas trip was nice, but the ongoing savings are life-changing.",
    author: "Marcus R.",
    title: "Investment Property Specialist",
    location: "Austin, TX"
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why <span className="text-emerald-600">93.7% Switch</span> After Our Analysis
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              The numbers don't lie. Here's what sets BFFLender apart and why almost everyone 
              who takes our challenge ends up making the switch.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="flex justify-center mb-3 text-emerald-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-navy-900 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{advantage.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-slate-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              <div className="text-navy-900 font-semibold">{testimonial.author}</div>
              <div className="text-slate-600">{testimonial.title}, {testimonial.location}</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Ready to See What We'll Find in Your P&L?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join the 93.7% who discovered significant savings they didn't know existed. 
              Your analysis is completely confidential and takes less than 48 hours.
            </p>
            <TakeChallengeButton 
              variant="inline" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}