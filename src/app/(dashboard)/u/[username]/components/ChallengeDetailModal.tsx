'use client'

import { useState, useEffect } from 'react'
import {
  X,
  User,
  Mail,
  Calendar,
  FileText,
  Download,
  Save,
  Loader2,
  CheckCircle2,
  Upload,
  AlertCircle,
} from 'lucide-react'
import type { Challenge, Document } from '@/payload-types'
import {
  getChallengeWithDetails,
  updateChallengeDetails,
  type ChallengeWithDetails,
} from '@/app/(dashboard)/u/[username]/actions/queriesManagementActions'

interface ChallengeDetailModalProps {
  challenge: Challenge
  onClose: () => void
  onUpdate: () => void
}

export default function ChallengeDetailModal({
  challenge: initialChallenge,
  onClose,
  onUpdate,
}: ChallengeDetailModalProps) {
  const [challenge, setChallenge] = useState<ChallengeWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(initialChallenge.status)
  const [notes, setNotes] = useState(initialChallenge.notes || '')
  const [hasChanges, setHasChanges] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })

  useEffect(() => {
    loadChallengeDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const statusChanged = status !== initialChallenge.status
    const notesChanged = notes !== (initialChallenge.notes || '')
    setHasChanges(statusChanged || notesChanged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, notes])

  const loadChallengeDetails = async () => {
    setLoading(true)
    try {
      const result = await getChallengeWithDetails(initialChallenge.id)
      if (result.success && result.data) {
        setChallenge(result.data)
      }
    } catch (error) {
      console.error('Failed to load challenge details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!hasChanges) return

    setSaving(true)
    try {
      const result = await updateChallengeDetails(initialChallenge.id, {
        status,
        notes,
      })

      if (result.success) {
        onUpdate()
        onClose()
      } else {
        alert(result.message || 'Failed to update challenge')
      }
    } catch (error) {
      console.error('Failed to save changes:', error)
      alert('An error occurred while saving changes')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file || !challenge) return

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        message: 'File too large (max 10MB)',
      })
      return
    }

    // Get user ID from challenge
    const userId = typeof challenge.user === 'string'
      ? challenge.user
      : challenge.user?.id

    if (!userId) {
      setUploadStatus({
        type: 'error',
        message: 'User not found for this challenge',
      })
      return
    }

    setUploading(true)
    setUploadStatus({ type: 'idle', message: '' })

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)
      formData.append('challengeId', initialChallenge.id)

      const response = await fetch('/api/admin/upload-completion', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setUploadStatus({
          type: 'success',
          message: 'Document uploaded successfully!',
        })
        // Refresh challenge details to show new document
        await loadChallengeDetails()
        // Reset upload status after 3 seconds
        setTimeout(() => {
          setUploadStatus({ type: 'idle', message: '' })
        }, 3000)
      } else {
        setUploadStatus({
          type: 'error',
          message: result.error || 'Upload failed',
        })
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        type: 'error',
        message: 'Network error during upload',
      })
    } finally {
      setUploading(false)
    }
  }

  const getDocumentTypeBadge = (documentType: string | null | undefined) => {
    if (!documentType) return null

    const badges = {
      'initial-submission': {
        label: 'Initial Submission',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
      },
      'completion-document': {
        label: 'Completion',
        className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      },
      'supporting-document': {
        label: 'Supporting',
        className: 'bg-gray-100 text-gray-700 border-gray-200',
      },
    }

    const badge = badges[documentType as keyof typeof badges]
    if (!badge) return null

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${badge.className}`}>
        {badge.label}
      </span>
    )
  }

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (currentStatus: Challenge['status']) => {
    switch (currentStatus) {
      case 'completed':
        return 'bg-emerald-500'
      case 'in_progress':
        return 'bg-blue-500'
      case 'verified':
        return 'bg-teal-500'
      case 'pending_verification':
        return 'bg-amber-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const timelineSteps = [
    { status: 'submitted', label: 'Submitted', date: challenge?.submittedAt },
    { status: 'pending_verification', label: 'Pending Verification', date: undefined },
    { status: 'verified', label: 'Verified', date: challenge?.verifiedAt },
    { status: 'in_progress', label: 'In Progress', date: undefined },
    { status: 'completed', label: 'Completed', date: challenge?.completedAt },
  ]

  const getCurrentStepIndex = () => {
    if (!challenge) return 0
    if (challenge.status === 'rejected') return -1
    return timelineSteps.findIndex((step) => step.status === challenge.status)
  }

  const currentStepIndex = getCurrentStepIndex()

  const handleDownloadDocument = (doc: Document) => {
    if (typeof doc.url === 'string') {
      window.open(doc.url, '_blank')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Challenge Details</h2>
            <p className="text-sm text-gray-600 mt-0.5">ID: {initialChallenge.id}</p>
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : challenge ? (
            <div className="space-y-6">
              {/* Applicant Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900 font-medium mt-1">{challenge.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{challenge.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submitted</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{formatDate(challenge.submittedAt)}</p>
                    </div>
                  </div>
                  {challenge.verifiedAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Verified</label>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <p className="text-gray-900">{formatDate(challenge.verifiedAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Management */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Management</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as Challenge['status'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="submitted">Submitted</option>
                      <option value="pending_verification">Pending Verification</option>
                      <option value="verified">Verified</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  {challenge.status !== 'rejected' && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Application Timeline
                      </label>
                      <div className="relative">
                        {timelineSteps.map((step, index) => (
                          <div key={step.status} className="flex items-start gap-4 mb-6 last:mb-0">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                  index <= currentStepIndex
                                    ? `${getStatusColor(step.status as Challenge['status'])} border-transparent`
                                    : 'bg-gray-100 border-gray-300'
                                }`}
                              >
                                {index <= currentStepIndex ? (
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                )}
                              </div>
                              {index < timelineSteps.length - 1 && (
                                <div
                                  className={`w-0.5 h-12 ${index < currentStepIndex ? getStatusColor(step.status as Challenge['status']) : 'bg-gray-200'}`}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-2">
                              <p
                                className={`font-medium ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'}`}
                              >
                                {step.label}
                              </p>
                              {step.date && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {formatDate(step.date)}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Answers */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Answers</h3>
                <div className="space-y-4">
                  {challenge.answers?.question1 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Primary Goal
                      </label>
                      <p className="text-gray-900 mt-1 bg-gray-50 rounded-lg p-3">
                        {challenge.answers.question1}
                      </p>
                    </div>
                  )}
                  {challenge.answers?.question2 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Experience Level
                      </label>
                      <p className="text-gray-900 mt-1 bg-gray-50 rounded-lg p-3">
                        {challenge.answers.question2}
                      </p>
                    </div>
                  )}
                  {challenge.answers?.question3 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Monthly Loan Volume
                      </label>
                      <p className="text-gray-900 mt-1 bg-gray-50 rounded-lg p-3">
                        {challenge.answers.question3}
                      </p>
                    </div>
                  )}
                  {challenge.answers?.additionalInfo && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Biggest Challenge
                      </label>
                      <p className="text-gray-900 mt-1 bg-gray-50 rounded-lg p-3">
                        {challenge.answers.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              {challenge.documents && challenge.documents.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    Documents ({challenge.documents.length})
                  </h3>
                  <div className="space-y-2">
                    {challenge.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-gray-900 truncate">
                                {typeof doc.filename === 'string' ? doc.filename : 'Document'}
                              </p>
                              {getDocumentTypeBadge(doc.documentType)}
                            </div>
                            <p className="text-xs text-gray-500">
                              {formatDate(doc.createdAt)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadDocument(doc)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0 ml-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Completion Document */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-600" />
                  Upload Completion Document
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Upload the completed challenge document for this user. Accepted formats: PDF, Word, Excel, Images (max 10MB)
                  </p>

                  <div className="relative">
                    <input
                      id={`file-upload-${initialChallenge.id}`}
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(file)
                          // Reset input so the same file can be uploaded again
                          e.target.value = ''
                        }
                      }}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label
                      htmlFor={`file-upload-${initialChallenge.id}`}
                      className={`flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        uploading
                          ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                          : 'border-amber-300 bg-amber-50 hover:bg-amber-100 hover:border-amber-400'
                      }`}
                    >
                      {uploading ? (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm font-medium">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-amber-600 mb-2" />
                          <span className="text-sm font-medium text-amber-900">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PDF, DOC, XLS, JPG, PNG (max 10MB)
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Upload Status Messages */}
                  {uploadStatus.type !== 'idle' && (
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg ${
                        uploadStatus.type === 'success'
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {uploadStatus.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <p
                        className={`text-sm font-medium ${
                          uploadStatus.type === 'success' ? 'text-emerald-800' : 'text-red-800'
                        }`}
                      >
                        {uploadStatus.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this application..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load challenge details</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
