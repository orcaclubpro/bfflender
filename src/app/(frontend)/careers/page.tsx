import CareersForm from "./components/CareersForm"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata = {
  title: "Careers - BFFLender | AllWestern Mortgage",
  description: "Join the BFFLender team at AllWestern Mortgage. Apply for loan officer, processor, and other mortgage industry positions.",
  keywords: "careers, mortgage jobs, loan officer positions, BFFLender careers, AllWestern Mortgage jobs"
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="section-padding">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-display-xl font-bold text-navy-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-body-lg text-navy-600 max-w-2xl mx-auto">
              Start your career with BFFLender and become part of a team that's transforming the mortgage industry.
              Complete the form below to apply for your desired position.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white">
            <CareersForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}