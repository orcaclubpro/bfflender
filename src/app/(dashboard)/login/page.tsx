import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'
import LoginForm from './components/LoginForm'
import Header from "../../_components/Header"
import Footer from "../../_components/Footer"

export default async function LoginPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // If user is already logged in, redirect to their dashboard
  if (user) {
    // Fetch full user data to get username if not already available
    if (user.username) {
      redirect(`/u/${user.username}`)
    } else {
      // Fallback: fetch full user data to get username
      try {
        const fullUser = await payload.findByID({
          collection: 'users',
          id: user.id,
          depth: 0,
        })
        if (fullUser.username) {
          redirect(`/u/${fullUser.username}`)
        } else {
          // If still no username, redirect to home page
          redirect('/')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        redirect('/')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Login Form Section */}
      <div className="relative z-10 min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Brand Section */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 64 64" 
                className="text-emerald-400 w-16 h-16"
              >
                <rect x="8" y="48" width="48" height="8" rx="3" fill="currentColor" opacity="0.9"/>
                <rect x="12" y="36" width="8" height="20" rx="2" fill="currentColor" opacity="0.7"/>
                <rect x="24" y="28" width="8" height="28" rx="2" fill="currentColor" opacity="0.8"/>
                <rect x="36" y="20" width="8" height="36" rx="2" fill="currentColor" opacity="0.85"/>
                <rect x="48" y="12" width="8" height="44" rx="2" fill="currentColor"/>
                <path 
                  d="M16 32 Q32 6 48 16" 
                  stroke="#f59e0b" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <circle cx="50" cy="16" r="3" fill="#f59e0b" opacity="0.9"/>
              </svg>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">BFFLender Portal</h1>
            <p className="text-emerald-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
              Your Best Foot Forward
            </p>
            <p className="text-slate-300 text-lg">
              Access your mortgage lending dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <LoginForm />
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m5-8.5V7a5 5 0 00-10 0v3.5M7 17h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>NMLS Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'Login - BFFLender Portal',
  description: 'Access your BFFLender mortgage lending dashboard with secure authentication.',
}