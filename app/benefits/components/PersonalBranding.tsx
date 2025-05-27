import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, BarChart3, Target, Award } from "lucide-react"

export default function PersonalBranding() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Personal Website</div>
                </Card>
                <Card className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Social Media Kit</div>
                </Card>
                <Card className="p-4 text-center">
                  <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Lead Generation</div>
                </Card>
                <Card className="p-4 text-center">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Marketing Materials</div>
                </Card>
              </div>

              <Card className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                <h4 className="font-bold text-purple-900 mb-3">Success Story: Sarah Johnson</h4>
                <p className="text-purple-800 text-sm mb-3">
                  "BFFLender's branding tools helped me build my personal brand. My referral rate increased 150% in 6
                  months."
                </p>
                <div className="text-2xl font-bold text-purple-900">+150% Referrals</div>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-purple-100 text-purple-900">Advantage #4</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Personal Branding Support</h2>
              <p className="text-xl text-gray-600 mb-8">
                We build YOUR brand, not ours. Create long-term value that follows you throughout your career.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Marketing Tool Suite</h4>
                    <p className="text-gray-600">
                      Professional marketing materials, email templates, and social media content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Website & Social Support</h4>
                    <p className="text-gray-600">
                      Custom websites and social media management to establish your online presence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Long-term Value Creation</h4>
                    <p className="text-gray-600">
                      Build equity in your personal brand that increases your value in the marketplace.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Explore Branding Tools</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
