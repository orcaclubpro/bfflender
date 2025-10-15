'use client'

import React, { useState, useEffect } from 'react'
import {
  Search,
  ChevronDown,
  ChevronRight,
  User as UserIcon,
  Mail,
  Calendar,
  FileText,
  RotateCw,
  Eye,
  Edit,
} from 'lucide-react'
import type { User, Challenge } from '@/payload-types'
import {
  getUsersWithChallenges,
  type UserWithChallenges,
} from '@/app/(dashboard)/u/[username]/actions/queriesManagementActions'
import ChallengeDetailModal from './ChallengeDetailModal'
import UserProfileModal from './UserProfileModal'

interface NotificationState {
  show: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export default function QueriesManagement({ currentUser: _currentUser }: { currentUser: User }) {
  const [users, setUsers] = useState<UserWithChallenges[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: 'info',
    message: '',
  })

  const showNotification = (type: NotificationState['type'], message: string) => {
    setNotification({ show: true, type, message })
    setTimeout(() => setNotification({ show: false, type: 'info', message: '' }), 5000)
  }

  const loadUsers = async () => {
    setLoading(true)
    try {
      const result = await getUsersWithChallenges(currentPage, 10, search, roleFilter)
      if (result.success && result.data) {
        setUsers(result.data.users)
        setTotalPages(result.data.totalPages)
        setTotalUsers(result.data.totalUsers)
      } else {
        showNotification('error', result.message || 'Failed to load users')
      }
    } catch (error) {
      showNotification('error', 'An error occurred while loading users')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, roleFilter])

  const toggleUserExpanded = (userId: string) => {
    const newExpanded = new Set(expandedUsers)
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId)
    } else {
      newExpanded.add(userId)
    }
    setExpandedUsers(newExpanded)
  }

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
  }

  const handleUserProfileClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleChallengeUpdated = () => {
    loadUsers() // Refresh the list
    showNotification('success', 'Challenge updated successfully')
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

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-top-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : notification.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : notification.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            View and manage user applications and challenges
          </p>
        </div>
        <button
          onClick={loadUsers}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
        <p className="text-sm text-blue-800">
          Showing <span className="font-semibold">{users.length}</span> of{' '}
          <span className="font-semibold">{totalUsers}</span> users
        </p>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <RotateCw className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No users found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Challenges
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleUserExpanded(user.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {expandedUsers.has(user.id) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            {user.lastName?.charAt(0) || ''}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.username || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">@{user.username || 'no-username'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          user.roles === 'admin'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {user.roles === 'admin' ? 'Admin' : 'Client'}
                      </span>
                    </td>

                    {/* Challenge Count */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">
                        {user.challengeCount}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleUserProfileClick(user)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                    </td>
                    </tr>
                    {expandedUsers.has(user.id) && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        {user.challenges && user.challenges.length > 0 ? (
                          <div className="space-y-2 pl-12">
                            <p className="text-sm font-semibold text-gray-700 mb-3">
                              Challenges ({user.challenges.length})
                            </p>
                            {user.challenges.map((challenge) => (
                              <div
                                key={challenge.id}
                                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                      Challenge #{challenge.id.slice(-6)}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(challenge.status)}`}
                                      >
                                        {formatStatus(challenge.status)}
                                      </span>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(challenge.submittedAt)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleChallengeClick(challenge)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  View/Edit
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="pl-12 py-4">
                            <p className="text-sm text-gray-500 italic">
                              No challenges for this user
                            </p>
                          </div>
                        )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedChallenge && (
        <ChallengeDetailModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onUpdate={handleChallengeUpdated}
        />
      )}

      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
