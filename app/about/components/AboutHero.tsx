import { Badge } from "@/components/ui/badge"

export default function AboutHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-600 text-white px-4 py-2">30+ Years of Excellence</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-orange-400">BFFLender</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Powered by AllWestern Mortgage, we've been creating lifetime relationships through superior service,
            innovation, and unwavering commitment to our partners' success.
          </p>
        </div>
      </div>
    </section>
  )
}
