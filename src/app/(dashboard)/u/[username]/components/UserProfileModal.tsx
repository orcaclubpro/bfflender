'use client'

import { useState, useEffect } from 'react'
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  ExternalLink,
  Loader2,
  Shield,
} from 'lucide-react'
import type { User as UserType, Challenge } from '@/payload-types'
import {
  getUserChallengesDetailed,
  type ChallengeWithDetails,
} from '@/app/(dashboard)/u/[username]/actions/queriesManagementActions'
import ChallengeDetailModal from './ChallengeDetailModal'

interface UserProfileModalProps {
  user: UserType
  onClose: () => void
}

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  const [challenges, setChallenges] = useState<ChallengeWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  useEffect(() => {
    loadUserChallenges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  const loadUserChallenges = async () => {
    setLoading(true)
    try {
      const result = await getUserChallengesDetailed(user.id)
      if (result.success && result.data) {
        setChallenges(result.data)
      }
    } catch (error) {
      console.error('Failed to load user challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return 'Not provided'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadgeColor = (status: Challenge['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'verified':
        return 'bg-teal-500/10 text-teal-600 border-teal-500/20'
      case 'pending_verification':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'rejected':
        return 'bg-red-500/10 text-red-600 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  const formatStatus = (status: Challenge['status']) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleViewDashboard = () => {
    if (user.username) {
      window.open(`/u/${user.username}`, '_blank')
    }
  }

  const handleChallengeUpdated = () => {
    loadUserChallenges() // Refresh challenges
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  {user.lastName?.charAt(0) || ''}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username || 'User Profile'}
                </h2>
                <p className="text-sm text-gray-600">@{user.username || 'no-username'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <p className="text-gray-900 mt-1">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <p className="text-gray-900 mt-1">{user.phone}</p>
                    </div>
                  )}
                  {user.address && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </label>
                      <p className="text-gray-900 mt-1">
                        {user.address}
                        {user.city && `, ${user.city}`}
                        {user.state && `, ${user.state}`}
                        {user.zipCode && ` ${user.zipCode}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Account Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <p className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          user.roles === 'admin'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {user.roles === 'admin' ? 'Admin' : 'Client'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Account Created
                    </label>
                    <p className="text-gray-900 mt-1">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              {(user.employmentStatus || user.employer || user.annualIncome) && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Employment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {user.employmentStatus && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Employment Status
                        </label>
                        <p className="text-gray-900 mt-1 capitalize">
                          {user.employmentStatus.replace(/_/g, ' ')}
                        </p>
                      </div>
                    )}
                    {user.employer && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Employer</label>
                        <p className="text-gray-900 mt-1">{user.employer}</p>
                      </div>
                    )}
                    {user.annualIncome && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Annual Income
                        </label>
                        <p className="text-gray-900 mt-1">{formatCurrency(user.annualIncome)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Challenges */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Applications & Challenges ({challenges.length})
                </h3>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                ) : challenges.length > 0 ? (
                  <div className="space-y-2">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-medium text-gray-900">
                              Challenge #{challenge.id.slice(-6)}
                            </p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(challenge.status)}`}
                            >
                              {formatStatus(challenge.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(challenge.submittedAt)}
                            </div>
                            {challenge.documentCount !== undefined && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {challenge.documentCount} document
                                {challenge.documentCount !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedChallenge(challenge)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>No challenges found for this user</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            {user.username && (
              <button
                onClick={handleViewDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <ChallengeDetailModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onUpdate={handleChallengeUpdated}
        />
      )}
    </>
  )
}
