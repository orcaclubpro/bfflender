import Image from 'next/image';

export function AgentHero() {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50 via-emerald-100/50 to-white overflow-hidden">
      {/* Mobile layout - image with overlay */}
      <div className="md:hidden">
        <div className="relative w-full min-h-[85vh] flex flex-col">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://richardwhite.allwestern.com/files/2025/10/Richard-White.jpg"
              alt="Richard White"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dramatic gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="relative flex flex-col justify-between min-h-[85vh] container-padding py-8">
            {/* Top badge */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm border border-emerald-200 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-800 tracking-wide">Available Now</span>
              </div>
            </div>

            {/* Bottom content - name and title */}
            <div className="space-y-6">
              {/* Small eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-emerald-400" />
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-300 font-bold">Your Loan Officer</span>
              </div>

              {/* Name - Bold overlay */}
              <h1 className="space-y-1">
                <span className="block text-6xl sm:text-7xl font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                  Richard
                </span>
                <span className="block text-6xl sm:text-7xl font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                  White
                </span>
              </h1>

              {/* Title */}
              <p className="text-2xl text-emerald-200 font-light tracking-wide drop-shadow-lg">
                Loan Officer
              </p>

              {/* Key differentiator - concise */}
              <p className="text-base text-white/90 leading-relaxed max-w-md drop-shadow-lg">
                US Army Special Forces veteran with 20+ years of mortgage experience, specializing in VA loans.
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold">NMLS #176002</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/40" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold">Licensed in Virginia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs section - below the hero */}
        <div className="container-padding py-8 bg-white">
          <div className="space-y-3">
            <a
              href="tel:678-620-5244"
              className="group flex items-center justify-center gap-3 w-full px-8 py-5 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call 678-620-5244</span>
            </a>

            <a
              href="mailto:rwhite@allwestern.com"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white border-2 border-navy-200 text-navy-700 font-semibold text-base hover:border-emerald-500 hover:text-emerald-700 transition-all duration-200 rounded-full active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Send Email</span>
            </a>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-navy-600">
              Serving Virginia homebuyers with personalized loan solutions
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout - asymmetric */}
      <div className="hidden md:block min-h-[90vh] flex items-center relative">
        {/* Asymmetric photo placement - left side, bleeding edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[40%] lg:w-[35%]">
          <div className="relative h-full w-full">
            <Image
              src="https://richardwhite.allwestern.com/files/2025/10/Richard-White.jpg"
              alt="Richard White"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dramatic gradient fade to integrate with background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-emerald-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Diagonal accent line - creates visual energy */}
        <div
          className="absolute left-[35%] top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-navy-900 opacity-20"
          style={{ transform: 'skewX(-3deg)' }}
        />

        {/* Content - overlapping the photo */}
        <div className="container-padding relative w-full">
          <div className="max-w-7xl mx-auto">
            <div className="ml-[35%] lg:ml-[30%] pt-20 pb-24">

              {/* Small eyebrow - establishes context */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-12 bg-emerald-500" />
                <span className="text-xs uppercase tracking-[0.2em] text-navy-600 font-bold">Your Loan Officer</span>
              </div>

              {/* Name - MASSIVE, confident */}
              <h1 className="mb-4">
                <span className="block text-8xl lg:text-9xl font-black text-navy-900 leading-[0.9] tracking-tight mb-2">
                  Richard
                </span>
                <span className="block text-8xl lg:text-9xl font-black text-navy-900 leading-[0.9] tracking-tight">
                  White
                </span>
              </h1>

              {/* Title - light contrast */}
              <p className="text-3xl text-navy-500 font-light mb-8 tracking-wide">
                Loan Officer
              </p>

              {/* Key differentiator - the hook */}
              <div className="mb-10 max-w-xl">
                <p className="text-xl md:text-2xl text-navy-800 leading-relaxed font-medium">
                  20+ years helping people achieve home ownership.
                  <span className="block mt-2 text-emerald-700">
                    US Army Special Forces veteran specializing in VA loans.
                  </span>
                </p>
              </div>

              {/* Credentials - small but authoritative */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-navy-600 mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-400" />
                  <span className="font-semibold">NMLS #176002</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-navy-300" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-400" />
                  <span className="font-semibold">Licensed in Virginia</span>
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-8">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-800 tracking-wide">Available Now</span>
              </div>

              {/* Immediate action - single focused CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="tel:678-620-5244"
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-navy-900 text-white rounded-full font-bold text-lg hover:bg-navy-800 transition-all duration-300 hover:shadow-2xl hover:shadow-navy-900/30 hover:-translate-y-1"
                >
                  <span>Call Now</span>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>

                <a
                  href="mailto:rwhite@allwestern.com"
                  className="inline-flex items-center gap-2 px-6 py-5 text-navy-700 font-semibold text-lg hover:text-navy-900 transition-colors duration-200 group"
                >
                  <span className="group-hover:underline">Send Email</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative number - adds visual interest */}
        <div className="absolute bottom-8 right-8 text-[12rem] font-black text-navy-900/5 leading-none select-none hidden lg:block">
          01
        </div>
      </div>
    </section>
  );
}
