'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Supabase bağlantısı birazdan
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    // DÜZELTME BURADA: min-h-screen ile tam ortaya hizalıyoruz
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-10">
      
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-block mb-4 hover:scale-105 transition-transform">
            <div className="relative w-14 h-14 mx-auto bg-slate-800/50 rounded-xl flex items-center justify-center border border-white/10">
                <Image src="/cube.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
            Aramıza Katıl
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            30 saniyede ücretsiz hesabını oluştur.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Ad Soyad</label>
            <div className="relative group/input">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Adınız Soyadınız"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">E-posta</label>
            <div className="relative group/input">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
              <input 
                type="email" 
                placeholder="ornek@email.com"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Şifre</label>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="En az 6 karakter"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
                minLength={6}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Hesap Oluştur"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Zaten hesabın var mı?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  )
}
