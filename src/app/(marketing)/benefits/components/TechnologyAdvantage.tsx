import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Shield, TrendingUp } from "lucide-react"

export default function TechnologyAdvantage() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-900">Advantage #5</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Open House Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools that capture every lead and maximize your open house ROI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center">
              <Wrench className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lead Capture System</h3>
              <p className="text-gray-600 mb-4">Digital sign-in, QR codes, and instant follow-up automation</p>
              <div className="text-2xl font-bold text-red-600">+300%</div>
              <div className="text-sm text-gray-500">Lead capture rate</div>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">CRM Integration</h3>
              <p className="text-gray-600 mb-4">Seamless integration with your existing CRM and follow-up systems</p>
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-500">Data accuracy</div>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">Real-time analytics and ROI tracking for every open house event</p>
              <div className="text-2xl font-bold text-green-600">Real-time</div>
              <div className="text-sm text-gray-500">Performance data</div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology ROI Calculator</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Average leads per open house:</span>
                    <span className="font-bold">15 → 45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Conversion rate improvement:</span>
                    <span className="font-bold">+40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Additional monthly income:</span>
                    <span className="font-bold text-green-600">+$8,500</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">$102K</div>
                <div className="text-lg text-gray-700 mb-4">Additional Annual Income</div>
                <p className="text-sm text-gray-600">
                  Average increase for loan officers using our open house technology
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
