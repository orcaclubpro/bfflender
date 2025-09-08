import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BFFLogo from '@/components/layout/BFFLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Simple Header */}
      <header className="relative z-20 border-b border-slate-800/50">
        <div className="container-padding py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <BFFLogo className="w-8 h-8" />
              <span className="text-xl font-black text-white">BFFLender</span>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="relative z-10 min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Visual */}
          <div className="mb-8">
            <svg 
              width="200" 
              height="120" 
              viewBox="0 0 200 120" 
              className="mx-auto text-emerald-400/30"
            >
              <text 
                x="100" 
                y="70" 
                className="fill-current text-6xl font-black" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                404
              </text>
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="btn-primary"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 text-slate-400">
            <p className="text-sm mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/about" 
                className="hover:text-emerald-400 transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/benefits" 
                className="hover:text-emerald-400 transition-colors"
              >
                Benefits
              </Link>
              <Link 
                href="/challenge" 
                className="hover:text-emerald-400 transition-colors"
              >
                P&L Challenge
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-emerald-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="relative z-20 border-t border-slate-800/50 py-8">
        <div className="container-padding">
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2024 BFFLender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const metadata = {
  title: '404 - Page Not Found | BFFLender',
  description: 'The page you are looking for could not be found.',
}