import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Policy</span>
          </h1>
          <p className="text-gray-400 mb-8">Last updated: January 18, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                At Autostep, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our automation services and website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Personal information such as name, email address, and phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Business information including company name and industry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Usage data about how you interact with our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Technical data including IP address, browser type, and device information</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Provide, maintain, and improve our automation services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Process your requests and transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Send you technical notices and support messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Respond to your comments and questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Analyze usage patterns to improve our services</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. We use encryption, secure servers, and regular security assessments to safeguard your data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>With service providers who assist in operating our business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>To comply with legal obligations or respond to legal requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>To protect the rights, property, or safety of Autostep, our users, or others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>With your consent or at your direction</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Access and receive a copy of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Correct inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Object to or restrict certain processing activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Withdraw consent where processing is based on consent</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
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
