'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Bot, BarChart3, Workflow, Zap, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/landing/navbar'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">Yapay Zeka Çağı Başladı</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-slate-400">
            İşletmenizi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Yapay Zeka ile Ölçekleyin</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Autostep, yeni nesil otomasyon çözümleriyle iş süreçlerinizi hızlandırır,
            maliyetlerinizi düşürür ve verimliliğinizi maksimize eder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/25">
                Hemen Başla <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 text-white">
                Çözümlerimiz
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Abstract Grid Animation Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 w-full relative h-[400px] border border-white/5 rounded-3xl bg-black/20 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-slate-500 text-sm font-mono">[Interactive 3D Grid Animation Visualization]</div>
          </div>
          {/* Decorative active nodes */}
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
          />
        </motion.div>
      </section>

      {/* Services Section (Bento Grid) */}
      <section id="services" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Hizmetlerimiz</h2>
          <p className="text-slate-400">Geleceğin teknolojileri bugünün iş süreçlerinde.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Card 1: n8n Automation (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-600/20"></div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Uçtan Uca Otomasyon</h3>
              <p className="text-slate-400 max-w-md">n8n ve Make.com altyapıları ile CRM, E-posta ve Pazarlama süreçlerinizi birbirine bağlayın. Tekrarlayan işleri robotlara devredin.</p>
            </div>
            <div className="flex gap-2 mt-4">
              {['Zapier', 'n8n', 'Make'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: AI Chatbots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Asistanlar</h3>
              <p className="text-slate-400 text-sm">Müşterilerinize 7/24 destek veren, öğrenen ve satış yapabilen akıllı Chatbotlar.</p>
            </div>
          </motion.div>

          {/* Card 3: Data Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Veri Analitiği</h3>
              <p className="text-slate-400 text-sm">Büyük verinizi anlamlı içgörülere dönüştürün. Karar alma süreçlerinizi optimize edin.</p>
            </div>
          </motion.div>

          {/* Card 4: Custom Dev (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Özel Yazılım Çözümleri</h3>
                <p className="text-slate-400 max-w-sm">İhtiyacınıza özel, ölçeklenebilir SaaS ve Web uygulamaları geliştiriyoruz.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['React', 'Next.js', 'Python', 'Supabase'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Dönüşüme Hazır mısınız?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              İşletmenizi bir sonraki seviyeye taşımak için bugün bir adım atın.
              Ücretsiz ön görüşme ile ihtiyaçlarınızı belirleyelim.
            </p>
            <Link href="/signup">
              <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-200">
                Demo Talep Et
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm relative z-10">
        <p>&copy; 2024 Autostep. All rights reserved.</p>
      </footer>
    </div>
  )
}
