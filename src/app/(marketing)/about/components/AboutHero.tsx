import { Badge } from "@/components/ui/badge"
import BFFLogo from "@/components/layout/BFFLogo"

export default function AboutHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <BFFLogo 
              size="lg" 
              variant="light" 
              showText={true}
              className="justify-center mb-6"
            />
          </div>
          <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 border-amber-500">
            30+ Years of Excellence
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">BFFLender</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Powered by AllWestern Mortgage, we've been creating lifetime relationships through superior service,
            innovation, and unwavering commitment to our partners' success.
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  )
}
