"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Target, DollarSign, TrendingUp, Users, Award, CheckCircle } from "lucide-react"
import { useState } from "react"
import PLChatbot from "./PLChatbot"

export default function PLChallengeSection() {
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <>
      <section
        id="challenge"
        className="section-padding bg-gradient-to-br from-white via-navy-50/30 to-blue-50/50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-7xl mx-auto content-spacing">
            <div className="text-center mb-20 animate-fade-in-up">
              <div className="badge-warning mb-8 inline-flex items-center animate-pulse">
                <Clock className="w-4 h-4 mr-2" />
                Limited to 50 challenges per quarter
              </div>

              <h2 className="text-display-md sm:text-display-lg lg:text-display-xl text-navy-900 mb-8">
                Put Your P&L Where Your <span className="gradient-text-primary">Mouth Is</span>
              </h2>

              <p className="text-body-lg sm:text-xl text-navy-600 max-w-4xl mx-auto leading-relaxed">
                We're so confident in our broker model that we'll prove it with hard numbers. If we can't beat your
                current P&L performance, we'll send you to Vegas on us.
              </p>
            </div>

            {/* Enhanced Challenge Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <Card className="card-feature text-center group">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold text-blue-600 mb-3">127</div>
                  <CardTitle className="text-2xl text-navy-900">Brokers Challenged</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 font-medium">Total challenges completed this year</p>
                </CardContent>
              </Card>

              <Card className="card-feature text-center group">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold text-emerald-600 mb-3">119</div>
                  <CardTitle className="text-2xl text-navy-900">Switched to Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 font-medium">Chose BFFLender after seeing results</p>
                </CardContent>
              </Card>

              <Card className="card-feature text-center group sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold text-amber-600 mb-3">8</div>
                  <CardTitle className="text-2xl text-navy-900">Vegas Trips Paid</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 font-medium">Times we couldn't beat their P&L</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced How It Works */}
            <div className="mb-20">
              <h3 className="text-display-sm text-center text-navy-900 mb-16">How the Challenge Works</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="card-elevated text-center group">
                  <CardHeader className="pb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-3xl">1</span>
                    </div>
                    <CardTitle className="text-2xl text-navy-900 mb-4">Submit Your P&L</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-navy-600 leading-relaxed">
                      Confidential review of your current profit & loss statement with our expert team
                    </p>
                    <div className="inline-flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold text-sm">100% Confidential</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated text-center group">
                  <CardHeader className="pb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-3xl">2</span>
                    </div>
                    <CardTitle className="text-2xl text-navy-900 mb-4">Get Custom Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-navy-600 leading-relaxed">
                      Detailed comparison with our proven broker model and optimization recommendations
                    </p>
                    <div className="inline-flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 font-semibold text-sm">48-Hour Turnaround</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated text-center group sm:col-span-2 lg:col-span-1">
                  <CardHeader className="pb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-3xl">3</span>
                    </div>
                    <CardTitle className="text-2xl text-navy-900 mb-4">Win Either Way</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-navy-600 leading-relaxed">
                      Better P&L with us, or Vegas show tickets on us - it's a guaranteed win
                    </p>
                    <div className="inline-flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-full">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="text-purple-700 font-semibold text-sm">Zero Risk Guarantee</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-10 sm:p-12 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-display-sm sm:text-display-md lg:text-display-lg mb-8">
                  Ready to Take the Challenge?
                </h3>
                <p className="text-xl sm:text-2xl mb-12 text-amber-100 font-light max-w-3xl mx-auto">
                  Join the 94.2% of brokers who discovered the BFFLender advantage and transformed their business
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                  <Button
                    size="lg"
                    className="bg-white text-amber-600 hover:bg-navy-50 font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                    onClick={() => setShowChatbot(true)}
                  >
                    <DollarSign className="mr-3 h-6 w-6" />
                    Submit My P&L
                  </Button>
                  <Button
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 py-5 rounded-2xl transition-all duration-300 text-lg"
                  >
                    <TrendingUp className="mr-3 h-6 w-6" />
                    Schedule Consultation
                  </Button>
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
