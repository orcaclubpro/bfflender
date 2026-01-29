export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Large decorative quote mark */}
      <div className="absolute top-20 left-8 text-[20rem] font-serif text-navy-900/5 leading-none select-none hidden lg:block">
        "
      </div>

      <div className="container-padding relative">
        <div className="max-w-5xl mx-auto">

          {/* Pull quote - immediate hook */}
          <div className="mb-16">
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-900 leading-tight mb-8">
              "I believe in truly listening to my clients to find the{' '}
              <span className="font-bold text-emerald-700">best loan</span> for them."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-1 w-16 bg-emerald-500" />
              <cite className="text-lg text-navy-600 not-italic font-semibold">Richard White</cite>
            </div>
          </div>

          {/* Editorial layout - two columns, asymmetric */}
          <div className="grid md:grid-cols-5 gap-12 md:gap-16">

            {/* Left column - smaller, context */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-navy-500 mb-4">Philosophy</h3>
                <p className="text-xl font-bold text-navy-900 leading-relaxed">
                  Outstanding service. Timely closings. Minimum stress.
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-navy-500 mb-4">Specialization</h3>
                <p className="text-lg text-navy-700 leading-relaxed">
                  Helping fellow veterans achieve home ownership through the VA home loan program.
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-navy-500 mb-4">Commitment</h3>
                <p className="text-lg text-navy-700 leading-relaxed">
                  Serving all clients above expectations, every single time.
                </p>
              </div>
            </div>

            {/* Right column - main story */}
            <div className="md:col-span-3">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-navy-800 leading-relaxed mb-6">
                  Richard has been serving individual's mortgage needs for the past 20+ years. During his career,
                  Richard has assisted thousands of individuals achieve the dream of home ownership and has saved
                  borrowers thousands by assisting them with their refinances.
                </p>

                <div className="my-10 p-8 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl text-white">
                  <p className="text-lg leading-relaxed">
                    Prior to his career as a loan officer, Richard served our citizens and country honorably for
                    seven years in the <strong>US Army Special Forces</strong>. Serving as a{' '}
                    <strong>Staff Sergeant</strong>, he gained a unique insight into the needs of his fellow soldiers.
                  </p>
                </div>

                <p className="text-xl text-navy-800 leading-relaxed">
                  This military background informs Richard's approach to every client relationship—disciplined,
                  mission-focused, and committed to excellence. He takes great pride in assisting fellow veterans
                  purchase a home of their own utilizing the VA home loan program.
                </p>
              </div>
            </div>
          </div>

          {/* Stats bar - social proof */}
          <div className="mt-20 pt-16 border-t border-navy-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-black text-navy-900 mb-2">20+</div>
                <div className="text-sm text-navy-600 uppercase tracking-wide font-semibold">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-navy-900 mb-2">1000s</div>
                <div className="text-sm text-navy-600 uppercase tracking-wide font-semibold">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-black text-navy-900 mb-2">VA</div>
                <div className="text-sm text-navy-600 uppercase tracking-wide font-semibold">Loan Specialist</div>
              </div>
              <div>
                <div className="text-4xl font-black text-navy-900 mb-2">7</div>
                <div className="text-sm text-navy-600 uppercase tracking-wide font-semibold">Years Military</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
