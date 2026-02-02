import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

// DİKKAT: Burası './components' olmalı (layout ile components yan yana olduğu için)
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
      <body className={`${inter.className} min-h-screen bg-transparent text-white antialiased`}>
        {/* Arka plan burada çalışacak */}
        <AutomationBackground />
        
        <main className="relative z-10 flex flex-col min-h-screen">
           {children}
        </main>
        
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  )
}
