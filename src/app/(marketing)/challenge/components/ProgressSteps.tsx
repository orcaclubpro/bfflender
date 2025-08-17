import { CheckCircle } from "lucide-react"

export default function ProgressSteps() {
  const step = 1 // This would be dynamic in a real app

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-900" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-900 text-white" : "bg-gray-300"}`}
              >
                {step > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
              </div>
              <span className="font-medium">Basic Information</span>
            </div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-900" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-900 text-white" : "bg-gray-300"}`}
              >
                {step > 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
              </div>
              <span className="font-medium">P&L Analysis</span>
            </div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? "text-blue-900" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-900 text-white" : "bg-gray-300"}`}
              >
                3
              </div>
              <span className="font-medium">Submit Challenge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
