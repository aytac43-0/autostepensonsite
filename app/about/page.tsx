import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Zap, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Autostep</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            Transforming businesses through intelligent automation and AI solutions
          </p>

          <div className="prose prose-invert max-w-none">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Target className="text-purple-500" />
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                At Autostep, we believe that every business deserves access to powerful automation tools.
                Our mission is to democratize AI and workflow automation, making it accessible and practical
                for businesses of all sizes. We combine cutting-edge technology with intuitive design to
                help organizations streamline their operations and focus on what truly matters.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Zap className="text-blue-500" />
                What We Do
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                We specialize in creating custom automation solutions powered by n8n and AI integration.
                Our services include:
              </p>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>AI-powered workflow automation that learns and adapts to your business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Custom n8n workflow development and optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Integration of multiple platforms and tools into seamless workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Ongoing support and optimization to maximize ROI</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Users className="text-green-500" />
                Our Team
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our team consists of experienced automation engineers, AI specialists, and business consultants
                who are passionate about helping businesses succeed. With years of combined experience in
                workflow automation and AI integration, we bring both technical expertise and business acumen
                to every project.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Award className="text-yellow-500" />
                Why Choose Us
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                We stand out from the competition by focusing on what matters most to your business:
              </p>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Personalized solutions tailored to your specific needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Transparent pricing with no hidden costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Dedicated support throughout your automation journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Proven track record of delivering measurable results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
