import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden">
      
      {/* Logo Alanı */}
      <div className="relative group mb-8">
        {/* Dış parlama efekti */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        {/* İçerideki kutu - YENİ: [perspective:1000px] sınıfı eklendi */}
        <div className="relative bg-slate-900/90 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-xl ring-1 ring-white/10 flex items-center justify-center [perspective:1000px]">
           
           {/* YENİ: animate-spin-3d sınıfı ile 3D dönüş */}
           <Image
             src="/favicon.png" 
             alt="Autostep Logo"
             width={56} 
             height={56} 
             className="animate-spin-3d object-contain"
             priority
           />
           
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-blue-100 mb-6 drop-shadow-2xl tracking-tight">
        Autostep
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
        İşletmeniz için yapay zeka destekli otomasyon çözümleri. <br/>
        <span className="text-purple-400/90 font-medium">Geleceği bugün inşa etmeye başlayın.</span>
      </p>

      {/* BUTONLAR */}
      <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto z-20">
        <Link 
          href="/login" 
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
        >
           <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -translate-x-full"></div>
           <span>Giriş Yap</span>
           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link 
          href="/signup" 
          className="group relative px-8 py-4 bg-slate-900/40 hover:bg-slate-800/60 text-white rounded-xl font-bold backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <span className="bg-gradient-to-r from-white to-slate-300 group-hover:from-purple-200 group-hover:to-blue-200 bg-clip-text text-transparent transition-all">
            Hesap Oluştur
          </span>
        </Link>
      </div>

      <div className="absolute bottom-8 text-xs text-slate-600 font-medium tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
        © 2026 Autostep AI Solutions
      </div>
    </div>
  )
}
