'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import BFFLogo from '@/components/layout/BFFLogo'
import UserManagement from './UserManagement'
import type { User } from '@/payload-types'
import {
  BarChart3,
  Settings,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  LogOut,
  Search,
  Filter,
  Download,
  Bell,
  Calendar,
  Globe,
  Lock,
  Database,
  Shield
} from 'lucide-react'

interface AdminDashboardProps {
  user: User
  currentUser: User
}

type ActivePage = 'overview' | 'queries' | 'user-management' | 'settings'

interface MortgageApplication {
  id: string
  applicantName: string
  loanAmount: number
  loanType: string
  status: 'pending' | 'approved' | 'rejected' | 'under-review'
  submittedDate: string
  creditScore: number
  income: number
  propertyValue: number
}

const mockApplications: MortgageApplication[] = [
  {
    id: 'APP-001',
    applicantName: 'John Smith',
    loanAmount: 450000,
    loanType: 'Conventional 30-Year',
    status: 'under-review',
    submittedDate: '2024-08-20',
    creditScore: 750,
    income: 85000,
    propertyValue: 500000
  },
  {
    id: 'APP-002',
    applicantName: 'Sarah Johnson',
    loanAmount: 325000,
    loanType: 'FHA 15-Year',
    status: 'approved',
    submittedDate: '2024-08-18',
    creditScore: 720,
    income: 72000,
    propertyValue: 375000
  },
  {
    id: 'APP-003',
    applicantName: 'Michael Davis',
    loanAmount: 600000,
    loanType: 'Jumbo 30-Year',
    status: 'pending',
    submittedDate: '2024-08-22',
    creditScore: 780,
    income: 120000,
    propertyValue: 675000
  },
  {
    id: 'APP-004',
    applicantName: 'Emily Wilson',
    loanAmount: 280000,
    loanType: 'VA 30-Year',
    status: 'rejected',
    submittedDate: '2024-08-15',
    creditScore: 650,
    income: 55000,
    propertyValue: 320000
  },
  {
    id: 'APP-005',
    applicantName: 'Robert Brown',
    loanAmount: 520000,
    loanType: 'Conventional 15-Year',
    status: 'approved',
    submittedDate: '2024-08-25',
    creditScore: 740,
    income: 95000,
    propertyValue: 580000
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
    pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
    approved: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' },
    'under-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Under Review' }
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  
  return (
    <Badge className={cn('text-xs font-medium border', config.color)}>
      {config.label}
    </Badge>
  )
}

export function AdminDashboard({ user: _user, currentUser }: AdminDashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleLogout = async () => {
    const { logoutAction } = await import('@/app/u/[username]/actions/logoutAction')
    await logoutAction()
  }

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
              <h2 className="text-lg font-bold text-navy-900">Admin Panel</h2>
              <p className="text-sm text-navy-600 mt-1">{currentUser.firstName} {currentUser.lastName}</p>
            </div>
          </div>
          
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <button
                  onClick={() => setActivePage('overview')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-blue-50',
                    activePage === 'overview' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-navy-700 hover:text-blue-700'
                  )}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('queries')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-blue-50',
                    activePage === 'queries' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-navy-700 hover:text-blue-700'
                  )}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Queries</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('user-management')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-blue-50',
                    activePage === 'user-management' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-navy-700 hover:text-blue-700'
                  )}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">User Management</span>
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
                  <span className="font-medium">Settings</span>
                </button>
              </li>
              <li className="mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-red-50 text-navy-700 hover:text-red-700 focus-ring"
                  aria-label="Log out of admin dashboard"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">Logout</span>
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
                  <h1 className="text-2xl font-bold text-navy-900 capitalize">
                    {activePage === 'overview' ? 'Dashboard Overview' : 
                     activePage === 'user-management' ? 'User Management' : 
                     activePage}
                  </h1>
                  <p className="text-navy-600 text-sm mt-1">
                    {activePage === 'overview' && 'Monitor your mortgage application pipeline'}
                    {activePage === 'queries' && 'View and manage mortgage applications'}
                    {activePage === 'user-management' && 'Manage users, roles, and permissions'}
                    {activePage === 'settings' && 'Configure system settings'}
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
            {activePage === 'overview' && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-navy-600">Total Applications</p>
                          <p className="text-3xl font-bold text-navy-900 mt-2">24</p>
                          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
                            <TrendingUp className="w-4 h-4" />
                            +12% from last month
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-navy-600">Approved</p>
                          <p className="text-3xl font-bold text-navy-900 mt-2">18</p>
                          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
                            <TrendingUp className="w-4 h-4" />
                            75% approval rate
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-navy-600">Loan Volume</p>
                          <p className="text-3xl font-bold text-navy-900 mt-2">$12.4M</p>
                          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
                            <TrendingUp className="w-4 h-4" />
                            +8% from last month
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-navy-600">Avg. Processing</p>
                          <p className="text-3xl font-bold text-navy-900 mt-2">14</p>
                          <p className="text-sm text-navy-600 mt-1">days</p>
                        </div>
                        <div className="w-12 h-12 bg-navy-100 rounded-2xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-navy-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Applications Preview */}
                <Card className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Latest mortgage applications submitted</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setActivePage('queries')}
                        className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApplications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {app.applicantName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-navy-900">{app.applicantName}</p>
                              <p className="text-sm text-navy-600">{formatCurrency(app.loanAmount)} • {app.loanType}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(app.status)}
                            <p className="text-sm text-navy-500">{formatDate(app.submittedDate)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activePage === 'queries' && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Search and Filters */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-4 h-4" />
                        <Input
                          placeholder="Search by name or application ID..."
                          className="pl-10 input-professional"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Select 
                          value={statusFilter} 
                          onValueChange={setStatusFilter}
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="under-review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </Select>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Filter
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Applications Table */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Mortgage Applications</CardTitle>
                    <CardDescription>
                      Showing {filteredApplications.length} of {mockApplications.length} applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-navy-100">
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Application</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Applicant</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Loan Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Credit Score</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-navy-700">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredApplications.map((app) => (
                            <tr 
                              key={app.id} 
                              className="border-b border-navy-50 hover:bg-blue-50/50 transition-all duration-300"
                            >
                              <td className="py-4 px-4">
                                <span className="font-mono text-sm font-medium text-navy-900">{app.id}</span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                                    {app.applicantName.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <p className="font-medium text-navy-900">{app.applicantName}</p>
                                    <p className="text-xs text-navy-500">Income: {formatCurrency(app.income)}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-semibold text-navy-900">{formatCurrency(app.loanAmount)}</p>
                                <p className="text-xs text-navy-500">Property: {formatCurrency(app.propertyValue)}</p>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-navy-700">{app.loanType}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={cn(
                                  "text-sm font-medium",
                                  app.creditScore >= 750 ? "text-emerald-600" :
                                  app.creditScore >= 700 ? "text-amber-600" : "text-red-600"
                                )}>
                                  {app.creditScore}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                {getStatusBadge(app.status)}
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-navy-600">{formatDate(app.submittedDate)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activePage === 'settings' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Configuration */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-100 rounded-2xl flex items-center justify-center">
                          <Settings className="w-5 h-5 text-navy-600" />
                        </div>
                        <div>
                          <CardTitle>System Configuration</CardTitle>
                          <CardDescription>General system settings and preferences</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          defaultValue="BFFLender"
                          className="input-professional"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          defaultValue="support@bfflender.com"
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxLoanAmount">Maximum Loan Amount</Label>
                        <Input
                          id="maxLoanAmount"
                          type="number"
                          defaultValue="2000000"
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="processingTime">Average Processing Time (days)</Label>
                        <Input
                          id="processingTime"
                          type="number"
                          defaultValue="14"
                          className="input-professional"
                        />
                      </div>

                      <Button className="w-full btn-primary">
                        Save Configuration
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <CardTitle>Security Settings</CardTitle>
                          <CardDescription>Access control and security preferences</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          defaultValue="30"
                          className="input-professional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passwordPolicy">Password Policy</Label>
                        <Select defaultValue="strong">
                          <option value="basic">Basic (8 characters)</option>
                          <option value="strong">Strong (8+ chars, numbers, symbols)</option>
                          <option value="enterprise">Enterprise (12+ chars, complex)</option>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="font-medium text-amber-900">Two-Factor Authentication</p>
                            <p className="text-sm text-amber-700">Add an extra layer of security</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                          Configure
                        </Button>
                      </div>

                      <Button variant="destructive" className="w-full">
                        Save Security Settings
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>Notification Settings</CardTitle>
                          <CardDescription>Configure email and system notifications</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">New Applications</p>
                            <p className="text-sm text-navy-600">Get notified when new applications are submitted</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">Status Updates</p>
                            <p className="text-sm text-navy-600">Receive updates when application statuses change</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-900">Weekly Reports</p>
                            <p className="text-sm text-navy-600">Get weekly summary reports via email</p>
                          </div>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailFrequency">Email Frequency</Label>
                        <Select defaultValue="immediate">
                          <option value="immediate">Immediate</option>
                          <option value="hourly">Hourly Digest</option>
                          <option value="daily">Daily Digest</option>
                          <option value="weekly">Weekly Summary</option>
                        </Select>
                      </div>

                      <Button className="w-full btn-secondary">
                        Update Notifications
                      </Button>
                    </CardContent>
                  </Card>

                  {/* API & Integration Settings */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                          <Database className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle>API & Integrations</CardTitle>
                          <CardDescription>Manage external integrations and API access</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="creditBureau">Credit Bureau API</Label>
                        <Select defaultValue="experian">
                          <option value="experian">Experian</option>
                          <option value="equifax">Equifax</option>
                          <option value="transunion">TransUnion</option>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="••••••••••••••••"
                          className="input-professional font-mono"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-emerald-900">Webhook Status</p>
                            <p className="text-sm text-emerald-700">Connected and receiving data</p>
                          </div>
                        </div>
                        <Badge className="badge-success">
                          Active
                        </Badge>
                      </div>

                      <Button variant="outline" className="w-full">
                        Test Connection
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activePage === 'user-management' && (
              <div className="space-y-6 animate-fade-in-up">
                <UserManagement user={_user} currentUser={currentUser} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}