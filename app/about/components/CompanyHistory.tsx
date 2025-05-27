import { Card } from "@/components/ui/card"
import { Calendar, Building, Users, TrendingUp } from "lucide-react"

export default function CompanyHistory() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Heritage</h2>
            <p className="text-xl text-gray-600">Three decades of proven performance and industry leadership</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Built on Trust & Innovation</h3>
              <p className="text-lg text-gray-600 mb-6">
                Since our founding, AllWestern Mortgage has been at the forefront of mortgage innovation. We've
                weathered market cycles, adapted to changing regulations, and consistently delivered superior results
                for our partners.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                BFFLender represents our commitment to the next generation of mortgage professionals - those who demand
                transparency, performance, and partnership over corporate bureaucracy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Founded in 1990</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Headquartered in Las Vegas, Nevada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">500+ Loan Officers Nationwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">$2.5B+ Annual Loan Volume</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">30+</div>
                  <div className="text-lg text-gray-600">Years in Business</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">$50B+</div>
                  <div className="text-lg text-gray-600">Lifetime Loan Volume</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">100K+</div>
                  <div className="text-lg text-gray-600">Families Helped</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Milestones</h3>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1990
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Company Founded</h4>
                  <p className="text-gray-600">AllWestern Mortgage established with a vision of superior service</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2000
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Technology Innovation</h4>
                  <p className="text-gray-600">Pioneered online mortgage applications and digital processing</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2010
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Market Expansion</h4>
                  <p className="text-gray-600">Expanded to serve borrowers in 15+ states nationwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2020
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">BFFLender Launch</h4>
                  <p className="text-gray-600">Launched BFFLender platform with P&L Challenge guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
