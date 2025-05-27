import { Badge } from "@/components/ui/badge"

export default function BenefitsHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-600 text-white px-4 py-2">5 Game-Changing Advantages</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Why Brokers Switch to <span className="text-orange-400">BFFLender</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover the five key differentiators that transform mortgage businesses and drive superior performance
          </p>
        </div>
      </div>
    </section>
  )
}
