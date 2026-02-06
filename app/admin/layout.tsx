'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [authorized, setAuthorized] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard') // Kick non-admins out
      } else {
        setAuthorized(true)
      }
    }
    checkAdmin()
  }, [supabase, router])

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 font-mono">Verifying Architect Authority...</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto h-screen bg-slate-950">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
