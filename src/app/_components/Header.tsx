import BFFLogo from "@/components/layout/BFFLogo"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <BFFLogo />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="/benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
              Benefits
            </a>
            <a href="/challenge" className="text-gray-700 hover:text-blue-600 transition-colors">
              Challenge
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <a 
              href="/login" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Sign In
            </a>
            <a 
              href="/challenge" 
              className="btn-primary px-6 py-2 text-sm"
            >
              Take the Challenge
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}