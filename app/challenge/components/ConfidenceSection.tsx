import { Card } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Shield } from "lucide-react"

export default function ConfidenceSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why We're Confident</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
              <p className="text-gray-700">
                94.2% of brokers who take our challenge see improved performance with BFFLender
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">30+</div>
                  <div className="text-sm text-gray-600">Years of Data</div>
                </div>
              </div>
              <p className="text-gray-700">Three decades of proven performance data backing our confidence</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">23%</div>
                  <div className="text-sm text-gray-600">Avg Revenue Increase</div>
                </div>
              </div>
              <p className="text-gray-700">Average revenue improvement for brokers who switch to BFFLender</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">$0</div>
                  <div className="text-sm text-gray-600">Risk to You</div>
                </div>
              </div>
              <p className="text-gray-700">Zero risk with our Vegas show tickets guarantee if we can't deliver</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
