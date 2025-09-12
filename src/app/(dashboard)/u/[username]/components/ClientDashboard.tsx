'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { User as PayloadUser } from '@/payload-types'
import type { 
  UserProfileFormData, 
  UserProfileFormErrors, 
  DocumentData, 
  TimelineItem,
  DocumentUploadFormData,
  DocumentUploadFormErrors 
} from '@/types/components'
import type { ApplicationData } from '@/app/(dashboard)/u/[username]/actions/applicationActions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import BFFLogo from '@/components/layout/BFFLogo'
import {
  FileText,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Download,
  Calendar,
  Home,
  User,
  Bell,
  CreditCard,
  Shield,
  Camera,
  Trash2,
  Loader2,
  FileIcon
} from 'lucide-react'

interface ClientDashboardProps {
  user: PayloadUser
  currentUser: PayloadUser
}

type ActivePage = 'results' | 'settings'

// Real application interfaces now imported from types

// Mock data removed - now using real Payload CMS data

const _formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    submitted: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Submitted' },
    pending_verification: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending Verification' },
    verified: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Verified' },
    in_progress: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'In Progress' },
    completed: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Completed' },
    rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Not Approved' }
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted
  
  return (
    <Badge className={cn('text-xs font-medium border', config.color)}>
      {config.label}
    </Badge>
  )
}

const getProgressColor = (status: string) => {
  const colors = {
    'submitted': 'from-amber-500 to-amber-600',
    'pending_verification': 'from-amber-500 to-amber-600',
    'verified': 'from-blue-500 to-blue-600',
    'in_progress': 'from-blue-500 to-blue-600',
    'completed': 'from-emerald-500 to-emerald-600',
    'rejected': 'from-red-500 to-red-600'
  }
  
  return colors[status as keyof typeof colors] || colors.submitted
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function ClientDashboard({ user: _user, currentUser }: ClientDashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('results')
  const [profileForm, setProfileForm] = useState<UserProfileFormData>({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    city: currentUser.city || '',
    state: currentUser.state || '',
    zipCode: currentUser.zipCode || '',
    employmentStatus: (currentUser.employmentStatus as UserProfileFormData['employmentStatus']) || '',
    employer: currentUser.employer || '',
    annualIncome: currentUser.annualIncome ? currentUser.annualIncome.toString() : ''
  })
  const [formErrors, setFormErrors] = useState<UserProfileFormErrors>({})
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
  const [profileUpdateMessage, setProfileUpdateMessage] = useState('')

  // New state for real application data
  const [applications, setApplications] = useState<ApplicationData[]>([])
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null)
  const [isLoadingApplications, setIsLoadingApplications] = useState(true)
  const [applicationError, setApplicationError] = useState('')
  const [userDocuments, setUserDocuments] = useState<DocumentData[]>([])
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false)
  const [isUploadingDocument, setIsUploadingDocument] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [documentUploadForm, setDocumentUploadForm] = useState<DocumentUploadFormData>({
    description: '',
    tags: '',
    isPublic: false
  })
  const [_documentUploadErrors, setDocumentUploadErrors] = useState<DocumentUploadFormErrors>({})
  const [isDeletingDocument, setIsDeletingDocument] = useState<string | null>(null)

  const handleLogout = async () => {
    const { logoutAction } = await import('@/app/(dashboard)/u/[username]/actions/logoutAction')
    await logoutAction()
  }

  // Update profile form with latest user data when currentUser changes
  useEffect(() => {
    setProfileForm({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      city: currentUser.city || '',
      state: currentUser.state || '',
      zipCode: currentUser.zipCode || '',
      employmentStatus: (currentUser.employmentStatus as UserProfileFormData['employmentStatus']) || '',
      employer: currentUser.employer || '',
      annualIncome: currentUser.annualIncome ? currentUser.annualIncome.toString() : ''
    })
  }, [currentUser])

  const handleProfileUpdate = async () => {
    setIsSubmittingProfile(true)
    setFormErrors({})
    setProfileUpdateMessage('')

    try {
      const { updateUserProfile } = await import('@/app/(dashboard)/u/[username]/actions/userProfileActions')
      const result = await updateUserProfile(profileForm)

      if (result.success) {
        setProfileUpdateMessage('Profile updated successfully!')
        // Optionally refresh the page or update state with new data
        if (result.data) {
          // Update the local form state with the returned data
          setProfileForm({
            firstName: result.data.firstName || '',
            lastName: result.data.lastName || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            address: result.data.address || '',
            city: result.data.city || '',
            state: result.data.state || '',
            zipCode: result.data.zipCode || '',
            employmentStatus: (result.data.employmentStatus as UserProfileFormData['employmentStatus']) || '',
            employer: result.data.employer || '',
            annualIncome: result.data.annualIncome ? result.data.annualIncome.toString() : ''
          })
        }
      } else {
        setProfileUpdateMessage(result.message)
        if (result.errors) {
          setFormErrors(result.errors)
        }
      }
    } catch (_error) {
      console.error('Profile update error:', _error)
      setProfileUpdateMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmittingProfile(false)
    }
  }

  // Load applications on component mount
  useEffect(() => {
    loadUserApplications()
    loadUserDocuments()
  }, [currentUser.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserApplications = async () => {
    setIsLoadingApplications(true)
    setApplicationError('')
    try {
      const { getUserApplications } = await import('@/app/(dashboard)/u/[username]/actions/applicationActions')
      const result = await getUserApplications(currentUser.id)
      
      if (result.success && result.data) {
        setApplications(result.data)
        // Set the first application as selected by default
        if (result.data.length > 0) {
          setSelectedApplication(result.data[0])
        }
      } else {
        setApplicationError(result.message)
      }
    } catch {
      setApplicationError('Failed to load applications')
    } finally {
      setIsLoadingApplications(false)
    }
  }

  const loadUserDocuments = async () => {
    setIsLoadingDocuments(true)
    try {
      const { getDocumentsByUser } = await import('@/app/(dashboard)/u/[username]/actions/documentActions')
      const result = await getDocumentsByUser(currentUser.id)
      
      if (result.success && result.data) {
        // Transform Payload Document data to match DocumentData interface
        const transformedDocuments: DocumentData[] = result.data.map(doc => ({
          id: doc.id,
          filename: doc.filename || null,
          url: doc.url || null,
          mimeType: doc.mimeType || null,
          filesize: doc.filesize || null,
          description: doc.description || null,
          tags: doc.tags || null,
          relatedUser: typeof doc.relatedUser === 'string' ? doc.relatedUser : 
                      doc.relatedUser?.id || null,
          relatedChallenge: typeof doc.relatedChallenge === 'string' ? doc.relatedChallenge : 
                           doc.relatedChallenge?.id || null,
          isPublic: doc.isPublic || null,
          uploadedBy: typeof doc.uploadedBy === 'string' ? doc.uploadedBy : 
                      doc.uploadedBy?.id || null,
          createdAt: doc.createdAt || null,
          updatedAt: doc.updatedAt || null,
        }))
        setUserDocuments(transformedDocuments)
      }
    } catch (_error) {
      console.error('Failed to load documents:', _error)
    } finally {
      setIsLoadingDocuments(false)
    }
  }

  const handleDocumentUpload = async (file: File, applicationId?: string) => {
    setIsUploadingDocument(true)
    setUploadError('')
    setUploadSuccess('')
    setDocumentUploadErrors({})
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadData = {
        description: documentUploadForm.description,
        tags: documentUploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        relatedChallenge: applicationId,
        isPublic: documentUploadForm.isPublic
      }
      
      const { uploadDocument } = await import('@/app/(dashboard)/u/[username]/actions/documentActions')
      const result = await uploadDocument(formData, uploadData)
      
      if (result.success) {
        setUploadSuccess('Document uploaded successfully!')
        // Reset form
        setDocumentUploadForm({ description: '', tags: '', isPublic: false })
        // Reload data
        await loadUserApplications()
        await loadUserDocuments()
      } else {
        setUploadError(result.message)
        if (result.errors) {
          setDocumentUploadErrors(result.errors)
        }
      }
    } catch {
      setUploadError('Failed to upload document')
    } finally {
      setIsUploadingDocument(false)
    }
  }

  const handleDocumentDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return
    
    setIsDeletingDocument(documentId)
    try {
      const { deleteDocument } = await import('@/app/(dashboard)/u/[username]/actions/documentActions')
      const result = await deleteDocument(documentId)
      
      if (result.success) {
        // Reload data
        await loadUserApplications()
        await loadUserDocuments()
      } else {
        alert('Failed to delete document: ' + result.message)
      }
    } catch {
      alert('Failed to delete document')
    } finally {
      setIsDeletingDocument(null)
    }
  }

  const generateTimeline = useCallback((application: ApplicationData): TimelineItem[] => {
    const timeline: TimelineItem[] = []
    const now = new Date()

    // Base timeline items with their order
    const timelineConfig = [
      {
        status: 'submitted',
        title: 'Application Submitted',
        description: 'Your application has been successfully submitted and is being reviewed.',
        dateField: 'submittedAt'
      },
      {
        status: 'verified',
        title: 'Account Verified',
        description: 'Your account has been verified and documents are being reviewed.',
        dateField: 'verifiedAt'
      },
      {
        status: 'in_progress',
        title: 'Application In Progress',
        description: 'Your application is actively being processed by our team.',
        dateField: 'verifiedAt'
      },
      {
        status: 'completed',
        title: 'Application Complete',
        description: 'Your application process has been completed.',
        dateField: 'completedAt'
      }
    ]

    // Map application status to timeline position
    const statusOrder = ['submitted', 'pending_verification', 'verified', 'in_progress', 'completed', 'rejected']
    const currentStatusIndex = statusOrder.indexOf(application.status)

    timelineConfig.forEach((config) => {
      let itemStatus: 'completed' | 'current' | 'upcoming' = 'upcoming'
      let date = 'TBD'

      if (application.status === 'rejected') {
        // Special case for rejected applications
        if (config.status === 'submitted') {
          itemStatus = 'completed'
          date = application.submittedAt || 'Unknown'
        } else {
          return // Skip other items for rejected applications
        }
      } else {
        const configStatusIndex = statusOrder.indexOf(config.status)
        
        if (configStatusIndex < currentStatusIndex) {
          itemStatus = 'completed'
        } else if (configStatusIndex === currentStatusIndex) {
          itemStatus = 'current'
        } else {
          itemStatus = 'upcoming'
        }

        // Set dates for completed and current items
        if (itemStatus === 'completed' || itemStatus === 'current') {
          const dateField = config.dateField as keyof ApplicationData
          const fieldValue = application[dateField]
          if (fieldValue) {
            date = fieldValue as string
          } else if (itemStatus === 'current') {
            // If current but no timestamp, use now
            date = now.toISOString()
          }
        }
      }

      timeline.push({
        date,
        title: config.title,
        description: config.description,
        status: itemStatus
      })
    })

    // Handle rejected status
    if (application.status === 'rejected') {
      timeline.push({
        date: application.updatedAt || now.toISOString(),
        title: 'Application Not Approved',
        description: 'Your application could not be approved at this time. Please contact us for more information.',
        status: 'current'
      })
    }

    return timeline
  }, [])

  // Calculate progress percentage  
  const getProgressPercentage = useCallback((application: ApplicationData): number => {
    const statusProgress = {
      'submitted': 20,
      'pending_verification': 25,
      'verified': 50,
      'in_progress': 75,
      'completed': 100,
      'rejected': 25
    }
    return statusProgress[application.status] || 0
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-screen bg-white shadow-lg border-r border-navy-100 relative">
          <div className="p-6 border-b border-navy-100">
            <BFFLogo 
              size="sm" 
              variant="dark" 
              showText={true}
              className="mb-4 hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="text-lg font-bold text-navy-900">My Dashboard</h2>
              <p className="text-sm text-navy-600 mt-1">{currentUser.firstName} {currentUser.lastName}</p>
              <p className="text-xs text-navy-500">{currentUser.email}</p>
            </div>
          </div>
          
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <button
                  onClick={() => setActivePage('results')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-blue-50',
                    activePage === 'results' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-navy-700 hover:text-blue-700'
                  )}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">My Application</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('settings')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-blue-50',
                    activePage === 'settings' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-navy-700 hover:text-blue-700'
                  )}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Account Settings</span>
                </button>
              </li>
              <li className="mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-red-50 text-navy-700 hover:text-red-700 focus-ring"
                  aria-label="Sign out of your account"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </li>
            </ul>
          </nav>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-navy-100 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <BFFLogo 
                  size="sm" 
                  variant="dark" 
                  showText={false}
                  className="hover:scale-105 transition-transform duration-300 lg:hidden"
                />
                <div>
                  <h1 className="text-2xl font-bold text-navy-900">
                    {activePage === 'results' ? 'My Applications' : 'Account Settings'}
                  </h1>
                  <p className="text-navy-600 text-sm mt-1">
                    {activePage === 'results' && 'Track your application progress and view important updates'}
                    {activePage === 'settings' && 'Manage your profile and account preferences'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-navy-600 hover:text-blue-600 cursor-pointer transition-colors" />
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {`${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8">
            {activePage === 'results' && (
              <div className="space-y-8 animate-fade-in-up">
                {isLoadingApplications ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-navy-600">Loading applications...</span>
                  </div>
                ) : applicationError ? (
                  <Card className="card-elevated">
                    <CardContent className="p-8 text-center">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">Error Loading Applications</h3>
                      <p className="text-navy-600 mb-4">{applicationError}</p>
                      <Button onClick={loadUserApplications} variant="outline">
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ) : applications.length === 0 ? (
                  <Card className="card-elevated">
                    <CardContent className="p-8 text-center">
                      <FileText className="w-12 h-12 text-navy-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">No Applications Found</h3>
                      <p className="text-navy-600">You don't have any applications yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Application Selection (if multiple applications) */}
                    {applications.length > 1 && (
                      <Card className="card-elevated">
                        <CardHeader>
                          <CardTitle>Your Applications</CardTitle>
                          <CardDescription>Select an application to view details</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {applications.map((app) => (
                              <button
                                key={app.id}
                                onClick={() => setSelectedApplication(app)}
                                className={cn(
                                  "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                                  selectedApplication?.id === app.id
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-navy-200 hover:border-blue-300 hover:bg-blue-50/50"
                                )}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-navy-900">#{app.id.slice(-6)}</span>
                                  {getStatusBadge(app.status)}
                                </div>
                                <p className="text-sm text-navy-600">
                                  Submitted {formatDate(app.submittedAt || app.createdAt || new Date().toISOString())}
                                </p>
                                {app.documents && app.documents.length > 0 && (
                                  <p className="text-xs text-navy-500 mt-1">
                                    {app.documents.length} document{app.documents.length > 1 ? 's' : ''}
                                  </p>
                                )}
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Selected Application Details */}
                    {selectedApplication && (
                      <>
                        <Card className="card-elevated">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                                  <Home className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl">Application #{selectedApplication.id.slice(-6)}</CardTitle>
                                  <CardDescription className="mt-2">
                                    {selectedApplication.name} • {selectedApplication.email}
                                  </CardDescription>
                                </div>
                              </div>
                              {getStatusBadge(selectedApplication.status)}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Applicant Name</Label>
                                <p className="text-navy-900 font-medium">{selectedApplication.name}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Email Address</Label>
                                <p className="text-navy-900 font-medium">{selectedApplication.email}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Submitted</Label>
                                <p className="text-navy-900 font-medium">
                                  {formatDate(selectedApplication.submittedAt || selectedApplication.createdAt || new Date().toISOString())}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Documents</Label>
                                <p className="text-navy-900 font-medium">
                                  {selectedApplication.documents?.length || 0} uploaded
                                </p>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-navy-700">Application Progress</Label>
                                <span className="text-sm font-medium text-navy-600">
                                  {getProgressPercentage(selectedApplication)}% complete
                                </span>
                              </div>
                              <div className="progress-bar">
                                <div 
                                  className={cn("progress-fill bg-gradient-to-r", getProgressColor(selectedApplication.status))}
                                  style={{ width: `${getProgressPercentage(selectedApplication)}%` }}
                                />
                              </div>
                            </div>

                            {/* Application Documents */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium text-navy-900">Application Documents</Label>
                                <input
                                  type="file"
                                  id="application-upload"
                                  className="hidden"
                                  multiple
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files || [])
                                    if (files.length > 0) {
                                      files.forEach(file => handleDocumentUpload(file, selectedApplication.id))
                                    }
                                    e.target.value = '' // Reset input
                                  }}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => document.getElementById('application-upload')?.click()}
                                  disabled={isUploadingDocument}
                                  className="btn-primary"
                                >
                                  {isUploadingDocument ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  ) : (
                                    <Upload className="w-4 h-4 mr-2" />
                                  )}
                                  Upload Documents
                                </Button>
                              </div>

                              {uploadError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                  {uploadError}
                                </div>
                              )}

                              {uploadSuccess && (
                                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm">
                                  {uploadSuccess}
                                </div>
                              )}

                              {selectedApplication.documents && selectedApplication.documents.length > 0 ? (
                                <div className="space-y-2">
                                  {selectedApplication.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                      <div className="flex items-center gap-3">
                                        <FileIcon className="w-5 h-5 text-emerald-600" />
                                        <div>
                                          <p className="font-medium text-emerald-900">
                                            {doc.filename || `Document ${doc.id.slice(-6)}`}
                                          </p>
                                          <p className="text-xs text-emerald-600">
                                            Uploaded {formatDate(doc.createdAt || new Date().toISOString())}
                                            {doc.filesize && ` • ${formatFileSize(doc.filesize)}`}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {doc.url && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-emerald-300"
                                            onClick={() => doc.url && window.open(doc.url, '_blank')}
                                          >
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        )}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="border-red-300 text-red-600"
                                          onClick={() => handleDocumentDelete(doc.id)}
                                          disabled={isDeletingDocument === doc.id}
                                        >
                                          {isDeletingDocument === doc.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                          ) : (
                                            <Trash2 className="w-4 h-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-navy-500">
                                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm">No documents uploaded yet</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Application Timeline */}
                        <Card className="card-elevated">
                          <CardHeader>
                            <CardTitle>Application Timeline</CardTitle>
                            <CardDescription>Track the progress of your application</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-8">
                              {generateTimeline(selectedApplication).map((item, index) => (
                                <div key={index} className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={cn(
                                      "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                                      item.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                                      item.status === 'current' ? 'bg-blue-500 border-blue-500' : 
                                      'bg-gray-200 border-gray-300'
                                    )}>
                                      {item.status === 'completed' ? (
                                        <CheckCircle className="w-5 h-5 text-white" />
                                      ) : item.status === 'current' ? (
                                        <Clock className="w-5 h-5 text-white" />
                                      ) : (
                                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                                      )}
                                    </div>
                                    {index < generateTimeline(selectedApplication).length - 1 && (
                                      <div className={cn(
                                        "w-0.5 h-16 mt-2",
                                        item.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
                                      )} />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-8">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className={cn(
                                        "font-semibold",
                                        item.status === 'current' ? 'text-blue-700' : 'text-navy-900'
                                      )}>
                                        {item.title}
                                      </h3>
                                      <span className="text-sm text-navy-500">
                                        {item.date !== 'TBD' ? formatDate(item.date) : 'TBD'}
                                      </span>
                                    </div>
                                    <p className="text-navy-600 text-sm">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="card-elevated hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">Upload Documents</h3>
                        <p className="text-sm text-navy-600 mt-1">Submit required documentation</p>
                      </div>
                      <Button
                        className="w-full btn-secondary"
                        onClick={() => {
                          if (selectedApplication) {
                            document.getElementById('application-upload')?.click()
                          } else {
                            alert('Please select an application first')
                          }
                        }}
                        disabled={isUploadingDocument || !selectedApplication}
                      >
                        {isUploadingDocument ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          'Upload Files'
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                        <Calendar className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">Schedule Call</h3>
                        <p className="text-sm text-navy-600 mt-1">Talk with your loan officer</p>
                      </div>
                      <Button variant="outline" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">View All Documents</h3>
                        <p className="text-sm text-navy-600 mt-1">Access all your uploaded files</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActivePage('settings')}
                      >
                        Document Center
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activePage === 'settings' && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>Update your personal details and contact information</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Success/Error Messages */}
                      {profileUpdateMessage && (
                        <div className={cn(
                          "p-3 rounded-lg text-sm font-medium",
                          profileUpdateMessage.includes('successfully') 
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        )}>
                          {profileUpdateMessage}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className={formErrors.firstName ? 'text-red-600' : ''}>First Name</Label>
                          <Input
                            id="firstName"
                            value={profileForm.firstName}
                            onChange={(e) => {
                              setProfileForm(prev => ({ ...prev, firstName: e.target.value }))
                              if (formErrors.firstName) {
                                setFormErrors(prev => ({ ...prev, firstName: undefined }))
                              }
                            }}
                            className={cn("input-professional", formErrors.firstName && "border-red-300 focus:border-red-500")}
                            disabled={isSubmittingProfile}
                          />
                          {formErrors.firstName && (
                            <p className="text-sm text-red-600">{formErrors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className={formErrors.lastName ? 'text-red-600' : ''}>Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileForm.lastName}
                            onChange={(e) => {
                              setProfileForm(prev => ({ ...prev, lastName: e.target.value }))
                              if (formErrors.lastName) {
                                setFormErrors(prev => ({ ...prev, lastName: undefined }))
                              }
                            }}
                            className={cn("input-professional", formErrors.lastName && "border-red-300 focus:border-red-500")}
                            disabled={isSubmittingProfile}
                          />
                          {formErrors.lastName && (
                            <p className="text-sm text-red-600">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className={formErrors.email ? 'text-red-600' : ''}>Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, email: e.target.value }))
                            if (formErrors.email) {
                              setFormErrors(prev => ({ ...prev, email: undefined }))
                            }
                          }}
                          className={cn("input-professional", formErrors.email && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                        />
                        {formErrors.email && (
                          <p className="text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className={formErrors.phone ? 'text-red-600' : ''}>Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, phone: e.target.value }))
                            if (formErrors.phone) {
                              setFormErrors(prev => ({ ...prev, phone: undefined }))
                            }
                          }}
                          className={cn("input-professional", formErrors.phone && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                          placeholder="(555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className={formErrors.address ? 'text-red-600' : ''}>Street Address</Label>
                        <Input
                          id="address"
                          value={profileForm.address}
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, address: e.target.value }))
                            if (formErrors.address) {
                              setFormErrors(prev => ({ ...prev, address: undefined }))
                            }
                          }}
                          className={cn("input-professional", formErrors.address && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                          placeholder="123 Main Street"
                        />
                        {formErrors.address && (
                          <p className="text-sm text-red-600">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className={formErrors.city ? 'text-red-600' : ''}>City</Label>
                          <Input
                            id="city"
                            value={profileForm.city}
                            onChange={(e) => {
                              setProfileForm(prev => ({ ...prev, city: e.target.value }))
                              if (formErrors.city) {
                                setFormErrors(prev => ({ ...prev, city: undefined }))
                              }
                            }}
                            className={cn("input-professional", formErrors.city && "border-red-300 focus:border-red-500")}
                            disabled={isSubmittingProfile}
                            placeholder="Your City"
                          />
                          {formErrors.city && (
                            <p className="text-sm text-red-600">{formErrors.city}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="state" className={formErrors.state ? 'text-red-600' : ''}>State</Label>
                            <Input
                              id="state"
                              value={profileForm.state}
                              onChange={(e) => {
                                setProfileForm(prev => ({ ...prev, state: e.target.value }))
                                if (formErrors.state) {
                                  setFormErrors(prev => ({ ...prev, state: undefined }))
                                }
                              }}
                              className={cn("input-professional", formErrors.state && "border-red-300 focus:border-red-500")}
                              disabled={isSubmittingProfile}
                              placeholder="State"
                            />
                            {formErrors.state && (
                              <p className="text-sm text-red-600">{formErrors.state}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className={formErrors.zipCode ? 'text-red-600' : ''}>ZIP Code</Label>
                            <Input
                              id="zipCode"
                              value={profileForm.zipCode}
                              onChange={(e) => {
                                setProfileForm(prev => ({ ...prev, zipCode: e.target.value }))
                                if (formErrors.zipCode) {
                                  setFormErrors(prev => ({ ...prev, zipCode: undefined }))
                                }
                              }}
                              className={cn("input-professional", formErrors.zipCode && "border-red-300 focus:border-red-500")}
                              disabled={isSubmittingProfile}
                              placeholder="12345"
                            />
                            {formErrors.zipCode && (
                              <p className="text-sm text-red-600">{formErrors.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleProfileUpdate} 
                        className="w-full btn-primary" 
                        disabled={isSubmittingProfile}
                      >
                        {isSubmittingProfile ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating Profile...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Employment Information */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle>Employment Information</CardTitle>
                          <CardDescription>Keep your employment details up to date</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus" className={formErrors.employmentStatus ? 'text-red-600' : ''}>Employment Status</Label>
                        <select 
                          id="employmentStatus"
                          value={profileForm.employmentStatus} 
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, employmentStatus: e.target.value as UserProfileFormData['employmentStatus'] }))
                            if (formErrors.employmentStatus) {
                              setFormErrors(prev => ({ ...prev, employmentStatus: undefined }))
                            }
                          }}
                          className={cn("input-professional w-full", formErrors.employmentStatus && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                        >
                          <option value="">Select employment status</option>
                          <option value="employed">Full-time Employed</option>
                          <option value="self-employed">Self-employed</option>
                          <option value="contract">Contract Worker</option>
                          <option value="retired">Retired</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="student">Student</option>
                        </select>
                        {formErrors.employmentStatus && (
                          <p className="text-sm text-red-600">{formErrors.employmentStatus}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employer" className={formErrors.employer ? 'text-red-600' : ''}>Current Employer</Label>
                        <Input
                          id="employer"
                          value={profileForm.employer}
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, employer: e.target.value }))
                            if (formErrors.employer) {
                              setFormErrors(prev => ({ ...prev, employer: undefined }))
                            }
                          }}
                          className={cn("input-professional", formErrors.employer && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                          placeholder="Your Employer"
                        />
                        {formErrors.employer && (
                          <p className="text-sm text-red-600">{formErrors.employer}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualIncome" className={formErrors.annualIncome ? 'text-red-600' : ''}>Annual Income ($)</Label>
                        <Input
                          id="annualIncome"
                          type="number"
                          value={profileForm.annualIncome}
                          onChange={(e) => {
                            setProfileForm(prev => ({ ...prev, annualIncome: e.target.value }))
                            if (formErrors.annualIncome) {
                              setFormErrors(prev => ({ ...prev, annualIncome: undefined }))
                            }
                          }}
                          className={cn("input-professional", formErrors.annualIncome && "border-red-300 focus:border-red-500")}
                          disabled={isSubmittingProfile}
                          placeholder="85000"
                          min="0"
                        />
                        {formErrors.annualIncome && (
                          <p className="text-sm text-red-600">{formErrors.annualIncome}</p>
                        )}
                      </div>

                      <Button 
                        onClick={handleProfileUpdate} 
                        variant="outline" 
                        className="w-full"
                        disabled={isSubmittingProfile}
                      >
                        {isSubmittingProfile ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update Employment Info'
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Document Center */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <CardTitle>Document Center</CardTitle>
                          <CardDescription>Manage all your uploaded documents</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-2 border-dashed border-navy-200 rounded-xl p-8 text-center hover:border-blue-300 transition-all duration-300">
                        <input
                          type="file"
                          id="general-upload"
                          className="hidden"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            if (files.length > 0) {
                              files.forEach(file => handleDocumentUpload(file))
                            }
                            e.target.value = '' // Reset input
                          }}
                        />
                        <Camera className="w-12 h-12 text-navy-400 mx-auto mb-4" />
                        <h3 className="font-medium text-navy-900 mb-2">Upload Documents</h3>
                        <p className="text-sm text-navy-600 mb-4">
                          Drag and drop files here, or click to browse
                        </p>
                        <Button 
                          variant="outline" 
                          className="btn-outline"
                          onClick={() => document.getElementById('general-upload')?.click()}
                          disabled={isUploadingDocument}
                        >
                          {isUploadingDocument ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          {isUploadingDocument ? 'Uploading...' : 'Choose Files'}
                        </Button>
                      </div>

                      {uploadError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                          {uploadError}
                        </div>
                      )}

                      {uploadSuccess && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm">
                          {uploadSuccess}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">All Uploaded Documents</Label>
                          {isLoadingDocuments && (
                            <Loader2 className="w-4 h-4 animate-spin text-navy-400" />
                          )}
                        </div>
                        
                        {userDocuments.length > 0 ? (
                          <div className="space-y-2">
                            {userDocuments.map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <div className="flex items-center gap-3">
                                  <FileIcon className="w-5 h-5 text-emerald-600" />
                                  <div>
                                    <p className="font-medium text-emerald-900">
                                      {doc.filename || `Document ${doc.id.slice(-6)}`}
                                    </p>
                                    <p className="text-xs text-emerald-600">
                                      Uploaded {formatDate(doc.createdAt || new Date().toISOString())}
                                      {doc.filesize && ` • ${formatFileSize(doc.filesize)}`}
                                    </p>
                                    {doc.description && (
                                      <p className="text-xs text-emerald-700 mt-1">{doc.description}</p>
                                    )}
                                    {doc.tags && doc.tags.length > 0 && (
                                      <div className="flex gap-1 mt-1">
                                        {doc.tags.map((tag, index) => (
                                          <span key={index} className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">
                                            {tag.tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {doc.url && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-emerald-300"
                                      onClick={() => doc.url && window.open(doc.url, '_blank')}
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-600"
                                    onClick={() => handleDocumentDelete(doc.id)}
                                    disabled={isDeletingDocument === doc.id}
                                  >
                                    {isDeletingDocument === doc.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No documents uploaded yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Preferences */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-100 rounded-2xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-navy-600" />
                        </div>
                        <div>
                          <CardTitle>Account Preferences</CardTitle>
                          <CardDescription>Manage notifications and security settings</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">Email Notifications</p>
                            <p className="text-sm text-navy-600">Receive updates about your application</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded focus-ring" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">SMS Notifications</p>
                            <p className="text-sm text-navy-600">Get text message alerts for important updates</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded focus-ring" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">Marketing Communications</p>
                            <p className="text-sm text-navy-600">Receive tips and offers from BFFLender</p>
                          </div>
                          <input type="checkbox" className="rounded focus-ring" />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-navy-100">
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                          <div>
                            <p className="font-medium text-red-900">Change Password</p>
                            <p className="text-sm text-red-700">Update your account security</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                            Change
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}