'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/hooks/use-toast"

// ... imports

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Giriş Başarılı",
        description: "Yönlendiriliyorsunuz...",
      })

      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Giriş Başarısız",
        description: error.message || "E-posta veya şifre hatalı.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // DÜZELTME BURADA: min-h-screen ile tam ortaya hizalıyoruz
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 hover:scale-105 transition-transform">
            <div className="relative w-16 h-16 mx-auto bg-slate-800/50 rounded-xl flex items-center justify-center border border-white/10">
              <Image src="/cube.png" alt="Logo" width={40} height={40} className="object-contain" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Tekrar Hoşgeldiniz
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Otomasyon dünyasına giriş yapın
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">E-posta Adresi</label>
            <div className="relative group/input">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="ornek@sirket.com"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">Şifre</label>
              <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Şifremi Unuttum?
              </Link>
            </div>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Giriş Yap <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500">Veya şununla devam et</span>
          </div>
        </div>

        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-3 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="group-hover:text-white/90">Google ile Giriş Yap</span>
        </button>

        <div className="mt-8 text-center text-sm text-slate-500">
          Hesabın yok mu?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all">
            Hemen Kayıt Ol
          </Link>
        </div>

      </div>
    </div>
  )
}
