"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  candidateLegalName: string
  candidatePreferredName: string
  candidateEmail: string
  candidatePhone: string
  candidateAddress: string
  nmls: string
  assignedBranch: string
  assignedBranchManager: string
  workLocation: string
  positionOffered: string
  employmentType: string
  reportsTo: string
  ptoManager: string
  expectedStartDate: string
  baseWageType: string
  baseWage: string
  transitionCompensation: {
    guarantee: boolean
    signOn: boolean
    acceleratedBps: boolean
    productionBonus: boolean
    details: string
  }
  perFileBonus: string
  perFileBonusType: string
  overrides: string
  overridesType: string
  loComp: {
    leadSource1: string
    leadSource2: string
    leadSource3: string
    leadSource4: string
    leadSource5: string
  }
  equipmentPackage: string
  swagBox: string
  encompassAccess: string
  pipelineAccess: string
  assignedProcessor: string
  assignedLOA: string
  projectedVolume: string
  branchPricing: string
  branchForPolly: string
  emailResponse: string
}

export default function CareersForm() {
  const [formData, setFormData] = useState<FormData>({
    candidateLegalName: "",
    candidatePreferredName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateAddress: "",
    nmls: "",
    assignedBranch: "",
    assignedBranchManager: "",
    workLocation: "",
    positionOffered: "",
    employmentType: "",
    reportsTo: "",
    ptoManager: "",
    expectedStartDate: "",
    baseWageType: "",
    baseWage: "",
    transitionCompensation: {
      guarantee: false,
      signOn: false,
      acceleratedBps: false,
      productionBonus: false,
      details: ""
    },
    perFileBonus: "",
    perFileBonusType: "",
    overrides: "",
    overridesType: "",
    loComp: {
      leadSource1: "",
      leadSource2: "",
      leadSource3: "",
      leadSource4: "",
      leadSource5: ""
    },
    equipmentPackage: "",
    swagBox: "",
    encompassAccess: "",
    pipelineAccess: "",
    assignedProcessor: "",
    assignedLOA: "",
    projectedVolume: "",
    branchPricing: "",
    branchForPolly: "",
    emailResponse: ""
  })

  const [mmiFile, setMmiFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLoCompChange = (field: keyof typeof formData.loComp, value: string) => {
    setFormData(prev => ({
      ...prev,
      loComp: {
        ...prev.loComp,
        [field]: value
      }
    }))
  }

  const handleTransitionDetailsChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      transitionCompensation: {
        ...prev.transitionCompensation,
        details: value
      }
    }))
  }

  const handleTransitionCompensationChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      transitionCompensation: {
        ...prev.transitionCompensation,
        [field]: checked
      }
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setMmiFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    console.log("MMI File:", mmiFile)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="candidateLegalName">Candidate Legal Name *</Label>
              <Input
                id="candidateLegalName"
                value={formData.candidateLegalName}
                onChange={(e) => handleInputChange('candidateLegalName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="candidatePreferredName">Candidate Preferred Name</Label>
              <Input
                id="candidatePreferredName"
                value={formData.candidatePreferredName}
                onChange={(e) => handleInputChange('candidatePreferredName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="candidateEmail">Candidate's Email Address *</Label>
              <Input
                id="candidateEmail"
                type="email"
                value={formData.candidateEmail}
                onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="candidatePhone">Candidate's Phone Number *</Label>
              <Input
                id="candidatePhone"
                type="tel"
                value={formData.candidatePhone}
                onChange={(e) => handleInputChange('candidatePhone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidateAddress">Candidate's Full Mailing Address</Label>
            <Textarea
              id="candidateAddress"
              value={formData.candidateAddress}
              onChange={(e) => handleInputChange('candidateAddress', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nmls">Candidates NMLS #</Label>
              <Input
                id="nmls"
                value={formData.nmls}
                onChange={(e) => handleInputChange('nmls', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedBranch">Assigned Branch</Label>
              <Input
                id="assignedBranch"
                value={formData.assignedBranch}
                onChange={(e) => handleInputChange('assignedBranch', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedBranchManager">Assigned Branch Manager</Label>
            <Input
              id="assignedBranchManager"
              value={formData.assignedBranchManager}
              onChange={(e) => handleInputChange('assignedBranchManager', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Position Details */}
      <Card>
        <CardHeader>
          <CardTitle>Position Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Work Location</Label>
            <Select value={formData.workLocation} onValueChange={(value) => handleInputChange('workLocation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select work location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="branch-office">Branch Office</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Position Offered</Label>
            <Select value={formData.positionOffered} onValueChange={(value) => handleInputChange('positionOffered', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LO">LO</SelectItem>
                <SelectItem value="RM">RM</SelectItem>
                <SelectItem value="BM">BM</SelectItem>
                <SelectItem value="LOA">LOA</SelectItem>
                <SelectItem value="Processor">Processor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Employment Type</Label>
            <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commissioned-sales">Commissioned Sales</SelectItem>
                <SelectItem value="full-time-ops">Full Time Ops</SelectItem>
                <SelectItem value="part-time-ops">Part Time Ops</SelectItem>
                <SelectItem value="temp">Temp</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reportsTo">Reports To</Label>
              <Input
                id="reportsTo"
                value={formData.reportsTo}
                onChange={(e) => handleInputChange('reportsTo', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptoManager">Time Clock or PTO Manager's Name</Label>
              <Input
                id="ptoManager"
                value={formData.ptoManager}
                onChange={(e) => handleInputChange('ptoManager', e.target.value)}
                placeholder="If different than Reports To"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedStartDate">Expected Start Date</Label>
            <Input
              id="expectedStartDate"
              type="date"
              value={formData.expectedStartDate}
              onChange={(e) => handleInputChange('expectedStartDate', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Base Wage Type</Label>
            <Select value={formData.baseWageType} onValueChange={(value) => handleInputChange('baseWageType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select base wage type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="draw">Draw</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseWage">Base Wage (Annual Amount)</Label>
            <Input
              id="baseWage"
              value={formData.baseWage}
              onChange={(e) => handleInputChange('baseWage', e.target.value)}
              placeholder="Enter annual amount"
            />
          </div>

          <div className="space-y-4">
            <Label>Transition Compensation</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="guarantee"
                  checked={formData.transitionCompensation.guarantee}
                  onCheckedChange={(checked) => handleTransitionCompensationChange('guarantee', checked as boolean)}
                />
                <Label htmlFor="guarantee">Guarantee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="signOn"
                  checked={formData.transitionCompensation.signOn}
                  onCheckedChange={(checked) => handleTransitionCompensationChange('signOn', checked as boolean)}
                />
                <Label htmlFor="signOn">Sign-On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceleratedBps"
                  checked={formData.transitionCompensation.acceleratedBps}
                  onCheckedChange={(checked) => handleTransitionCompensationChange('acceleratedBps', checked as boolean)}
                />
                <Label htmlFor="acceleratedBps">Accelerated Bps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productionBonus"
                  checked={formData.transitionCompensation.productionBonus}
                  onCheckedChange={(checked) => handleTransitionCompensationChange('productionBonus', checked as boolean)}
                />
                <Label htmlFor="productionBonus">Production Bonus</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transitionDetails">Details</Label>
                <Textarea
                  id="transitionDetails"
                  value={formData.transitionCompensation.details}
                  onChange={(e) => handleTransitionDetailsChange(e.target.value)}
                  placeholder="Enter details for selected compensation options"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="perFileBonus">Per File Bonus</Label>
            <div className="flex space-x-2">
              <Input
                id="perFileBonus"
                value={formData.perFileBonus}
                onChange={(e) => handleInputChange('perFileBonus', e.target.value)}
                placeholder="Enter amount"
                className="flex-1"
              />
              <Select value={formData.perFileBonusType} onValueChange={(value) => handleInputChange('perFileBonusType', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dollars">Dollars</SelectItem>
                  <SelectItem value="bps">Bps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overrides">Overrides</Label>
            <div className="flex space-x-2">
              <Input
                id="overrides"
                value={formData.overrides}
                onChange={(e) => handleInputChange('overrides', e.target.value)}
                placeholder="Enter amount"
                className="flex-1"
              />
              <Select value={formData.overridesType} onValueChange={(value) => handleInputChange('overridesType', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dollars">Dollars</SelectItem>
                  <SelectItem value="bps">Bps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>LO Comp (5 Lead Sources - Bps)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadSource1">Lead Source 1</Label>
                <Input
                  id="leadSource1"
                  value={formData.loComp.leadSource1}
                  onChange={(e) => handleLoCompChange('leadSource1', e.target.value)}
                  placeholder="Bps"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource2">Lead Source 2</Label>
                <Input
                  id="leadSource2"
                  value={formData.loComp.leadSource2}
                  onChange={(e) => handleLoCompChange('leadSource2', e.target.value)}
                  placeholder="Bps"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource3">Lead Source 3</Label>
                <Input
                  id="leadSource3"
                  value={formData.loComp.leadSource3}
                  onChange={(e) => handleLoCompChange('leadSource3', e.target.value)}
                  placeholder="Bps"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource4">Lead Source 4</Label>
                <Input
                  id="leadSource4"
                  value={formData.loComp.leadSource4}
                  onChange={(e) => handleLoCompChange('leadSource4', e.target.value)}
                  placeholder="Bps"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource5">Lead Source 5</Label>
                <Input
                  id="leadSource5"
                  value={formData.loComp.leadSource5}
                  onChange={(e) => handleLoCompChange('leadSource5', e.target.value)}
                  placeholder="Bps"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment & Access */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment & Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Equipment Package</Label>
            <Select value={formData.equipmentPackage} onValueChange={(value) => handleInputChange('equipmentPackage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select equipment package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="desktop-2-monitors">Desktop with 2 Monitors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Swag Box</Label>
            <Select value={formData.swagBox} onValueChange={(value) => handleInputChange('swagBox', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select swag box" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ops">Ops</SelectItem>
                <SelectItem value="lo">LO</SelectItem>
                <SelectItem value="bm">BM</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encompassAccess">List anyone who will need access to this person's pipeline in Encompass</Label>
            <Textarea
              id="encompassAccess"
              value={formData.encompassAccess}
              onChange={(e) => handleInputChange('encompassAccess', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pipelineAccess">List any pipelines this hire will need access to</Label>
            <Textarea
              id="pipelineAccess"
              value={formData.pipelineAccess}
              onChange={(e) => handleInputChange('pipelineAccess', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="assignedProcessor">Assigned Processor</Label>
              <Input
                id="assignedProcessor"
                value={formData.assignedProcessor}
                onChange={(e) => handleInputChange('assignedProcessor', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedLOA">Assigned LOA</Label>
              <Input
                id="assignedLOA"
                value={formData.assignedLOA}
                onChange={(e) => handleInputChange('assignedLOA', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Officer Specific */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Officer Specific (Mandatory for LO positions)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectedVolume">LO Projected Volume and Units</Label>
            <Textarea
              id="projectedVolume"
              value={formData.projectedVolume}
              onChange={(e) => handleInputChange('projectedVolume', e.target.value)}
              placeholder="Mandatory for Loan Officers only"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mmiFile">Upload MMI Snippet of the Loan Officer</Label>
            <Input
              id="mmiFile"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-muted-foreground">Mandatory for Loan Officers only</p>
          </div>

          <div className="space-y-2">
            <Label>Is the Loan Officer's branch pricing being set up for a new branch or an existing branch?</Label>
            <Select value={formData.branchPricing} onValueChange={(value) => handleInputChange('branchPricing', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch pricing setup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-branch">New Branch</SelectItem>
                <SelectItem value="existing-branch">Existing Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branchForPolly">Branch for Polly</Label>
            <Input
              id="branchForPolly"
              value={formData.branchForPolly}
              onChange={(e) => handleInputChange('branchForPolly', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Response */}
      <Card>
        <CardHeader>
          <CardTitle>Email Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emailResponse">Email response to myself</Label>
            <Input
              id="emailResponse"
              type="email"
              value={formData.emailResponse}
              onChange={(e) => handleInputChange('emailResponse', e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pb-8">
        <Button type="button" variant="outline">
          Save Draft
        </Button>
        <Button type="submit">
          Submit Application
        </Button>
      </div>
    </form>
  )
}