import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Service</span>
          </h1>
          <p className="text-gray-400 mb-8">Last updated: January 18, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using Autostep&apos;s automation services and website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services. The materials and services provided are protected by applicable copyright and trademark law.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Subject to these terms, Autostep grants you a limited, non-exclusive, non-transferable license to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Access and use our automation services for your business purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Use the workflows and automations we create for your organization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Access our support resources and documentation</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by Autostep at any time.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Service Description</h2>
              <p className="text-gray-300 leading-relaxed">
                Autostep provides AI-powered automation solutions and n8n workflow development services. We offer consultation, implementation, and ongoing support for business process automation. Service availability, features, and pricing are subject to change with reasonable notice. We strive to maintain high service availability but do not guarantee uninterrupted access.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When using our services, you agree to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Provide accurate and complete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Maintain the security of your account credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Use the services in compliance with all applicable laws</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Not attempt to reverse engineer or compromise our systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Not use the services for any illegal or unauthorized purpose</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                Services are billed according to the pricing plan you select. Payment is due as specified in your service agreement. We reserve the right to suspend or terminate services for non-payment. All fees are non-refundable except as required by law or explicitly stated in your service agreement. Prices are subject to change with 30 days notice.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                The services, including all software, content, and materials, are owned by Autostep and protected by intellectual property laws. Custom workflows and automations created specifically for your business remain your property, while the underlying technology and platform remain our property. You may not copy, modify, distribute, or create derivative works based on our proprietary technology.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-300 leading-relaxed">
                The services are provided &quot;as is&quot; without warranties of any kind, either express or implied. Autostep does not warrant that the services will be uninterrupted, error-free, or completely secure. We do not guarantee specific business outcomes or results from using our automation services. You acknowledge that automation solutions require ongoing monitoring and adjustment.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, Autostep shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the services. Our total liability for any claims arising from these terms or your use of the services shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                Either party may terminate services with written notice as specified in your service agreement. We may immediately terminate or suspend your access for violation of these terms, non-payment, or any conduct we deem harmful to our business or other users. Upon termination, you must cease all use of our services and we will provide reasonable assistance in transitioning your workflows.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Modifications to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify you of material changes via email or through the service. Your continued use of the services after such modifications constitutes acceptance of the updated terms. If you do not agree to the modified terms, you must discontinue use of the services.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the services shall be resolved in the courts located in San Francisco County, California.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-gray-300 space-y-1">
                <p>Email: aytac@auto-step.com</p>
                <p>Email: hello@auto-step.com</p>
                <p>Address: Batıgazi cad - Aydın/Efeler 09100</p>
                <p>Phone: +90 551 355 2607</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
