'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [newProduct, setNewProduct] = useState({ name: '', internal_code: '', price: 0, is_subscription: true })
    const supabase = createClientComponentClient()
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false)

    const fetchProducts = useCallback(async () => {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data) setProducts(data)
    }, [supabase])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const handleCreate = async () => {
        const { error } = await supabase.from('products').insert(newProduct)

        if (error) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        } else {
            toast({ title: "Success", description: "Product created." })
            setIsOpen(false)
            fetchProducts()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-100">Product Catalog</h1>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-red-600 hover:bg-red-700">
                            <Plus className="w-4 h-4 mr-2" /> New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-red-900/20 text-white">
                        <DialogHeader>
                            <DialogTitle>Create New Product</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Product Name</Label>
                                <Input
                                    className="bg-slate-950 border-red-900/20"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Internal Code (Unique)</Label>
                                <Input
                                    className="bg-slate-950 border-red-900/20"
                                    value={newProduct.internal_code}
                                    onChange={e => setNewProduct({ ...newProduct, internal_code: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Price (USD)</Label>
                                <Input
                                    type="number"
                                    className="bg-slate-950 border-red-900/20"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                />
                            </div>
                            <Button className="w-full bg-red-600 hover:bg-red-700 mt-4" onClick={handleCreate}>
                                Create Product
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border border-red-900/20 bg-slate-900 overflow-hidden">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="bg-slate-950 text-slate-200">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-red-900/10">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-slate-800/50">
                                <td className="p-4 font-medium text-white">{p.name}</td>
                                <td className="p-4 font-mono text-xs">{p.internal_code}</td>
                                <td className="p-4">${p.price}</td>
                                <td className="p-4">{p.is_subscription ? 'Subscription' : 'One-time'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
