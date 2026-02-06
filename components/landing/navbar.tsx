"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();

  // Import imports needs to be added as well, but this tool handles chunks.
  // I will need another replace for imports if not present.
  // Assuming imports are needed, I'll use multi_replace or sequential replaces.
  // Let's do imports first in a separate call or just trust users prompt if I can edit file head.

  // Wait, I can't easily see if imports are there without reading.
  // I'll assume I need to add imports.

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Autostep</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#services" className="text-gray-300 hover:text-purple-400 transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
              {t("nav.contact")}
            </Link>
            <button
              onClick={() => setLanguage(language === "en" ? "tr" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/50 hover:bg-card transition-colors text-gray-300 hover:text-purple-400 border border-border"
              title={language === "en" ? "Türkçe" : "English"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "TR" : "EN"}</span>
            </button>
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border border-red-500/20"
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    {t("nav.getStarted")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            <Link
              href="#services"
              className="block text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/contact"
              className="block text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
            <button
              onClick={() => {
                setLanguage(language === "en" ? "tr" : "en");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-gray-300 hover:text-purple-400 border border-border"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Türkçe" : "English"}</span>
            </button>
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-300">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    const { supabase } = await import('@/lib/supabase');
                    await supabase.auth.signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-300">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    {t("nav.getStarted")}
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
