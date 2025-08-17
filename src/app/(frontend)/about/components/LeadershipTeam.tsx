import { Card } from "@/components/ui/card"

export default function LeadershipTeam() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Industry veterans with proven track records</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">JD</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">John Davis</h3>
              <p className="text-orange-600 font-semibold mb-3">CEO & President</p>
              <p className="text-gray-600 text-sm">
                30+ years in mortgage lending, former VP at major national lender. Passionate about empowering loan
                officers.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">SM</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Martinez</h3>
              <p className="text-orange-600 font-semibold mb-3">Chief Operating Officer</p>
              <p className="text-gray-600 text-sm">
                Expert in mortgage operations and technology. Led digital transformation initiatives at Fortune 500
                companies.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">MR</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Michael Rodriguez</h3>
              <p className="text-orange-600 font-semibold mb-3">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Fintech innovator with 20+ years experience. Architect of our industry-leading technology platform.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
