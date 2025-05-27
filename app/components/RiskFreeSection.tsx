"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Target, CheckCircle, TrendingUp, Award } from "lucide-react"
import { useState } from "react"
import { useChatbot } from "./ChatbotProvider"

export default function RiskFreeSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { openChatbot } = useChatbot();

  const handlePLChallenge = () => {
    openChatbot();
  };

  const steps = [
    {
      number: 1,
      title: "Submit Your P&L",
      description: "Confidential review, no obligation",
      icon: Shield,
      detail: "100% secure analysis of your current performance",
      color: "emerald"
    },
    {
      number: 2,
      title: "Get Custom Analysis",
      description: "Detailed comparison in 48 hours",
      icon: Clock,
      detail: "Personalized recommendations from our experts",
      color: "amber"
    },
    {
      number: 3,
      title: "Take the Challenge",
      description: "Vegas tickets if we lose",
      icon: Target,
      detail: "Risk-free guarantee with proven 94.2% win rate",
      color: "emerald"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Award className="w-4 h-4" />
              94.2% Success Rate
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Risk-Free Next Steps
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to discover your potential with BFFLender. If we can't beat your current P&L, 
              those Vegas show tickets are on us.
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="text-center group cursor-pointer"
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="relative mb-6">
                  {/* Step Circle */}
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                    step.color === 'emerald' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:from-emerald-400 group-hover:to-emerald-500' 
                      : 'bg-gradient-to-br from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500'
                  } shadow-xl group-hover:shadow-2xl`}>
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredStep === step.number ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  } ${step.color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'}`}>
                    <step.icon className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-600 to-slate-700 transform -translate-y-1/2 z-0">
                      <div className={`h-full bg-gradient-to-r transition-all duration-1000 ${
                        hoveredStep && hoveredStep >= step.number 
                          ? 'from-emerald-400 to-amber-400 w-full' 
                          : 'from-emerald-400 to-emerald-400 w-0'
                      }`}></div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-300 mb-4 group-hover:text-slate-200 transition-colors duration-300">
                  {step.description}
                </p>
                
                {/* Expanded Detail */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  hoveredStep === step.number ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-sm text-slate-400 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-slate-600/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-white">127</div>
                  <div className="text-sm text-slate-400">Challenges Completed</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="text-2xl font-bold text-white">+31%</div>
                  <div className="text-sm text-slate-400">Avg. Profit Increase</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Target className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-slate-400">Vegas Trips Paid</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl p-8 border border-amber-400/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Take the Challenge?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join the 94.2% of brokers who discovered the BFFLender advantage. 
                Your P&L analysis is just one click away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handlePLChallenge}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  Start P&L Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 hover:border-emerald-300 px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Schedule Consultation
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>48-Hour Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Vegas Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
