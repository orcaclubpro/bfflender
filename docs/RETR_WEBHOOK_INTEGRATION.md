# Retr Webhook Integration

## Overview

This document describes the Retr webhook integration built for BFFLender to receive loan officer production data from the Retr platform (https://www.retr.app).

**Status:** Initial implementation complete - webhook receives and logs data. Data processing logic to be added later.

**Created:** October 26, 2025

---

## What is Retr?

Retr is a mortgage and real estate data intelligence platform that provides:
- Loan officer research and contact data
- Production metrics (volume, units, loan types)
- Agent relationships and transaction insights
- Real estate market intelligence

---

## Current Implementation

### Files Created

1. **`src/types/retr.ts`**
   - TypeScript interfaces for Retr webhook payloads
   - Defines loan officer data structure
   - Type-safe handling of incoming data

2. **`src/app/api/webhooks/retr/route.ts`**
   - POST endpoint: `/api/webhooks/retr`
   - GET endpoint for health checks
   - Logs all incoming requests to file
   - Returns 200 OK responses

3. **`retr-webhook-logs.txt`** (root directory)
   - Auto-created log file
   - Appends each webhook request
   - Includes headers, payload, and timestamp

### What It Does Now

✅ Receives webhook POST requests from Retr
✅ Parses JSON payload containing loan officer data
✅ Logs all data to `retr-webhook-logs.txt`
✅ Logs to console for debugging
✅ Returns 200 OK to prevent credit deduction
✅ Handles both single loan officer and array formats
✅ Graceful error handling

### What It Doesn't Do Yet

❌ Store data in database
❌ Link loan officers to Users collection
❌ Create production snapshots
❌ Process monthly volume/units aggregations
❌ Send notifications
❌ Validate data integrity
❌ Authenticate webhook requests (HMAC signatures)

---

## Data Received from Retr

### Loan Officer Data Structure

```json
{
  "eventType": "loan_officer_data",
  "timestamp": "2025-10-26T23:58:00Z",
  "webhookId": "webhook-123",
  "loanOfficer": {
    // Personal Information
    "firstName": "John",
    "lastName": "Smith",
    "fullName": "John Smith",
    "email": "john.smith@example.com",
    "phone": "(555) 123-4567",
    "nmlsId": "123456",

    // Social Media
    "linkedinUrl": "https://linkedin.com/in/johnsmith",
    "facebookUrl": "...",
    "instagramUrl": "...",
    "twitterUrl": "...",

    // Company Information
    "companyName": "BFFLender Mortgage",
    "companyNmlsId": "654321",
    "branchName": "Downtown Branch",
    "officeAddress": "123 Main St",
    "officeCity": "Los Angeles",
    "officeState": "CA",
    "officeZip": "90001",

    // 12-Month Production Metrics
    "totalLoanCount": 33,
    "totalLoanVolume": 25975406,
    "conventionalLoans": 22,
    "vaLoans": 2,
    "fhaLoans": 8,
    "otherLoans": 1,

    // 3-Month Production Metrics
    "threeMonthLoanCount": 8,
    "threeMonthLoanVolume": 6500000,

    // Specialized Metrics
    "lmiLoans": 1,          // Low/Moderate Income
    "lmiVolume": 345000,
    "mmctLoans": 2,         // Majority Minority Census Tract
    "mmctVolume": 567890,

    // Additional Fields
    "lastLoanDate": "2025-10-15",
    "tags": ["top-performer", "va-specialist"]
  }
}
```

### Alternative Format (Multiple Loan Officers)

```json
{
  "eventType": "bulk_loan_officer_data",
  "timestamp": "2025-10-26T23:59:00Z",
  "webhookId": "webhook-456",
  "loanOfficers": [
    { /* loan officer 1 */ },
    { /* loan officer 2 */ }
  ]
}
```

---

## How Retr Sends Data

### Trigger Points

Webhooks are sent when users in Retr:

1. **Manual Export:**
   - Navigate to "Saved List - Loan Officers"
   - Select loan officers (checkboxes or "Export All")
   - Click **"Push to CRM"** button

2. **Individual Export:**
   - View loan officer profile
   - Click "Push to CRM" on sidebar

### Important Behaviors

- **Retries:** Retr retries failed webhooks a few times
- **Credit System:**
  - If webhook returns error (4xx/5xx): Credits NOT deducted
  - If webhook fails silently: Credits ARE deducted
  - This is why we return 200 OK immediately
- **Requirements:**
  - LO Recruit Add-on subscription required
  - Export credits required per loan officer

---

## Production Setup

### 1. Deployment

The webhook endpoint will be available at:
```
https://bfflender.com/api/webhooks/retr
```

**Deploy checklist:**
```bash
# Commit and push changes
git add .
git commit -m "Add Retr webhook integration"
git push

# Verify endpoint is live
curl https://bfflender.com/api/webhooks/retr
# Expected: {"status":"active","endpoint":"/api/webhooks/retr"...}
```

### 2. Configure in Retr Platform

**Option A: Self-Service Setup**

1. Log into Retr at https://www.retr.app
2. Click your name (upper right corner)
3. Select "Integrations" from dropdown
4. Select "Other" from CRM dropdown
5. Enter webhook URL: `https://bfflender.com/api/webhooks/retr`
6. Follow prompts to verify/test

**Option B: Partner Integration (Recommended)**

Contact Retr directly:
- **Email:** api@retr.app
- **Subject:** "Webhook Integration for BFFLender"
- **Include:**
  - Your webhook URL
  - Request for integration partnership
  - Ask about authentication/security options

### 3. Testing

**Before using production credits:**

1. **Test endpoint health:**
   ```bash
   curl https://bfflender.com/api/webhooks/retr
   ```

2. **Send test data:**
   ```bash
   curl -X POST https://bfflender.com/api/webhooks/retr \
     -H "Content-Type: application/json" \
     -d '{
       "eventType": "test",
       "loanOfficer": {
         "fullName": "Test Officer",
         "nmlsId": "999999",
         "totalLoanCount": 10,
         "totalLoanVolume": 5000000
       }
     }'
   ```

3. **Verify logging:**
   - Check `retr-webhook-logs.txt` in root directory
   - Confirm data structure matches expectations

4. **Small production test:**
   - Export 1-2 loan officers from Retr
   - Monitor logs
   - Verify successful receipt

### 4. Monitoring

**Log file location:**
```
/retr-webhook-logs.txt
```

**Monitor for:**
- Incoming webhook requests
- Data structure variations
- Error messages
- Unexpected fields

**Server logs:**
```bash
# Look for these console messages:
# "=== RETR WEBHOOK RECEIVED ==="
# "Webhook data logged to: ..."
# "Received X loan officer record(s)"
```

---

## Future Development Tasks

### Phase 1: Database Storage

**Create Payload Collections:**

1. **LoanOfficers Collection** (`src/collections/LoanOfficers.ts`)
   - Store loan officer profiles
   - Link to Users collection via NMLS ID
   - Track current production metrics
   - Relationship to ProductionSnapshots

2. **ProductionSnapshots Collection** (`src/collections/ProductionSnapshots.ts`)
   - Monthly aggregated data
   - Track volume/units over time
   - Link to LoanOfficers collection
   - Enable trend analysis

**Update Existing Collections:**

3. **Users Collection** (`src/collections/Users.ts`)
   - Add `nmlsId` field
   - Add "loan-officer" role option
   - Relationship to LoanOfficers collection

**Implementation checklist:**
```typescript
// TODO: In route.ts after logging
const loanOfficers = payload.loanOfficers || [payload.loanOfficer]

for (const lo of loanOfficers) {
  // 1. Upsert LoanOfficer record (find by NMLS ID)
  // 2. Create/update ProductionSnapshot for current month
  // 3. Link to User if NMLS ID matches
  // 4. Log success/failure
}
```

### Phase 2: Data Processing Logic

**Add to webhook handler:**
- Validation (Zod schemas)
- Deduplication (idempotency)
- Data normalization
- Error tracking
- Success notifications

**Validation example:**
```typescript
import { z } from 'zod'

const LoanOfficerSchema = z.object({
  nmlsId: z.string().min(1),
  totalLoanVolume: z.number().nonnegative(),
  totalLoanCount: z.number().int().nonnegative(),
  // ... more fields
})

// In webhook handler
const validated = LoanOfficerSchema.safeParse(payload.loanOfficer)
if (!validated.success) {
  // Log validation errors
}
```

### Phase 3: Security Enhancements

**Add authentication:**
- HMAC signature verification (if Retr provides secrets)
- Request timestamp validation (prevent replay attacks)
- IP whitelisting (if Retr provides static IPs)

**Environment variables:**
```env
RETR_WEBHOOK_SECRET=your-secret-key
RETR_WEBHOOK_IP_WHITELIST=ip1,ip2,ip3
```

**Signature validation:**
```typescript
import crypto from 'crypto'

function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.RETR_WEBHOOK_SECRET
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hash)
  )
}
```

### Phase 4: Dashboard Integration

**Create UI components:**
- Production metrics display
- Charts showing volume/units over time
- Loan type breakdowns
- Performance comparisons
- Export capabilities

**Suggested location:**
```
src/app/(dashboard)/components/
  ├── ProductionMetrics.tsx
  ├── ProductionChart.tsx
  ├── LoanTypeBreakdown.tsx
  └── PerformanceComparison.tsx
```

**User permissions:**
- Loan officers see their own data
- Admins see all loan officers
- Client role has no access

### Phase 5: Advanced Features

**Potential enhancements:**
- Automated monthly reporting
- Performance alerts/notifications
- Integration with user dashboards
- Bulk data import via CSV
- Historical data backfill
- Export to Excel/PDF
- Email digests of production metrics
- Comparative analytics

---

## Technical Reference

### Endpoint Details

**URL:** `POST /api/webhooks/retr`

**Headers:**
```
Content-Type: application/json
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Webhook received successfully",
  "receivedAt": "2025-10-26T23:56:11.779Z",
  "webhookId": "webhook-123"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to process webhook",
  "receivedAt": "2025-10-26T23:56:11.779Z",
  "error": "Error message here"
}
```

### Health Check Endpoint

**URL:** `GET /api/webhooks/retr`

**Response:**
```json
{
  "status": "active",
  "endpoint": "/api/webhooks/retr",
  "method": "POST",
  "description": "Retr webhook endpoint for loan officer production data",
  "timestamp": "2025-10-26T23:56:11.779Z"
}
```

### Code Locations

| Component | File Path |
|-----------|-----------|
| Webhook Handler | `src/app/api/webhooks/retr/route.ts` |
| Type Definitions | `src/types/retr.ts` |
| Log File | `retr-webhook-logs.txt` |
| Documentation | `docs/RETR_WEBHOOK_INTEGRATION.md` |

### Dependencies

```json
{
  "dependencies": {
    "next": "^15.3.2",
    "@types/node": "^20.x" // for fs/promises, path
  }
}
```

No additional packages required for basic webhook functionality.

---

## Resources

### Retr Documentation

- **Webhook Overview:** https://kb.retr.app/does-retr-have-any-webhooks-or-zapier-connections
- **Data Specification:** https://kb.retr.app/data-specification-loan-officer
- **Integration Setup:** https://kb.retr.app/how-do-i-set-up-an-integration
- **Export Guide:** https://kb.retr.app/how-do-i-export-a-list

### Contact

- **Retr API Support:** api@retr.app
- **Retr General Support:** support@retr.app
- **Retr Website:** https://www.retr.app

### Related Documentation

- `/docs/CLAUDE.md` - Project coding standards
- `src/payload.config.ts` - CMS configuration
- `src/collections/Users.ts` - User collection schema

---

## Troubleshooting

### Common Issues

**1. Webhook not receiving data**
- Verify endpoint is accessible: `curl https://bfflender.com/api/webhooks/retr`
- Check Retr integration settings
- Look for error messages in server logs
- Verify URL is exactly correct (no typos)

**2. Log file not updating**
- Check file permissions on `retr-webhook-logs.txt`
- Verify server has write access to root directory
- Check console for "Failed to write to log file" errors

**3. Data structure doesn't match**
- Retr may update their data format
- Check `retr-webhook-logs.txt` for actual structure
- Update TypeScript types in `src/types/retr.ts` if needed

**4. Credits being deducted despite failures**
- Ensure webhook returns 200 status code
- Check for runtime errors in handler
- Add try/catch blocks around critical code

### Debug Mode

To enable verbose logging, add this to the webhook handler:

```typescript
// At top of POST function
console.log('DEBUG MODE - Full request details')
console.log('URL:', request.url)
console.log('Method:', request.method)
console.log('Headers:', Object.fromEntries(request.headers.entries()))
```

---

## Changelog

### v1.0.0 - October 26, 2025
- Initial webhook implementation
- Basic logging to text file
- Type definitions for Retr data
- Health check endpoint
- Documentation created

### Planned for v2.0.0
- Database storage (Payload collections)
- Data processing logic
- Authentication/security
- Dashboard integration

---

## Notes for Developers

### Before Making Changes

1. **Read CLAUDE.md** for coding standards
2. **Test locally** before deploying
3. **Backup log file** before modifying logging logic
4. **Update types** if Retr changes data structure

### Testing Workflow

```bash
# 1. Start dev server
bun run dev

# 2. Send test webhook
curl -X POST http://localhost:3000/api/webhooks/retr \
  -H "Content-Type: application/json" \
  -d @test-data.json

# 3. Check logs
tail -f retr-webhook-logs.txt

# 4. Verify console output
# Look for "=== RETR WEBHOOK RECEIVED ==="
```

### Adding New Features

When implementing database storage or processing:

1. Create feature branch: `git checkout -b feature/retr-data-processing`
2. Update this documentation with changes
3. Add tests for new functionality
4. Update CHANGELOG section
5. Deploy to staging first
6. Test with small data set
7. Deploy to production

---

## License & Security

**Important:**
- This integration is for BFFLender internal use only
- Do not share webhook URL publicly
- Treat all loan officer data as confidential
- Follow NMLS compliance guidelines
- Implement proper data retention policies

**Data Privacy:**
- Loan officer data contains PII (emails, phones, addresses)
- Comply with GDPR/CCPA as applicable
- Implement proper data encryption
- Secure access to log files

---

**Document Version:** 1.0
**Last Updated:** October 26, 2025
**Maintained By:** BFFLender Development Team
