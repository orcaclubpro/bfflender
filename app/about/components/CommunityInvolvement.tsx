export default function CommunityInvolvement() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Community Involvement</h2>
          <p className="text-xl text-gray-600 mb-8">Giving back to the communities we serve</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">$500K+</div>
              <div className="text-gray-600">Donated to Local Charities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Community Events Sponsored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">Volunteer Hours</div>
            </div>
          </div>

          <p className="text-lg text-gray-600">
            We believe in supporting the communities where our loan officers and clients live and work. Through
            charitable giving, volunteer work, and community sponsorships, we're committed to making a positive impact
            beyond just mortgage lending.
          </p>
        </div>
      </div>
    </section>
  )
}
