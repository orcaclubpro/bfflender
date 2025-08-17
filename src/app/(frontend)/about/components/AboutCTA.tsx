"use client"

import { Button } from "@/components/ui/button"
import { useChatbot } from "../../../_components/ChatbotProvider"

export default function AboutCTA() {
  const { openChatbot } = useChatbot();

  const handleTakeChallenge = () => {
    openChatbot();
  };

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Story?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Become part of a company that puts your success first. Take the P&L Challenge and discover what 30+ years of
            experience can do for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4"
              onClick={handleTakeChallenge}
            >
              Take the P&L Challenge
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
