"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-navy-100/50 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto container-padding py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl sm:text-2xl">BFF</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">BFFLender</h1>
            <p className="text-sm text-navy-500 font-medium hidden sm:block">Powered by AllWestern Mortgage</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link
            href="#challenge"
            className="text-navy-600 hover:text-blue-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2"
          >
            P&L Challenge
          </Link>
          <Link
            href="#benefits"
            className="text-navy-600 hover:text-blue-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2"
          >
            Why Switch
          </Link>
          <Link
            href="#proof"
            className="text-navy-600 hover:text-blue-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2"
          >
            Proof
          </Link>
          <Link
            href="/contact"
            className="text-navy-600 hover:text-blue-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2"
          >
            Contact
          </Link>
          <Button className="btn-primary text-base">Take Challenge</Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center space-x-3">
          <Button size="sm" className="btn-primary text-sm px-6 py-3">
            Challenge
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-navy-50">
                <Menu className="h-6 w-6 text-navy-600" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-white border-l border-navy-100">
              <div className="flex flex-col h-full">
                <SheetHeader className="pb-6 border-b border-navy-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">BFF</span>
                      </div>
                      <div>
                        <SheetTitle className="text-lg font-bold text-navy-900">BFFLender</SheetTitle>
                        <p className="text-xs text-navy-500">AllWestern Mortgage</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                      <X className="h-5 w-5 text-navy-600" />
                    </Button>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col space-y-2 mt-8 flex-1">
                  <Link
                    href="#challenge"
                    className="text-navy-700 hover:text-blue-700 hover:bg-blue-50 font-medium py-4 px-4 rounded-xl transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    P&L Challenge
                  </Link>
                  <Link
                    href="#benefits"
                    className="text-navy-700 hover:text-blue-700 hover:bg-blue-50 font-medium py-4 px-4 rounded-xl transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Why Switch
                  </Link>
                  <Link
                    href="#proof"
                    className="text-navy-700 hover:text-blue-700 hover:bg-blue-50 font-medium py-4 px-4 rounded-xl transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Proof
                  </Link>
                  <Link
                    href="/contact"
                    className="text-navy-700 hover:text-blue-700 hover:bg-blue-50 font-medium py-4 px-4 rounded-xl transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-navy-100">
                  <Button className="btn-primary w-full text-base py-4" onClick={() => setIsOpen(false)}>
                    Take P&L Challenge
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
