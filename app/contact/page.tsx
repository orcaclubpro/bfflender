"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
    acceptChallenge: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your interest! We'll be in touch within 24 hours.")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BFF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BFFLender</h1>
                <p className="text-xs text-gray-600">Powered by AllWestern Mortgage</p>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Take the <span className="text-orange-400">P&L Challenge?</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get in touch with our mortgage experts and discover how we can improve your bottom line
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Start Your P&L Challenge</CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below and we'll analyze your current P&L within 48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                    <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pl-challenge">P&L Challenge</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="technology">Technology Solutions</SelectItem>
                        <SelectItem value="general">General Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your current mortgage business and what you'd like to achieve..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptChallenge"
                      checked={formData.acceptChallenge}
                      onCheckedChange={(checked) => handleInputChange("acceptChallenge", checked as boolean)}
                    />
                    <Label htmlFor="acceptChallenge" className="text-sm">
                      I'm ready to accept the P&L Challenge and provide my current P&L for comparison
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3">
                    Submit P&L Challenge Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-900" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-900" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">challenge@bfflender.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-900" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        123 Mortgage Way
                        <br />
                        Las Vegas, NV 89101
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-900" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">
                        Mon-Fri: 8:00 AM - 6:00 PM PST
                        <br />
                        Sat: 9:00 AM - 2:00 PM PST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">The P&L Challenge Promise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-100 mb-4">
                    We're so confident in our mortgage solutions that if we can't improve your P&L, we'll give you two
                    tickets to a Las Vegas show of your choice.
                  </p>
                  <ul className="space-y-2 text-orange-100">
                    <li>• No risk to you</li>
                    <li>• Detailed P&L analysis</li>
                    <li>• 48-hour turnaround</li>
                    <li>• Expert consultation included</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-900 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Why Choose AllWestern Mortgage?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-blue-100">
                    <li>• 30+ years of industry experience</li>
                    <li>• Complete transparency in all dealings</li>
                    <li>• Flat organizational structure</li>
                    <li>• Personal branding support</li>
                    <li>• Cutting-edge technology tools</li>
                    <li>• Wide range of mortgage products</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BFF</span>
              </div>
              <span className="text-xl font-bold">BFFLender</span>
            </div>
            <p className="text-gray-400 mb-4">
              Powered by AllWestern Mortgage - Creating clients for life through superior service and innovative
              solutions.
            </p>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} BFFLender. Powered by AllWestern Mortgage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
