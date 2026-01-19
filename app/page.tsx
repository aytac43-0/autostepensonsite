import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
