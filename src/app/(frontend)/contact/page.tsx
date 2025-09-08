"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import BFFLogo from "@/components/layout/BFFLogo"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    preferredTime: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white py-20 relative overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Schedule Your Strategy Session
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to discover how BFFLender can transform your mortgage business? 
              Let's discuss your goals and show you exactly how our institutional model works.
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Contact Form */}
              <div>
                <Card className="border-emerald-100 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-emerald-100">
                    <CardTitle className="text-2xl text-slate-900 flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-emerald-600" />
                      Book Your Session
                    </CardTitle>
                    <p className="text-slate-600">
                      Fill out the form below and we'll get back to you within 2 hours to schedule your personalized strategy session.
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-slate-700 font-medium">
                              First Name *
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                              placeholder="Your first name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-slate-700 font-medium">
                              Last Name *
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                              placeholder="Your last name"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-slate-700 font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                            placeholder="your.email@company.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-slate-700 font-medium">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <Label htmlFor="company" className="text-slate-700 font-medium">
                            Company/Business
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                            placeholder="Your current company"
                          />
                        </div>

                        <div>
                          <Label htmlFor="preferredTime" className="text-slate-700 font-medium">
                            Preferred Meeting Time
                          </Label>
                          <Input
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                            placeholder="e.g., Weekday mornings, Tuesday afternoons"
                          />
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-slate-700 font-medium">
                            Tell Us About Your Goals
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl min-h-[120px]"
                            placeholder="What are your biggest challenges? What would you like to achieve?"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
                        >
                          Schedule My Strategy Session
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                          Request Submitted!
                        </h3>
                        <p className="text-slate-600 mb-6">
                          Thank you for your interest in BFFLender. We'll contact you within 2 hours to schedule your personalized strategy session.
                        </p>
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          variant="outline"
                          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                          Submit Another Request
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="border-emerald-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-emerald-100">
                    <CardTitle className="text-xl text-slate-900">
                      Get In Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Phone</p>
                        <p className="text-slate-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Email</p>
                        <p className="text-slate-600">strategy@bfflender.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Location</p>
                        <p className="text-slate-600">Las Vegas, Nevada</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What to Expect */}
                <Card className="border-amber-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-amber-100">
                    <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                      <Users className="w-6 h-6 text-amber-600" />
                      What to Expect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-900">30-45 Minute Session</p>
                          <p className="text-slate-600 text-sm">Deep dive into your current business model</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-900">Custom Analysis</p>
                          <p className="text-slate-600 text-sm">Personalized recommendations for growth</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-900">No Pressure</p>
                          <p className="text-slate-600 text-sm">Educational session with actionable insights</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-900">Next Steps</p>
                          <p className="text-slate-600 text-sm">Clear roadmap if you choose to proceed</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card className="border-emerald-100 shadow-lg bg-gradient-to-r from-emerald-50 to-amber-50">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Quick Response Guarantee
                    </h3>
                    <p className="text-slate-600">
                      We'll contact you within 2 hours during business hours to schedule your session at a time that works for you.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
