"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import BFFLogo from "./BFFLogo"
import { useChatbot } from "../../app/_components/ChatbotProvider"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { openChatbot } = useChatbot()

  const handleTakeChallenge = () => {
    openChatbot()
  };

  return (
    <header className="border-b border-emerald-100/50 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto container-padding py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BFFLogo 
            size="md" 
            variant="dark" 
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link
            href="/challenge"
            className="text-slate-700 hover:text-emerald-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2 relative group"
          >
            P&L Challenge
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/benefits"
            className="text-slate-700 hover:text-emerald-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2 relative group"
          >
            Why Switch
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/about"
            className="text-slate-700 hover:text-emerald-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2 relative group"
          >
            About
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/contact"
            className="text-slate-700 hover:text-emerald-700 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2 relative group"
          >
            Contact
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Button 
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
            onClick={handleTakeChallenge}
          >
            Take Challenge
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center space-x-3">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
            onClick={handleTakeChallenge}
          >
            Challenge
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-emerald-50 rounded-xl">
                <Menu className="h-6 w-6 text-slate-700" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-white border-l border-emerald-100">
              <div className="flex flex-col h-full">
                <SheetHeader className="pb-6 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <BFFLogo 
                      size="sm" 
                      variant="dark" 
                      showText={true}
                    />
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2 hover:bg-emerald-50 rounded-lg">
                      <X className="h-5 w-5 text-slate-700" />
                    </Button>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col space-y-2 mt-8 flex-1">
                  <Link
                    href="/challenge"
                    className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium py-4 px-4 rounded-xl transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>P&L Challenge</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <Link
                    href="/benefits"
                    className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium py-4 px-4 rounded-xl transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>Why Switch</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <Link
                    href="/about"
                    className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium py-4 px-4 rounded-xl transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>About</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium py-4 px-4 rounded-xl transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>Contact</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-emerald-100">
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold w-full py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105" 
                    onClick={() => {
                      setIsOpen(false);
                      handleTakeChallenge();
                    }}
                  >
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
