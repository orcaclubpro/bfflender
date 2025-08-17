import BFFLogo from "@/components/layout/BFFLogo"

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <BFFLogo className="mb-4" />
            <p className="text-navy-300 mb-4">
              Your BFF in Home Financing. 30+ years of trusted mortgage experience.
            </p>
            <div className="flex space-x-4">
              {/* Social links would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-navy-300">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="/challenge" className="hover:text-white transition-colors">P&L Challenge</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-navy-300">
              <li><a href="#" className="hover:text-white transition-colors">Conventional Loans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FHA Loans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VA Loans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jumbo Loans</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-navy-300">
              <p>Phone: Coming Soon</p>
              <p>Email: Coming Soon</p>
              <p>Address: Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 text-center text-navy-400">
          <p>&copy; 2024 BFFLender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}