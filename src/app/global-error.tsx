'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-red-900 relative overflow-hidden flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>

            {/* Content */}
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Something went wrong!
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              We're sorry, but an unexpected error occurred. Our team has been notified and is working to fix this issue.
            </p>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-slate-900/50 rounded-lg text-left">
                <h3 className="text-red-400 font-semibold mb-2">Error Details:</h3>
                <p className="text-slate-300 text-sm font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-slate-400 text-xs mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={reset}
                className="btn-primary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </div>

            {/* Contact Support */}
            <div className="mt-12 text-slate-400">
              <p className="text-sm mb-2">
                If this problem persists, please contact our support team.
              </p>
              <a 
                href="/contact" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}