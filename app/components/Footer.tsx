import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto container-padding section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Enhanced Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">BFF</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BFFLender</h3>
                  <p className="text-navy-300 text-sm font-medium">AllWestern Mortgage</p>
                </div>
              </div>
              <p className="text-navy-300 mb-8 leading-relaxed text-body-md">
                Powered by 30+ years of proven mortgage performance. We build lifetime relationships through superior
                service and unwavering commitment to our partners' success.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-navy-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <Facebook className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-navy-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-navy-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <Linkedin className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#challenge"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    P&L Challenge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/benefits"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Why Switch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enhanced Services */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Services</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Mortgage Brokerage
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Loan Processing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Marketing Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-navy-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Technology Platform
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Contact Info</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-navy-300 text-sm">Phone</p>
                    <p className="text-white font-medium">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-navy-300 text-sm">Email</p>
                    <p className="text-white font-medium">info@bfflender.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-navy-300 text-sm">Location</p>
                    <p className="text-white font-medium">Las Vegas, Nevada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter */}
          <div className="border-t border-navy-700/50 pt-16 mb-16">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4 text-white">Stay Updated</h4>
              <p className="text-navy-300 mb-8 text-body-md">
                Get the latest mortgage industry insights, market updates, and exclusive BFFLender opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="input-professional bg-navy-800/50 border-navy-600 text-white placeholder:text-navy-400 focus:border-amber-500 flex-1 h-12"
                />
                <Button className="btn-primary whitespace-nowrap px-8 py-3">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-navy-700/50 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <p className="text-navy-400 text-sm text-center lg:text-left">
                &copy; {new Date().getFullYear()} BFFLender. All rights reserved. Powered by AllWestern Mortgage.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end space-x-8 text-sm">
                <Link
                  href="#"
                  className="text-navy-400 hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-navy-400 hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-navy-400 hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  NMLS Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
