import { FileText, Search, TrendingUp, Shield, Clock, Award } from "lucide-react"
import TakeChallengeButton from "./TakeChallengeButton"

export default function ProcessDeepDive() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-emerald-600" />,
      title: "Submit Your P&L",
      description: "Upload your current mortgage P&L statement through our secure, encrypted portal. Takes 2 minutes.",
      time: "2 min"
    },
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Expert Analysis",
      description: "Our team of former bank executives analyzes your rates, fees, and terms against our database of 1,000+ recent deals.",
      time: "24 hours"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-600" />,
      title: "Savings Projection",
      description: "Receive a detailed report showing exactly where we can improve your terms and how much you'll save annually.",
      time: "24 hours"
    }
  ]

  const guarantees = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: "100% Confidential",
      description: "Your P&L data is encrypted, never shared, and automatically deleted after 30 days if you don't proceed."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "48-Hour Analysis",
      description: "Get your complete savings analysis within 48 hours, or we'll expedite your next loan for free."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: "Vegas Guarantee",
      description: "If we can't beat your current terms, we'll pay for your Vegas show tickets. No questions asked."
    }
  ]

  const faqs = [
    {
      question: "What if my P&L shows I'm already getting great rates?",
      answer: "Even with 'great' rates, we find savings 93.7% of the time. Our volume-based pricing and direct lender relationships often reveal opportunities that aren't obvious on the surface."
    },
    {
      question: "How secure is my financial information?",
      answer: "We use bank-level encryption and are SOC 2 Type II certified. Your data is processed by our internal team only - never outsourced or shared with third parties."
    },
    {
      question: "What's the catch with the Vegas guarantee?",
      answer: "No catch. We're so confident in our ability to find savings that we put our money where our mouth is. If we can't improve your terms, we'll cover your Vegas show tickets."
    },
    {
      question: "How much can I realistically save?",
      answer: "The average client saves $47,000 annually. Savings range from $15,000 to $150,000+ depending on loan volume and current terms."
    }
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              How the <span className="text-emerald-600">P&L Challenge</span> Works
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Our proven 3-step process has helped hundreds of mortgage professionals 
              discover hidden savings in their P&L. Here's exactly what happens:
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center relative">
                <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{step.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4 mr-1" />
                  {step.time}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="bg-white rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">
              Our Iron-Clad Guarantees
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {guarantee.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">{guarantee.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{guarantee.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">{faq.question}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-900 to-blue-900 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions? Let's Talk.
            </h3>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              The P&L Challenge is completely risk-free. Start your analysis now and see 
              exactly where you could be saving money.
            </p>
            <TakeChallengeButton 
              variant="inline" 
              text="Start My P&L Analysis"
              className="bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold"
            />
          </div>
        </div>
      </div>
    </section>
  )
}