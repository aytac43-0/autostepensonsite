import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import AutomationBackground from './components/AutomationBackground'

const inter = Inter({ subsets: ['latin'] })

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
      {/* DİKKAT: bg-transparent çok önemli! */}
      <body className={`${inter.className} min-h-screen bg-transparent text-white antialiased`}>
        
        {/* Arka Plan Bileşeni */}
        <AutomationBackground />
        
        <main className="relative z-10 flex flex-col min-h-screen">
           {children}
        </main>
        
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  )
}
