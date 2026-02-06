import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TrendingUp, Clock, Users, CheckCircle } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Order Processing Automation",
    company: "TechShop Online",
    industry: "E-commerce",
    challenge: "Manual order processing was taking 4+ hours daily and prone to errors, leading to customer complaints and delayed shipments.",
    solution: "Implemented an AI-powered n8n workflow that automatically processes orders, updates inventory, generates shipping labels, and sends customer notifications.",
    results: [
      "95% reduction in processing errors",
      "4 hours saved daily",
      "Customer satisfaction increased by 40%",
      "Same-day shipping achievement rose to 98%"
    ],
    metrics: {
      timeSaved: "120+ hours/month",
      errorReduction: "95%",
      roi: "450%"
    }
  },
  {
    id: 2,
    title: "Customer Support Ticket Routing",
    company: "CloudCare Solutions",
    industry: "SaaS",
    challenge: "Support tickets were being manually sorted and routed, causing delays in response time and poor customer experience.",
    solution: "Developed an intelligent ticket routing system using AI to categorize, prioritize, and assign tickets to the right team members based on expertise and availability.",
    results: [
      "70% faster ticket routing",
      "Response time improved by 60%",
      "Support team productivity up 45%",
      "Customer NPS score increased by 25 points"
    ],
    metrics: {
      timeSaved: "85+ hours/month",
      errorReduction: "80%",
      roi: "380%"
    }
  },
  {
    id: 3,
    title: "Marketing Campaign Automation",
    company: "GrowthMetrics Agency",
    industry: "Marketing",
    challenge: "Managing multiple client campaigns across various platforms was time-consuming and inconsistent.",
    solution: "Created a unified automation system that manages social media posting, email campaigns, analytics reporting, and client communications across all platforms.",
    results: [
      "10+ platforms integrated seamlessly",
      "Campaign setup time reduced by 80%",
      "Client reporting automated completely",
      "Team capacity increased by 3x"
    ],
    metrics: {
      timeSaved: "200+ hours/month",
      errorReduction: "90%",
      roi: "520%"
    }
  },
  {
    id: 4,
    title: "Financial Document Processing",
    company: "FinanceFlow Inc",
    industry: "Finance",
    challenge: "Processing invoices, receipts, and financial documents manually was slow and error-prone, creating bottlenecks in the accounting workflow.",
    solution: "Implemented AI-powered document processing that extracts data from financial documents, validates information, and updates accounting systems automatically.",
    results: [
      "Document processing time cut by 85%",
      "Data entry errors reduced to near zero",
      "Month-end close accelerated by 5 days",
      "Audit trail completely automated"
    ],
    metrics: {
      timeSaved: "150+ hours/month",
      errorReduction: "98%",
      roi: "410%"
    }
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Stories</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            See how businesses like yours achieved remarkable results with our automation solutions
          </p>

          <div className="space-y-12">
            {caseStudies.map((study) => (
              <article
                key={study.id}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                    {study.industry}
                  </span>
                  <h3 className="text-gray-400 text-sm">{study.company}</h3>
                </div>

                <h2 className="text-3xl font-bold mb-6">{study.title}</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
                    <Clock className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold mb-1">{study.metrics.timeSaved}</div>
                    <div className="text-sm text-gray-400">Time Saved</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl p-6 border border-blue-500/20">
                    <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold mb-1">{study.metrics.errorReduction}</div>
                    <div className="text-sm text-gray-400">Error Reduction</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-xl p-6 border border-green-500/20">
                    <Users className="w-8 h-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold mb-1">{study.metrics.roi}</div>
                    <div className="text-sm text-gray-400">ROI</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">The Challenge</h3>
                    <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-400">Our Solution</h3>
                    <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-400">Results Achieved</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {study.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            Join the businesses that have transformed their operations with Autostep. Let&apos;s discuss how we can help you achieve similar results.
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
