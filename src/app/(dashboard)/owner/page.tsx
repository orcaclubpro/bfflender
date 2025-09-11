'use client'

import { useState, useActionState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getChallengeData, createOwnerAccount, completeUserCreation } from './actions'
import { ShieldCheck, Mail, Lock, CheckCircle, AlertCircle, User, Sparkles } from 'lucide-react'

interface ChallengeData {
  email: string
  name: string
  challengeId: string
  error?: string
}

function OwnerVerificationContent() {
  const searchParams = useSearchParams()
  const challengeId = searchParams.get('challenge')
  
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Form state using useActionState
  const [createAccountState, createAccountAction, createAccountPending] = useActionState(createOwnerAccount, undefined)

  // Load challenge data when component mounts
  useEffect(() => {
    async function loadChallenge() {
      if (!challengeId) {
        setError('No challenge ID provided. Please check your verification link.')
        setLoading(false)
        return
      }

      try {
        const data = await getChallengeData(challengeId)
        if (data.error) {
          setError(data.error)
        } else {
          setChallengeData(data as ChallengeData)
        }
      } catch {
        setError('Failed to load challenge data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadChallenge()
  }, [challengeId])

  // Handle successful user creation
  useEffect(() => {
    if (createAccountState?.success && createAccountState?.redirectUrl) {
      // Show success message briefly then redirect
      setTimeout(() => {
        completeUserCreation(createAccountState.redirectUrl!)
      }, 2000)
    }
  }, [createAccountState])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-navy-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="card-elevated w-full max-w-md">
          <CardContent className="flex items-center justify-center py-16">
            <div className="animate-pulse flex items-center space-x-3">
              <div className="w-6 h-6 bg-emerald-200 rounded-full animate-bounce"></div>
              <div className="w-6 h-6 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-6 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-navy-50 to-gray-50 flex items-center justify-center p-4">
        <Card className="card-elevated w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-display-md text-red-600">
              Verification Error
            </CardTitle>
            <CardDescription className="text-body-md text-red-500">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline" 
              className="w-full"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-navy-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="card-elevated overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-display-sm font-bold">Create Your Account</h1>
                <p className="text-emerald-100 text-body-sm">Get your results and access your dashboard</p>
              </div>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Success Message */}
            {createAccountState?.success && (
              <Alert className="border-emerald-200 bg-emerald-50 animate-fade-in-up">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <AlertDescription className="text-emerald-800 font-medium">
                  {createAccountState.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Welcome Message */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2 rounded-full border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 font-medium text-body-sm">
                  Welcome, {challengeData?.name?.split(' ')[0] || 'there'}!
                </span>
              </div>
              <h2 className="text-display-sm text-navy-900 font-bold">
                You're Almost Done!
              </h2>
              <p className="text-body-md text-navy-600">
                Create your password to access your personalized mortgage results and dashboard.
              </p>
            </div>

            {/* Form */}
            <form action={createAccountAction} className="space-y-6">
              <input type="hidden" name="challengeId" value={challengeData?.challengeId || ''} />
              
              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-body-sm font-semibold text-navy-900 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={challengeData?.email || ''}
                  readOnly
                  className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-200"
                />
                <p className="text-body-xs text-navy-500">
                  This email is linked to your challenge submission
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-body-sm font-semibold text-navy-900 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Create Password</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter a secure password"
                  required
                  className="w-full"
                  autoComplete="new-password"
                />
                {createAccountState?.errors?.password && (
                  <div className="space-y-1">
                    {createAccountState.errors.password.map((error, index) => (
                      <p key={index} className="text-body-sm text-red-600 flex items-start space-x-1">
                        <AlertCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-body-sm font-semibold text-navy-900 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Confirm Password</span>
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full"
                  autoComplete="new-password"
                />
                {createAccountState?.errors?.confirmPassword && (
                  <p className="text-body-sm text-red-600 flex items-start space-x-1">
                    <AlertCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{createAccountState.errors.confirmPassword[0]}</span>
                  </p>
                )}
              </div>

              {/* General Errors */}
              {createAccountState?.errors?.general && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {createAccountState.errors.general[0]}
                  </AlertDescription>
                </Alert>
              )}

              {/* Password Requirements */}
              <div className="bg-gradient-to-r from-blue-50 to-navy-50 p-4 rounded-xl border border-blue-100">
                <h4 className="text-body-sm font-semibold text-navy-900 mb-3 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Password Requirements</span>
                </h4>
                <ul className="text-body-xs text-navy-700 space-y-1 grid grid-cols-1 gap-1">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span>At least 8 characters long</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span>Contains at least one letter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span>Contains at least one number</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span>Contains at least one special character</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-body-md font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={createAccountPending}
              >
                {createAccountPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Your Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Create Account to Get Your Results!</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security & Trust Section */}
            <div className="text-center pt-6 border-t border-navy-100 space-y-3">
              <div className="flex items-center justify-center space-x-2 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-body-sm font-medium">Secure & Encrypted</span>
              </div>
              <p className="text-body-xs text-navy-500">
                Your information is protected with bank-level security. Need help?{' '}
                <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
                  Contact our support team
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function OwnerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-navy-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="card-elevated w-full max-w-md">
          <CardContent className="flex items-center justify-center py-16">
            <div className="animate-pulse flex items-center space-x-3">
              <div className="w-6 h-6 bg-emerald-200 rounded-full animate-bounce"></div>
              <div className="w-6 h-6 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-6 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <OwnerVerificationContent />
    </Suspense>
  )
}