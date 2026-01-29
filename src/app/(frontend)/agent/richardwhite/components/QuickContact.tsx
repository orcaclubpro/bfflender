import { Phone, Mail } from 'lucide-react';

export function QuickContact() {
  return (
    <>
      {/* Floating contact bar - always accessible */}
      <div className="sticky top-4 z-40 pointer-events-none">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-navy-200 rounded-full shadow-2xl shadow-navy-900/20 p-2 flex items-center gap-2">
              <a
                href="tel:678-620-5244"
                className="group flex items-center gap-3 px-5 py-3 rounded-full hover:bg-emerald-50 transition-all duration-300"
                title="Call Richard White"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-navy-900 hidden sm:block">678-620-5244</span>
              </a>

              <div className="w-px h-8 bg-navy-200" />

              <a
                href="mailto:rwhite@allwestern.com"
                className="group flex items-center gap-3 px-5 py-3 rounded-full hover:bg-blue-50 transition-all duration-300"
                title="Email Richard White"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-navy-900 hidden md:block">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-8" />
    </>
  );
}
