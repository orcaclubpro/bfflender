import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export default function WideProductSet() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-900">Advantage #1</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Wide Product Set</h2>
              <p className="text-xl text-gray-600 mb-8">
                Access 200+ loan products from 40+ lenders vs. 15-20 at typical shops
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Higher Approval Rates</h4>
                    <p className="text-gray-600">
                      More product options mean more ways to get your clients approved, even with challenging credit
                      profiles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Better Client Satisfaction</h4>
                    <p className="text-gray-600">
                      Find the perfect loan for every situation, leading to happier clients and more referrals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specialty Programs</h4>
                    <p className="text-gray-600">
                      Non-QM, Bank Statement, Investment Properties, and other niche products that competitors can't
                      offer.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-blue-900 hover:bg-blue-800 text-white">Explore Product Matrix</Button>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-l-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Conventional Loans</h4>
                  <Badge className="bg-green-100 text-green-800">45+ Options</Badge>
                </div>
                <p className="text-gray-600">From first-time homebuyer programs to jumbo loans</p>
              </Card>

              <Card className="p-6 border-l-4 border-l-orange-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Government Loans</h4>
                  <Badge className="bg-green-100 text-green-800">25+ Options</Badge>
                </div>
                <p className="text-gray-600">FHA, VA, USDA with specialized overlays</p>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Non-QM Programs</h4>
                  <Badge className="bg-green-100 text-green-800">80+ Options</Badge>
                </div>
                <p className="text-gray-600">Bank statement, asset-based, investor programs</p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Commercial Products</h4>
                  <Badge className="bg-green-100 text-green-800">50+ Options</Badge>
                </div>
                <p className="text-gray-600">Investment properties, fix-and-flip, DSCR loans</p>
              </Card>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">200+</div>
                <div className="text-blue-700">Total Products Available</div>
                <div className="text-sm text-blue-600 mt-2">vs. 15-20 at typical shops</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
