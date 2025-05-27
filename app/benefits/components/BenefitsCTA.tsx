import { Button } from "@/components/ui/button"

export default function BenefitsCTA() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience These Advantages?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the P&L Challenge and see how these five advantages can transform your mortgage business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4">
              Take the P&L Challenge
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
