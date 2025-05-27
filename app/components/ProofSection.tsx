import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProofSection() {
  return (
    <section id="proof" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proof & Social Validation</h2>
            <p className="text-xl text-gray-600">Real results from real brokers who took the challenge</p>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">23%</div>
              <div className="text-sm text-gray-600">Average Revenue Increase</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">31%</div>
              <div className="text-sm text-gray-600">Average Profit Improvement</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">94.2%</div>
              <div className="text-sm text-gray-600">Challenge Success Rate</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
              <div className="text-sm text-gray-600">Years of Data</div>
            </Card>
          </div>

          {/* Case Studies Preview */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">The Overwhelmed Solo Broker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">From $180K to $340K annual profit</p>
                <div className="text-2xl font-bold text-green-600 mb-2">+89% Profit</div>
                <Button variant="outline" size="sm">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">The Stuck Team Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Doubled team production in 8 months</p>
                <div className="text-2xl font-bold text-green-600 mb-2">+100% Volume</div>
                <Button variant="outline" size="sm">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">The Fed-Up Corporate Escapee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Tripled income, gained freedom</p>
                <div className="text-2xl font-bold text-green-600 mb-2">+200% Income</div>
                <Button variant="outline" size="sm">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
