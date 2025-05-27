import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BenefitsHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BFF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BFFLender</h1>
              <p className="text-xs text-gray-600">Benefits Deep Dive</p>
            </div>
          </div>
        </Link>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">Take P&L Challenge</Button>
      </div>
    </header>
  )
}
