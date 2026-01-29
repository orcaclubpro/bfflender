import { ArrowRight, Calculator, FileText } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5"
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px)' }} />

      <div className="container-padding relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-serif font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-body-lg text-emerald-200 max-w-2xl mx-auto">
              Take the first step toward your home ownership goals today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Apply Online CTA */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <Link
                href="/apply"
                className="relative block p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl border border-emerald-400/50 hover:border-emerald-300 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Apply Online Today!
                </h3>
                <p className="text-emerald-100 mb-4">
                  Start your mortgage application online. Quick, secure, and available 24/7.
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>

            {/* Estimate Payment CTA */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-100 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <Link
                href="/calculator"
                className="relative block p-8 bg-gradient-to-br from-white to-emerald-50 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-emerald-500 rounded-lg">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-navy-900 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  Estimate Your Payment
                </h3>
                <p className="text-navy-700 mb-4">
                  Use our mortgage calculator to estimate your monthly payments and plan your budget.
                </p>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom contact reminder */}
          <div className="mt-12 text-center">
            <p className="text-emerald-200 mb-4">Have questions? Richard is here to help.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="tel:678-620-5244"
                className="text-white font-semibold hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                678-620-5244
              </a>
              <div className="w-px h-6 bg-white/20" />
              <a
                href="mailto:rwhite@allwestern.com"
                className="text-white font-semibold hover:text-emerald-300 transition-colors duration-200"
              >
                rwhite@allwestern.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
