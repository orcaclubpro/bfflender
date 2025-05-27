import { Card } from "@/components/ui/card"
import { CheckCircle, Eye, Users, Star, Wrench } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Brokers Switch to BFFLender</h2>
            <p className="text-xl text-gray-600">Five game-changing advantages that transform your business</p>
          </div>

          <div className="space-y-12">
            {/* Wide Product Set */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Wide Product Set</h3>
                <p className="text-xl text-gray-600 mb-6">Access 200+ loan products vs. 15-20 at typical shops</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Higher approval rates for your clients</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Better client satisfaction and retention</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Specialty programs: Non-QM, Bank Statement, Investment</span>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">200+</div>
                  <div className="text-lg text-gray-600 mb-4">Loan Products Available</div>
                  <div className="text-sm text-gray-500">vs. 15-20 at typical shops</div>
                </div>
              </Card>
            </div>

            {/* Radical Transparency */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="p-6 order-2 lg:order-1">
                <div className="text-center">
                  <Eye className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <div className="text-lg font-semibold mb-2">Live Pricing Dashboard</div>
                  <div className="text-sm text-gray-600">See every margin, fee, and profit center upfront</div>
                </div>
              </Card>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Radical Transparency</h3>
                <p className="text-xl text-gray-600 mb-6">See every margin, fee, and profit center upfront</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Build trust with complete visibility</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Make better business decisions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>No hidden fees or surprise costs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat Organization */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Flat Organization</h3>
                <p className="text-xl text-gray-600 mb-6">Talk directly to decision makers, not middle management</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Faster decisions on complex deals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Direct access to leadership</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Higher earnings through efficiency</span>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <div className="text-center">
                  <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <div className="text-lg font-semibold mb-2">Direct Decision Making</div>
                  <div className="text-sm text-gray-600">Skip the bureaucracy, get answers fast</div>
                </div>
              </Card>
            </div>

            {/* Personal Branding */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="p-6 order-2 lg:order-1">
                <div className="text-center">
                  <Star className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <div className="text-lg font-semibold mb-2">Your Brand, Your Success</div>
                  <div className="text-sm text-gray-600">We build YOUR brand, not ours</div>
                </div>
              </Card>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Personal Branding Support</h3>
                <p className="text-xl text-gray-600 mb-6">We build YOUR brand, not ours</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Marketing tool suite included</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Website and social media support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Long-term value creation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Advantage */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Open House Technology</h3>
                <p className="text-xl text-gray-600 mb-6">Professional tools that capture every lead</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Advanced lead capture systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Integration with existing tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Training and support included</span>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <div className="text-center">
                  <Wrench className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  <div className="text-lg font-semibold mb-2">Cutting-Edge Tools</div>
                  <div className="text-sm text-gray-600">More leads, better conversion</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
