import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Eye } from "lucide-react"

export default function RadicalTransparency() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Live Pricing Dashboard</h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Base Rate</span>
                    <span className="font-semibold">6.750%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Lender Margin</span>
                    <span className="font-semibold">0.500%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Your Margin</span>
                    <span className="font-semibold text-green-600">1.250%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-2 border-blue-200">
                    <span className="text-blue-900 font-semibold">Client Rate</span>
                    <span className="font-bold text-blue-900">8.500%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Complete Transparency</span>
                  </div>
                  <p className="text-sm text-green-700">Every fee, margin, and cost is visible upfront</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-orange-100 text-orange-900">Advantage #2</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Radical Transparency</h2>
              <p className="text-xl text-gray-600 mb-8">
                See every margin, fee, and profit center upfront - no hidden costs or surprise fees
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Build Client Trust</h4>
                    <p className="text-gray-600">
                      Complete visibility builds confidence and reduces client objections during the loan process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Make Better Decisions</h4>
                    <p className="text-gray-600">
                      Know exactly where your money comes from and goes to make informed business decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Competitive Advantage</h4>
                    <p className="text-gray-600">
                      Use transparency as a selling point against competitors who hide their fees.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-orange-600 hover:bg-orange-700 text-white">View Live Dashboard</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
