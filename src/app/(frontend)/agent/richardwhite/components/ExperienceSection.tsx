export function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-navy-50">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <div className="mb-16 flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-navy-500 font-bold">Experience & Credentials</span>
            <div className="h-px flex-1 bg-gradient-to-r from-navy-300 to-transparent" />
          </div>

          {/* Timeline-based layout - shows progression */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-navy-900 opacity-20 hidden md:block" />

            <div className="space-y-20">
              {/* 20+ Years Experience */}
              <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="md:text-right md:pr-16">
                  <div className="inline-block mb-4">
                    <div className="text-8xl md:text-9xl font-black text-emerald-500 leading-none mb-2">20+</div>
                    <div className="text-xl font-bold text-navy-900 uppercase tracking-wide">Years</div>
                  </div>
                </div>
                <div className="md:pl-16 mt-6 md:mt-0">
                  <h3 className="text-3xl font-bold text-navy-900 mb-3">Mortgage Experience</h3>
                  <p className="text-lg text-navy-700 leading-relaxed">
                    Over two decades helping individuals achieve the dream of home ownership and saving borrowers thousands through strategic refinancing.
                  </p>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg -translate-x-1/2 hidden md:block" />
              </div>

              {/* Thousands Helped */}
              <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="md:text-right md:pr-16 md:order-2">
                  <div className="inline-block mb-4">
                    <div className="text-6xl md:text-7xl font-black text-blue-500 leading-none mb-2">1000s</div>
                    <div className="text-xl font-bold text-navy-900 uppercase tracking-wide">Clients</div>
                  </div>
                </div>
                <div className="md:pl-16 mt-6 md:mt-0 md:order-1">
                  <h3 className="text-3xl font-bold text-navy-900 mb-3">Successful Outcomes</h3>
                  <p className="text-lg text-navy-700 leading-relaxed">
                    Thousands of families have trusted Richard to guide them through one of life's biggest financial decisions.
                  </p>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg -translate-x-1/2 hidden md:block" />
              </div>

              {/* Military Service */}
              <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="md:text-right md:pr-16">
                  <div className="inline-block mb-4">
                    <div className="text-7xl md:text-8xl font-black text-navy-700 leading-none mb-2">7</div>
                    <div className="text-xl font-bold text-navy-900 uppercase tracking-wide">Years</div>
                  </div>
                </div>
                <div className="md:pl-16 mt-6 md:mt-0">
                  <h3 className="text-3xl font-bold text-navy-900 mb-3">US Army Special Forces</h3>
                  <p className="text-lg text-navy-700 leading-relaxed mb-4">
                    Served honorably as a Staff Sergeant, gaining unique insight into the needs of fellow service members.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-full">
                    <svg className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
                    </svg>
                    <span className="text-sm font-bold text-emerald-900 uppercase tracking-wide">VA Loan Specialist</span>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-6 h-6 bg-navy-700 rounded-full border-4 border-white shadow-lg -translate-x-1/2 hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
