'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { ArrowRight, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { loginAction } from '@/app/(frontend)/login/actions'

interface LoginFormProps {
  returnUrl?: string
  error?: string
}

export default function LoginForm({ returnUrl, error: urlError }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  // Set error from URL parameter if provided
  useEffect(() => {
    if (urlError) {
      setError(decodeURIComponent(urlError))
    }
  }, [urlError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        
        // Add return URL to form data if provided
        if (returnUrl) {
          formData.append('returnUrl', returnUrl)
        }

        const result = await loginAction(formData)

        // Only show error if we get an actual error response
        // If result is undefined/null, it likely means redirect happened
        if (result && !result.success) {
          setError(result.message || 'Login failed. Please try again.')
        }
        // If successful, the server action will handle the redirect
      } catch (error) {
        console.error('Login submission error:', error)
        setError('An unexpected error occurred. Please try again.')
      }
    })
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-slate-400">Sign in to access your lending portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-950/50 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={isPending}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 text-white placeholder:text-slate-400 rounded-xl focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isPending}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 text-white placeholder:text-slate-400 rounded-xl focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isPending}
          className="group w-full relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-emerald-600 disabled:hover:to-emerald-700 disabled:hover:shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In to Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors duration-200"
            onClick={() => {
              // TODO: Implement forgot password functionality
              alert('Forgot password functionality coming soon. Please contact support.')
            }}
          >
            Forgot your password?
          </button>
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-center gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-2 0h4m-7 1a9 9 0 1114 0H5z" />
            </svg>
            <span>256-bit SSL</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>NMLS Compliant</span>
          </div>
          <span>•</span>
          <span>Protected Login</span>
        </div>
      </div>
    </div>
  )
}