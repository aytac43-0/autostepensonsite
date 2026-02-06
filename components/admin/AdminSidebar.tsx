'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Users,
    Package,
    CreditCard,
    Activity,
    ChevronLeft,
    ChevronRight,
    ShieldAlert
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminItems = [
    { icon: Activity, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Kullanıcılar', href: '/admin/users' },
    { icon: Package, label: 'Ürünler', href: '/admin/products' },
    { icon: CreditCard, label: 'Ödemeler', href: '/admin/payments' },
]

export function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                "h-screen bg-slate-950 border-r border-red-900/20 transition-all duration-300 relative flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="h-20 flex items-center justify-center border-b border-red-900/20 bg-red-950/10">
                <Link href="/admin" className="flex items-center gap-2">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                    {!collapsed && (
                        <span className="font-bold text-lg text-red-100">
                            ADMIN
                        </span>
                    )}
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {adminItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                                isActive
                                    ? "bg-red-900/20 text-red-200"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-red-400" : "text-slate-500")} />

                            {!collapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-900 text-center">
                {!collapsed && <span className="text-xs text-slate-600">SaaS Architect Mode</span>}
            </div>
        </aside>
    )
}
