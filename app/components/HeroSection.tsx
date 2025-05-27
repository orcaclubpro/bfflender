"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Play, Shield, Award, Calculator, Sparkles } from "lucide-react"
import { useState } from "react"
import PLChatbot from "./PLChatbot"

export default function HeroSection() {
  const [plData, setPlData] = useState({
    monthlyVolume: "",
    avgMargin: "",
    expenses: "",
    teamSize: "",
  })

  const [calculatorResult, setCalculatorResult] = useState<{
    currentProfit: number
    projectedProfit: number
    improvement: number
  } | null>(null)

  const [showChatbot, setShowChatbot] = useState(false)

  const calculatePL = () => {
    const volume = Number.parseFloat(plData.monthlyVolume) || 0
    const margin = Number.parseFloat(plData.avgMargin) || 0
    const expenses = Number.parseFloat(plData.expenses) || 0

    const currentProfit = volume * margin - expenses
    const projectedProfit = volume * margin * 1.23 - expenses * 0.85
    const improvement = ((projectedProfit - currentProfit) / currentProfit) * 100

    setCalculatorResult({
      currentProfit,
      projectedProfit,
      improvement,
    })
  }

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-navy-950 via-navy-900 to-blue-950 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/5 to-amber-600/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="animate-slide-in-left">
                <div className="badge-primary mb-8 inline-flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  30+ Years Proven Performance
                </div>

                <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl text-white mb-8 leading-tight">
                  Beat Your Current <span className="gradient-text-primary">P&L</span> or Get Vegas Show Tickets
                </h1>

                <p className="text-body-lg sm:text-xl lg:text-2xl mb-10 text-navy-200 leading-relaxed font-light">
                  We're so confident in our broker model that we'll prove it with hard numbers. If we can't beat your
                  current P&L performance, we'll send you to Vegas on us.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button size="lg" className="btn-primary text-lg px-10 py-5" onClick={() => setShowChatbot(true)}>
                    Take the Challenge
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  <Button
                    size="lg"
                    className="btn-outline border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-lg transition-all duration-300"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Watch Success Stories
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-12 space-y-4 sm:space-y-0 text-navy-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="font-medium">Risk-Free Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="font-medium">94.2% Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Enhanced P&L Calculator */}
              <div className="animate-slide-in-right">
                <div className="glass-card-dark rounded-3xl p-8 lg:p-10 border border-blue-500/20">
                  <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Calculator className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-display-sm text-white mb-3">Quick P&L Analyzer</h3>
                    <p className="text-navy-300 text-body-md">Discover your potential with BFFLender</p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <Label htmlFor="volume" className="text-white font-semibold mb-3 block text-base">
                        Monthly Volume ($)
                      </Label>
                      <Input
                        id="volume"
                        type="number"
                        placeholder="e.g., 2,000,000"
                        value={plData.monthlyVolume}
                        onChange={(e) => setPlData({ ...plData, monthlyVolume: e.target.value })}
                        className="input-professional bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="margin" className="text-white font-semibold mb-3 block text-base">
                        Avg Margin per Loan ($)
                      </Label>
                      <Input
                        id="margin"
                        type="number"
                        placeholder="e.g., 3,500"
                        value={plData.avgMargin}
                        onChange={(e) => setPlData({ ...plData, avgMargin: e.target.value })}
                        className="input-professional bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expenses" className="text-white font-semibold mb-3 block text-base">
                        Monthly Expenses ($)
                      </Label>
                      <Input
                        id="expenses"
                        type="number"
                        placeholder="e.g., 15,000"
                        value={plData.expenses}
                        onChange={(e) => setPlData({ ...plData, expenses: e.target.value })}
                        className="input-professional bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 text-lg"
                      />
                    </div>

                    <Button onClick={calculatePL} className="w-full btn-secondary py-5 text-lg">
                      <Calculator className="mr-3 h-6 w-6" />
                      Calculate Potential
                    </Button>

                    {calculatorResult && (
                      <div className="mt-10 p-8 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-3xl border border-emerald-400/30 backdrop-blur-sm animate-scale-in">
                        <h4 className="font-bold text-emerald-300 mb-6 text-xl">Your Potential with BFFLender:</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-navy-200 font-medium">Current Monthly Profit:</span>
                            <span className="font-bold text-white text-xl">
                              ${calculatorResult.currentProfit.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-navy-200 font-medium">Projected Monthly Profit:</span>
                            <span className="font-bold text-emerald-300 text-xl">
                              ${calculatorResult.projectedProfit.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-emerald-400/30">
                            <span className="text-white">Improvement:</span>
                            <span className="text-emerald-300">+{calculatorResult.improvement.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PLChatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </>
  )
}
