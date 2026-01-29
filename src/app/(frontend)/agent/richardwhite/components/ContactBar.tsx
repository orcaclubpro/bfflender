import { Phone, Mail } from 'lucide-react';

export function ContactBar() {
  return (
    <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Animated background shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

      <div className="container-padding py-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone */}
            <a
              href="tel:678-620-5244"
              className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-300 font-medium mb-1">Mobile</p>
                <p className="text-xl font-bold text-white tracking-wide">678-620-5244</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:rwhite@allwestern.com"
              className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-300 font-medium mb-1">Email</p>
                <p className="text-lg font-semibold text-white truncate">rwhite@allwestern.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
