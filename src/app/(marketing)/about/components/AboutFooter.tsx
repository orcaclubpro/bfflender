export default function AboutFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BFF</span>
            </div>
            <span className="text-xl font-bold">BFFLender</span>
          </div>
          <p className="text-gray-400 mb-4">
            Powered by AllWestern Mortgage - 30+ years of proven mortgage performance
          </p>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} BFFLender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
