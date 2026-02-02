import Link from 'next/link'
import { ArrowRight, Box } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      
      {/* Basit bir Logo/İkon */}
      <div className="bg-slate-800/50 p-4 rounded-2xl mb-8 border border-slate-700 backdrop-blur-sm">
        <Box className="w-12 h-12 text-purple-500" />
      </div>

      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-slate-400 mb-6">
        Autostep
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        İşletmeniz için yapay zeka destekli otomasyon çözümleri. 
        Geleceği bugün inşa etmeye başlayın.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/login" 
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
        >
          Giriş Yap <ArrowRight className="w-4 h-4" />
        </Link>
        
        <Link 
          href="/register" 
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-medium transition-all"
        >
          Hesap Oluştur
        </Link>
      </div>

      {/* Footer benzeri alt bilgi */}
      <div className="absolute bottom-8 text-sm text-slate-600">
        © 2024 Autostep AI Solutions
      </div>
    </div>
  )
}
