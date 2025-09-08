'use client'

import React, { useState } from 'react'
import type { User as PayloadUser } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
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
  Trash2
} from 'lucide-react'

interface ClientDashboardProps {
  user: PayloadUser
  currentUser: PayloadUser
}

type ActivePage = 'results' | 'settings'

interface LoanApplication {
  id: string
  loanAmount: number
  loanType: string
  status: 'pending' | 'approved' | 'rejected' | 'under-review' | 'documents-required' | 'appraisal-scheduled' | 'closing-scheduled'
  submittedDate: string
  creditScore: number
  propertyAddress: string
  interestRate?: number
  monthlyPayment?: number
  closingDate?: string
  nextStep?: string
  requiredDocuments?: string[]
  completedSteps: number
  totalSteps: number
}

interface TimelineItem {
  date: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
}

const mockApplication: LoanApplication = {
  id: 'APP-2024-001',
  loanAmount: 450000,
  loanType: 'Conventional 30-Year Fixed',
  status: 'under-review',
  submittedDate: '2024-08-15',
  creditScore: 750,
  propertyAddress: '123 Main Street, Anytown, CA 90210',
  interestRate: 6.75,
  monthlyPayment: 2921,
  closingDate: '2024-10-15',
  nextStep: 'Appraisal Scheduling',
  requiredDocuments: ['2023 Tax Returns', 'Bank Statements (Last 2 months)', 'Employment Verification'],
  completedSteps: 3,
  totalSteps: 6
}

const mockTimeline: TimelineItem[] = [
  {
    date: '2024-08-15',
    title: 'Application Submitted',
    description: 'Your mortgage application has been successfully submitted and is being reviewed.',
    status: 'completed'
  },
  {
    date: '2024-08-18',
    title: 'Initial Review Complete',
    description: 'Our team has completed the initial review of your application and credit report.',
    status: 'completed'
  },
  {
    date: '2024-08-22',
    title: 'Documentation Review',
    description: 'We are currently reviewing your submitted financial documents.',
    status: 'completed'
  },
  {
    date: '2024-08-25',
    title: 'Underwriting Process',
    description: 'Your application is currently being underwritten by our lending team.',
    status: 'current'
  },
  {
    date: 'TBD',
    title: 'Appraisal Scheduled',
    description: 'Property appraisal will be scheduled once underwriting is complete.',
    status: 'upcoming'
  },
  {
    date: 'TBD',
    title: 'Final Approval & Closing',
    description: 'Final loan approval and closing preparation.',
    status: 'upcoming'
  }
]

const formatCurrency = (amount: number) => {
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
    pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending Review' },
    approved: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Not Approved' },
    'under-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Under Review' },
    'documents-required': { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Documents Required' },
    'appraisal-scheduled': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Appraisal Scheduled' },
    'closing-scheduled': { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Closing Scheduled' }
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  
  return (
    <Badge className={cn('text-xs font-medium border', config.color)}>
      {config.label}
    </Badge>
  )
}

const getProgressColor = (status: string) => {
  const colors = {
    'under-review': 'from-blue-500 to-blue-600',
    'documents-required': 'from-amber-500 to-amber-600',
    'appraisal-scheduled': 'from-blue-500 to-blue-600',
    'approved': 'from-emerald-500 to-emerald-600',
    'closing-scheduled': 'from-emerald-500 to-emerald-600',
    'rejected': 'from-red-500 to-red-600',
    'pending': 'from-gray-500 to-gray-600'
  }
  
  return colors[status as keyof typeof colors] || colors.pending
}

export function ClientDashboard({ user: _user, currentUser }: ClientDashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('results')
  const [profileForm, setProfileForm] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email,
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    employmentStatus: 'employed',
    employer: 'Tech Corp',
    annualIncome: '85000'
  })

  const handleLogout = async () => {
    const { logoutAction } = await import('@/app/u/[username]/actions/logoutAction')
    await logoutAction()
  }

  const handleProfileUpdate = () => {
    console.log('Updating profile...', profileForm)
  }

  const progressPercentage = (mockApplication.completedSteps / mockApplication.totalSteps) * 100

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
                    {activePage === 'results' ? 'My Mortgage Application' : 'Account Settings'}
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
                {/* Application Status Card */}
                <Card className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Application #{mockApplication.id}</CardTitle>
                          <CardDescription className="mt-2">
                            {mockApplication.loanType} • {formatCurrency(mockApplication.loanAmount)}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(mockApplication.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Property Address</Label>
                        <p className="text-navy-900 font-medium">{mockApplication.propertyAddress}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Interest Rate</Label>
                        <p className="text-navy-900 font-medium">{mockApplication.interestRate}% APR</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Monthly Payment</Label>
                        <p className="text-navy-900 font-medium">{formatCurrency(mockApplication.monthlyPayment || 0)}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-navy-600 uppercase tracking-wide">Est. Closing Date</Label>
                        <p className="text-navy-900 font-medium">{mockApplication.closingDate ? formatDate(mockApplication.closingDate) : 'TBD'}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-navy-700">Application Progress</Label>
                        <span className="text-sm font-medium text-navy-600">
                          {mockApplication.completedSteps} of {mockApplication.totalSteps} steps complete
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={cn("progress-fill bg-gradient-to-r", getProgressColor(mockApplication.status))}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Next Steps */}
                    {mockApplication.nextStep && (
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Next Step: {mockApplication.nextStep}</p>
                          <p className="text-sm text-blue-700 mt-1">We'll contact you when it's time to proceed.</p>
                        </div>
                      </div>
                    )}

                    {/* Required Documents */}
                    {mockApplication.requiredDocuments && mockApplication.requiredDocuments.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <Label className="font-medium text-amber-900">Documents Still Needed</Label>
                        </div>
                        <div className="space-y-2">
                          {mockApplication.requiredDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                              <span className="text-amber-900 font-medium">{doc}</span>
                              <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Application Timeline */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Application Timeline</CardTitle>
                    <CardDescription>Track the progress of your mortgage application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {mockTimeline.map((item, index) => (
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
                            {index < mockTimeline.length - 1 && (
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
                      <Button className="w-full btn-secondary">
                        Upload Files
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
                      <Button variant="outline" className="w-full">
                        Book Appointment
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto">
                        <Download className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">Download Forms</h3>
                        <p className="text-sm text-navy-600 mt-1">Get important documents</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Download
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileForm.firstName}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className="input-professional"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileForm.lastName}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className="input-professional"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                          className="input-professional"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                            className="input-professional"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select 
                              value={profileForm.state} 
                              onValueChange={(value) => setProfileForm(prev => ({ ...prev, state: value }))}
                            >
                              <option value="CA">CA</option>
                              <option value="NY">NY</option>
                              <option value="TX">TX</option>
                              <option value="FL">FL</option>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              value={profileForm.zipCode}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, zipCode: e.target.value }))}
                              className="input-professional"
                            />
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleProfileUpdate} className="w-full btn-primary">
                        Update Profile
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
                        <Label htmlFor="employmentStatus">Employment Status</Label>
                        <Select 
                          value={profileForm.employmentStatus} 
                          onValueChange={(value) => setProfileForm(prev => ({ ...prev, employmentStatus: value }))}
                        >
                          <option value="employed">Full-time Employed</option>
                          <option value="self-employed">Self-employed</option>
                          <option value="contract">Contract Worker</option>
                          <option value="retired">Retired</option>
                          <option value="unemployed">Unemployed</option>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employer">Current Employer</Label>
                        <Input
                          id="employer"
                          value={profileForm.employer}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, employer: e.target.value }))}
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualIncome">Annual Income</Label>
                        <Input
                          id="annualIncome"
                          type="number"
                          value={profileForm.annualIncome}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, annualIncome: e.target.value }))}
                          className="input-professional"
                        />
                      </div>

                      <Button variant="outline" className="w-full">
                        Update Employment Info
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
                          <CardDescription>Manage your application documents</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-2 border-dashed border-navy-200 rounded-xl p-8 text-center hover:border-blue-300 transition-all duration-300">
                        <Camera className="w-12 h-12 text-navy-400 mx-auto mb-4" />
                        <h3 className="font-medium text-navy-900 mb-2">Upload Documents</h3>
                        <p className="text-sm text-navy-600 mb-4">
                          Drag and drop files here, or click to browse
                        </p>
                        <Button variant="outline" className="btn-outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <Label className="font-medium">Uploaded Documents</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <div>
                                <p className="font-medium text-emerald-900">Pay Stubs - August 2024</p>
                                <p className="text-xs text-emerald-600">Uploaded Aug 15, 2024</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-emerald-300">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <div>
                                <p className="font-medium text-emerald-900">Bank Statements - July 2024</p>
                                <p className="text-xs text-emerald-600">Uploaded Aug 15, 2024</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-emerald-300">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
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