'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, FolderOpen } from 'lucide-react'

type Project = {
    id: string
    name: string
    description: string
    status: 'active' | 'paused' | 'completed'
    webhook_url?: string
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchProjects = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (data) setProjects(data)
            }
            setIsLoading(false)
        }
        fetchProjects()
    }, [supabase])

    if (isLoading) {
        return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projelerim</h1>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                    <FolderOpen className="w-12 h-12 mx-auto text-slate-500 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300">Henüz bir projeniz yok</h3>
                    <p className="text-slate-500">Yeni bir otomasyon talebi oluşturarak başlayın.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="bg-zinc-900/50 border-white/5 hover:border-purple-500/30 transition-all group">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl group-hover:text-purple-400 transition-colors">{project.name}</CardTitle>
                                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}
                                        className={
                                            project.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                project.status === 'paused' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                    'bg-slate-800 text-slate-400'
                                        }
                                    >
                                        {project.status.toUpperCase()}
                                    </Badge>
                                </div>
                                <CardDescription>{project.description || "Açıklama yok"}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {project.webhook_url && (
                                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-xs text-slate-400 break-all">
                                        {project.webhook_url}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
