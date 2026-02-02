import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import AutomationBackground from './components/AutomationBackground'

// 1. DÜZELTME: Klasör adı 'contexts' (çoğul) olduğu için yolu düzelttik.
import { LanguageProvider } from '@/contexts/LanguageContext' 

const inter = Inter({ subsets: ['latin'] })

// Build hatalarını önlemek için dinamik render modu
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Autostep',
  description: 'Otomasyon Çözümleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} min-h-screen bg-transparent text-white antialiased`}>
        
        {/* 2. ADIM: Tüm siteyi LanguageProvider ile sarmalıyoruz */}
        <LanguageProvider>
          
          {/* Arka Plan */}
          <AutomationBackground />
          
          <main className="relative z-10 flex flex-col min-h-screen">
             {children}
          </main>
          
          <Toaster position="top-center" theme="dark" />
          
        </LanguageProvider>

      </body>
    </html>
  )
}
