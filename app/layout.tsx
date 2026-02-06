import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Autostep | AI Automation Agency',
  description: 'Enterprise-grade AI automation solutions for modern businesses.',
  // Keeping the icons from the original document as the provided "Code Edit" was malformed in this section.
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} min-h-screen bg-transparent text-white antialiased`}>

        {/* Tüm siteyi Dil Sağlayıcısı ile sarmalıyoruz */}
        <LanguageProvider>
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
          <Toaster />
        </LanguageProvider>

      </body>
    </html>
  )
}
