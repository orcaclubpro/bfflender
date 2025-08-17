import { Card } from "@/components/ui/card"
import { Heart, Shield, TrendingUp, Users } from "lucide-react"

export default function CompanyCulture() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Culture & Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Relationship-Focused</h3>
              <p className="text-gray-600 text-sm">We build lifetime partnerships, not just business transactions</p>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Integrity</h3>
              <p className="text-gray-600 text-sm">Transparency and honesty in every interaction and decision</p>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">Continuously improving and leading industry advancement</p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Client-Centered</h3>
              <p className="text-gray-600 text-sm">Your success is our success - we win when you win</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
