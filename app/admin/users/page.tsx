'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Shield, Ban } from 'lucide-react'
import { AccessService } from '@/lib/access'
import { useToast } from "@/hooks/use-toast"

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const supabase = createClientComponentClient()
    const accessService = new AccessService(supabase)
    const { toast } = useToast()

    const fetchUsers = useCallback(async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setUsers(data)
    }, [supabase])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // NOTE: In a real app, products would be fetched dynamically. 
    // For this architect demo, we assume a "Standard Plan" product ID exists.
    // We'll need to fetch products first to make this useful.

    const grantAccess = async (userId: string) => {
        // 1. Get the first available product just for demo purposes
        const { data: products } = await supabase.from('products').select('id').limit(1)
        if (!products?.length) {
            toast({ variant: "destructive", title: "No products found", description: "Create a product first." })
            return
        }

        const { error } = await accessService.grantAccess(userId, products[0].id, 30) // Grant 30 days

        if (error) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        } else {
            toast({ title: "Access Granted", description: "User given 30 days access." })
        }
    }

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-100">User Management</h1>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                    placeholder="Search users..."
                    className="pl-10 bg-slate-900 border-red-900/20 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-md border border-red-900/20 bg-slate-900 overflow-hidden">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="bg-slate-950 text-slate-200">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-red-900/10">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/50">
                                <td className="p-4">
                                    <div className="font-medium text-white">{user.full_name}</div>
                                    <div className="text-xs text-slate-500">{user.email}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-900/50 text-red-200' : 'bg-slate-800 text-slate-300'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Button size="sm" variant="outline" className="border-green-900 text-green-500 hover:bg-green-900/20" onClick={() => grantAccess(user.id)}>
                                        <Shield className="w-3 h-3 mr-1" /> Grant Access
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-red-900 text-red-500 hover:bg-red-900/20">
                                        <Ban className="w-3 h-3 mr-1" /> Ban
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
