import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTACards() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-navy-50 relative overflow-hidden">
      <div className="container-padding relative">
        <div className="max-w-7xl mx-auto">

          {/* Asymmetric layout - primary action gets more space */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Primary CTA - Apply Online (takes 7 columns) */}
            <div className="lg:col-span-7">
              <Link
                href="/apply"
                className="group relative block h-full min-h-[500px] bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-navy-900/40 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative h-full p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-xs uppercase tracking-[0.2em] text-emerald-300 font-bold">Primary Action</span>
                    </div>

                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                      Apply Online
                    </h3>

                    <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-lg mb-8">
                      Start your mortgage application now. Quick, secure, and available 24/7.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        'Complete at your own pace',
                        'Secure & encrypted process',
                        'Get pre-approved faster',
                        'Expert guidance available'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/90">
                          <svg className="w-6 h-6 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <span className="text-2xl font-bold">Get Started</span>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Secondary actions (takes 5 columns) */}
            <div className="lg:col-span-5 space-y-8">

              {/* Estimate Payment */}
              <Link
                href="/calculator"
                className="group relative block bg-white rounded-3xl p-8 md:p-10 border-2 border-navy-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <ArrowRight className="w-6 h-6 text-navy-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-3xl font-bold text-navy-900 mb-3">
                  Estimate Payment
                </h3>
                <p className="text-lg text-navy-600 leading-relaxed">
                  Calculate your monthly mortgage payments and plan your budget.
                </p>
              </Link>

              {/* Direct Contact */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-10 border border-emerald-200">
                <h4 className="text-sm uppercase tracking-[0.2em] text-navy-600 font-bold mb-4">
                  Prefer to Talk?
                </h4>

                <a
                  href="tel:678-620-5244"
                  className="group block mb-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-2xl font-black text-navy-900 group-hover:text-emerald-700 transition-colors duration-200">
                      678-620-5244
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:rwhite@allwestern.com"
                  className="text-navy-600 hover:text-navy-900 font-semibold hover:underline transition-colors duration-200"
                >
                  rwhite@allwestern.com
                </a>
              </div>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="mt-16 text-center">
            <p className="text-navy-600 mb-4">
              <span className="font-semibold">NMLS #176002</span> • Licensed in Virginia
            </p>
            <p className="text-sm text-navy-500">
              Equal Housing Opportunity • All loans subject to credit approval
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
