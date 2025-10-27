import { NextRequest, NextResponse } from 'next/server'
import { appendFile } from 'fs/promises'
import { join } from 'path'
import type { RetrWebhookPayload, RetrWebhookResponse } from '@/types/retr'

/**
 * Logs webhook data to a text file in the codebase
 */
async function logWebhookToFile(
  payload: RetrWebhookPayload,
  headers: Record<string, string>
) {
  try {
    const logFilePath = join(process.cwd(), 'retr-webhook-logs.txt')
    const timestamp = new Date().toISOString()

    const logEntry = `
${'='.repeat(80)}
RETR WEBHOOK RECEIVED
Timestamp: ${timestamp}
${'='.repeat(80)}

Headers:
${JSON.stringify(headers, null, 2)}

Payload:
${JSON.stringify(payload, null, 2)}

${'-'.repeat(80)}

`

    await appendFile(logFilePath, logEntry, 'utf-8')
    console.log(`Webhook data logged to: ${logFilePath}`)
  } catch (error) {
    console.error('Failed to write to log file:', error)
    // Don't throw - we don't want logging failures to break the webhook
  }
}

/**
 * Retr Webhook Endpoint
 *
 * Receives loan officer production data from Retr platform
 * Endpoint: POST /api/webhooks/retr
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON payload
    const payload: RetrWebhookPayload = await request.json()

    // Get headers for logging
    const headers = Object.fromEntries(request.headers.entries())

    // Log to file
    await logWebhookToFile(payload, headers)

    // Log the received data for debugging
    console.log('=== RETR WEBHOOK RECEIVED ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Headers:', headers)
    console.log('Payload:', JSON.stringify(payload, null, 2))
    console.log('============================')

    // Extract loan officer data (handle both single and array formats)
    const loanOfficers = payload.loanOfficers || (payload.loanOfficer ? [payload.loanOfficer] : [])

    if (loanOfficers.length > 0) {
      console.log(`Received ${loanOfficers.length} loan officer record(s)`)

      // Log key metrics for each loan officer
      loanOfficers.forEach((lo, index) => {
        console.log(`\nLoan Officer #${index + 1}:`)
        console.log(`  Name: ${lo.fullName || `${lo.firstName} ${lo.lastName}`}`)
        console.log(`  NMLS: ${lo.nmlsId || 'N/A'}`)
        console.log(`  Email: ${lo.email || 'N/A'}`)
        console.log(`  12-Month Volume: $${lo.totalLoanVolume?.toLocaleString() || '0'}`)
        console.log(`  12-Month Units: ${lo.totalLoanCount || 0}`)
        console.log(`  3-Month Volume: $${lo.threeMonthLoanVolume?.toLocaleString() || '0'}`)
        console.log(`  3-Month Units: ${lo.threeMonthLoanCount || 0}`)
        console.log(`  Company: ${lo.companyName || 'N/A'}`)
      })
    } else {
      console.log('No loan officer data found in payload')
    }

    // TODO: Add data processing logic here
    // - Store in database
    // - Update user records
    // - Create production snapshots
    // - Send notifications
    // etc.

    // Return success response
    const response: RetrWebhookResponse = {
      success: true,
      message: 'Webhook received successfully',
      receivedAt: new Date().toISOString(),
      webhookId: payload.webhookId || crypto.randomUUID(),
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('=== RETR WEBHOOK ERROR ===')
    console.error('Error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    console.error('=========================')

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process webhook',
        receivedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for testing/health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/retr',
    method: 'POST',
    description: 'Retr webhook endpoint for loan officer production data',
    timestamp: new Date().toISOString(),
  })
}
