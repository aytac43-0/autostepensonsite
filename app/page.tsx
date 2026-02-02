import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
// YENİ: Animasyon bileşenini çağırıyoruz
import AutomationBackground from '@/components/AutomationBackground'

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
      {/* bg-transparent yapıyoruz ki arkadaki animasyon görünsün */}
      <body className={`${inter.className} min-h-screen bg-transparent text-white`}>
        
        {/* YENİ: Animasyon bileşeni buraya eklendi */}
        <AutomationBackground />
        
        <main className="relative z-10 min-h-screen flex flex-col">
           {children}
        </main>
        
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  )
}
