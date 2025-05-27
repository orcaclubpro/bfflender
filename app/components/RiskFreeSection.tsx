import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function RiskFreeSection() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Risk-Free Next Steps</h2>
          <p className="text-xl text-blue-100 mb-12">Three simple steps to discover your potential with BFFLender</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Submit Your P&L</h3>
              <p className="text-blue-100">Confidential review, no obligation</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Custom Analysis</h3>
              <p className="text-blue-100">Detailed comparison in 48 hours</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Take the Challenge</h3>
              <p className="text-blue-100">Vegas tickets if we lose</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4">
              Start P&L Challenge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
