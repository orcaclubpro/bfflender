import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

export default function FlatOrganization() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-900">Advantage #3</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Flat Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talk directly to decision makers, not middle management. Get answers fast and close deals faster.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-red-600 mb-4 text-center">Typical Mortgage Company</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-800">CEO/President</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700">Regional VP</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700">Area Manager</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700">Branch Manager</div>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center border-2 border-red-300">
                  <div className="font-semibold text-red-900">YOU (Loan Officer)</div>
                </div>
              </div>
              <div className="mt-4 text-center text-red-600 font-semibold">4+ Layers of Bureaucracy</div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-green-600 mb-4 text-center">BFFLender Structure</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-green-800">Leadership Team</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center border-2 border-green-300">
                  <div className="font-semibold text-green-900">YOU (Loan Officer)</div>
                </div>
              </div>
              <div className="mt-4 text-center text-green-600 font-semibold">Direct Access to Decision Makers</div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Zap className="h-4 w-4" />
                  <span>Faster exception approvals</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Zap className="h-4 w-4" />
                  <span>Quick policy clarifications</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Zap className="h-4 w-4" />
                  <span>Immediate support when needed</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">2 Hours</div>
              <div className="text-gray-600 mb-4">Average Response Time</div>
              <p className="text-sm text-gray-500">vs. 2-3 days at typical companies</p>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600 mb-4">Same-Day Decisions</div>
              <p className="text-sm text-gray-500">On complex scenarios and exceptions</p>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">$12K</div>
              <div className="text-gray-600 mb-4">Avg. Additional Income</div>
              <p className="text-sm text-gray-500">From faster deal closures</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
