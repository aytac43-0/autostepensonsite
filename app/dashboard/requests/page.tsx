'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Request = {
    id: string
    title: string
    description: string
    status: 'pending' | 'in_progress' | 'completed' | 'rejected'
    priority: 'low' | 'medium' | 'high'
    created_at: string
}

export default function RequestsPage() {
    const [requests, setRequests] = useState<Request[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchRequests = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('automation_requests')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (data) setRequests(data)
            }
            setIsLoading(false)
        }
        fetchRequests()
    }, [supabase])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            completed: "bg-green-500/10 text-green-400 border-green-500/20",
            rejected: "bg-red-500/10 text-red-400 border-red-500/20",
        }
        // @ts-ignore
        return <Badge variant="outline" className={styles[status] || ""}>{status.replace('_', ' ').toUpperCase()}</Badge>
    }

    if (isLoading) {
        return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Otomasyon Talepleri</h1>
                <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" /> Yeni Talep
                </Button>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                    <FileText className="w-12 h-12 mx-auto text-slate-500 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300">Henüz bir talep oluşturmadınız</h3>
                    <p className="text-slate-500">İşletmenizi otomatize etmeye başlamak için sağ üstteki butonu kullanın.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-slate-400">
                                <tr>
                                    <th className="p-4 font-medium">Başlık</th>
                                    <th className="p-4 font-medium">Öncelik</th>
                                    <th className="p-4 font-medium">Durum</th>
                                    <th className="p-4 font-medium">Oluşturulma Tarihi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white">{req.title}</td>
                                        <td className="p-4">
                                            <span className={`text-xs px-2 py-1 rounded-full ${req.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                                    req.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {req.priority.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4">{getStatusBadge(req.status)}</td>
                                        <td className="p-4 text-slate-400">{formatDate(req.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
