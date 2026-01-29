import { Shield, Home, TrendingDown, Users, Award, Clock } from 'lucide-react';

const highlights = [
  {
    icon: Clock,
    label: '20+ Years',
    description: 'Mortgage Experience',
  },
  {
    icon: Users,
    label: 'Thousands',
    description: 'Helped Achieve Home Ownership',
  },
  {
    icon: TrendingDown,
    label: 'Savings',
    description: 'Thousands Saved Through Refinancing',
  },
  {
    icon: Shield,
    label: '7 Years',
    description: 'US Army Special Forces',
  },
  {
    icon: Home,
    label: 'VA Loans',
    description: 'Veteran Home Loan Specialist',
  },
  {
    icon: Award,
    label: 'Excellence',
    description: 'Outstanding Customer Service',
  },
];

export function BiographySection() {
  return (
    <section className="section-padding bg-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

      <div className="container-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-navy-400" />
                <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
                </svg>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-navy-400" />
              </div>
            </div>
            <h2 className="text-display-md font-serif font-bold text-navy-900 mb-4">
              Working with Richard White
            </h2>
            <p className="text-body-lg text-navy-600 max-w-2xl mx-auto">
              Experience, dedication, and a commitment to serving those who serve
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 bg-gradient-to-br from-navy-50 to-white rounded-lg border border-navy-200/50 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full transition-all duration-300 group-hover:bg-emerald-500/10" />
                  <div className="relative">
                    <Icon className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-2xl font-bold text-navy-900 mb-1">{highlight.label}</p>
                    <p className="text-sm text-navy-600 font-medium">{highlight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Biography text */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-br from-white to-navy-50 p-8 md:p-12 rounded-2xl border border-navy-200/50 shadow-xl">
              <div className="space-y-6 text-navy-700 leading-relaxed">
                <p className="text-xl text-navy-900 font-medium">
                  Richard has been serving individual's mortgage needs for the past 20+ years.
                </p>

                <p>
                  During his career, Richard has assisted <span className="font-semibold text-navy-900">thousands of individuals</span> achieve the dream of home ownership and has saved borrowers thousands by assisting them with their refinances.
                </p>

                <div className="my-8 p-6 bg-gradient-to-r from-emerald-50 to-navy-50 rounded-lg border-l-4 border-emerald-600">
                  <p className="text-navy-800">
                    Prior to his career as a loan officer, Richard served our citizens and country honorably for <span className="font-semibold">seven years in the US Army Special Forces</span>. Serving as a <span className="font-semibold">Staff Sergeant</span>, he gained a unique insight into the needs of his fellow soldiers.
                  </p>
                </div>

                <p>
                  Richard takes great pride in assisting <span className="font-semibold text-navy-900">fellow veterans purchase a home of their own</span> utilizing the VA home loan program.
                </p>

                <p className="text-lg text-navy-900 font-medium pt-4 border-t border-navy-200">
                  Richard's goals are to serve all of his clients above what they are expecting and to close their loans in a timely manner with a minimum amount of stress. He believes in truly listening to his clients to find the best loan for them and prides himself on giving outstanding customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
