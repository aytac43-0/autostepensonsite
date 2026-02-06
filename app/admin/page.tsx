'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, Activity } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, revenue: 0, activeSubs: 0 })
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchStats = async () => {
            // 1. Total Users
            const { count: userCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // 2. Active Subs
            const { count: subCount } = await supabase
                .from('user_products')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'active')

            // 3. Revenue (Mock sum for demo)
            const { data: payments } = await supabase
                .from('payments')
                .select('amount')

            const revenue = payments?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0

            setStats({
                users: userCount || 0,
                revenue: revenue,
                activeSubs: subCount || 0
            })
        }
        fetchStats()
    }, [supabase])

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-100">System Overview</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-slate-900 border-red-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.users}</div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-red-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${stats.revenue}</div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-red-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Subscriptions</CardTitle>
                        <Activity className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.activeSubs}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
