import { Card } from "@/components/ui/card"
import { Shield, Building, Target, Award } from "lucide-react"

export default function FinancialStrength() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Strength & Stability</h2>
            <p className="text-xl text-gray-600">Backed by institutional capital and proven performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Rock-Solid Foundation</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our financial strength provides the stability and resources you need to grow your business with
                confidence. We're backed by institutional investors and maintain strong relationships with major
                warehouse lenders.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">A-rated financial stability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">$50M+ warehouse capacity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Institutional backing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Regulatory compliance excellence</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">A+</div>
                <div className="text-sm text-gray-600">BBB Rating</div>
              </Card>
              <Card className="p-6 text-center">
                <Building className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-sm text-gray-600">States Licensed</div>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">$50M</div>
                <div className="text-sm text-gray-600">Warehouse Capacity</div>
              </Card>
              <Card className="p-6 text-center">
                <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">99.8%</div>
                <div className="text-sm text-gray-600">Compliance Score</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
