import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import BFFLogo from "./BFFLogo"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto container-padding section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Enhanced Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-8">
                <BFFLogo 
                  size="md" 
                  variant="light" 
                  showText={true}
                  className="mb-6"
                />
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-body-md">
                Powered by 30+ years of proven mortgage performance. We build lifetime relationships through superior
                service and unwavering commitment to our partners' success.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <Facebook className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
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
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    P&L Challenge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/benefits"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Why Switch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
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
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Mortgage Brokerage
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Loan Processing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Marketing Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center group"
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
                    <p className="text-slate-300 text-sm">Phone</p>
                    <p className="text-white font-medium">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Email</p>
                    <p className="text-white font-medium">info@bfflender.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Location</p>
                    <p className="text-white font-medium">Las Vegas, Nevada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter */}
          <div className="border-t border-slate-700/50 pt-16 mb-16">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4 text-white">Stay Updated</h4>
              <p className="text-slate-300 mb-8 text-body-md">
                Get the latest mortgage industry insights, market updates, and exclusive BFFLender opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="input-professional bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 flex-1 h-12"
                />
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <span>© 2024 BFFLender. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6">
                <span>NMLS Licensed • Equal Housing Lender • BBB A+ Rated</span>
                <span>•</span>
                <span className="text-emerald-400">$2.3B+ Capital Deployed</span>
                <span>•</span>
                <span className="text-amber-400">Client for Life™</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
