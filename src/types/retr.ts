/**
 * TypeScript types for Retr webhook data
 * Based on Retr's Loan Officer Data Specification
 */

export interface RetrLoanOfficer {
  // Personal Information
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  phone?: string
  nmlsId?: string

  // Social Media
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string

  // Company Information
  companyName?: string
  companyNmlsId?: string
  branchName?: string
  officeAddress?: string
  officeCity?: string
  officeState?: string
  officeZip?: string

  // 12-Month Production Metrics
  totalLoanCount?: number
  totalLoanVolume?: number

  // Loan Type Breakdown (12-month)
  conventionalLoans?: number
  vaLoans?: number
  fhaLoans?: number
  otherLoans?: number

  // 3-Month Production Metrics
  threeMonthLoanCount?: number
  threeMonthLoanVolume?: number

  // Specialized Loan Metrics
  lmiLoans?: number
  lmiVolume?: number
  mmctLoans?: number
  mmctVolume?: number

  // Additional Fields
  lastLoanDate?: string
  mostRecentPurchaseLoan?: Record<string, unknown>
  tags?: string[]

  // Export Metadata
  exportedAt?: string
  exportId?: string
}

export interface RetrWebhookPayload {
  // Webhook metadata
  eventType?: string
  timestamp?: string
  webhookId?: string

  // Loan officer data
  loanOfficer?: RetrLoanOfficer

  // Or it might be an array
  loanOfficers?: RetrLoanOfficer[]

  // Allow for additional fields we might not know about
  [key: string]: unknown
}

export interface RetrWebhookResponse {
  success: boolean
  message: string
  receivedAt: string
  webhookId?: string
}
