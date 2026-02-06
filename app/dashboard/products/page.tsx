'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Search, ShoppingBag, Check } from 'lucide-react'

export default function ProductSearchPage() {
    const [internalCode, setInternalCode] = useState('')
    const [product, setProduct] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const supabase = createClientComponentClient()
    const { toast } = useToast()

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setProduct(null)

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('internal_code', internalCode)
            .single()

        if (error || !data) {
            toast({
                variant: "destructive",
                title: "Ürün Bulunamadı",
                description: "Girdiğiniz koda ait bir ürün sistemde kayıtlı değil.",
            })
        } else {
            setProduct(data)
        }
        setIsLoading(false)
    }

    const handlePurchase = async () => {
        setIsBuying(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (user && product) {
            const { error } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    product_id: product.id,
                    status: 'pending' // Default status
                })

            if (error) {
                toast({
                    variant: "destructive",
                    title: "İşlem Başarısız",
                    description: "Sipariş oluşturulurken bir hata oluştu.",
                })
            } else {
                toast({
                    title: "Sipariş Alındı!",
                    description: `${product.name} için talebiniz başarıyla oluşturuldu.`,
                })
                setInternalCode('')
                setProduct(null)
            }
        }
        setIsBuying(false)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Özel Ürün Sorgulama</h1>
                <p className="text-slate-400">Size özel tanımlanan kodu girerek projenize erişin.</p>
            </div>

            <Card className="bg-zinc-900/50 border-white/5 p-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <Input
                            placeholder="Ürün Kodu (örn: AUTO-2024-X)"
                            className="pl-10 bg-black/20 border-white/10 h-12 text-lg"
                            value={internalCode}
                            onChange={(e) => setInternalCode(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12 px-8 bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                        {isLoading ? "Aranıyor..." : "Sorgula"}
                    </Button>
                </form>
            </Card>

            {product && (
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-purple-500/30 shadow-2xl shadow-purple-900/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>

                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl text-white">{product.name}</CardTitle>
                                <CardDescription className="text-lg mt-1 text-purple-400 font-medium">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
                                </CardDescription>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-1">
                                <Check className="w-3 h-3" /> Müsait
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-400 leading-relaxed">{product.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-slate-500">Otomasyon</span>
                            <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-slate-500">AI Entegrasyonu</span>
                            <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-slate-500">7/24 Destek</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full h-12 text-lg bg-white text-black hover:bg-slate-200"
                            onClick={handlePurchase}
                            disabled={isBuying}
                        >
                            {isBuying ? "İşleniyor..." : "Hemen Satın Al / Başlat"} <ShoppingBag className="ml-2 w-5 h-5" />
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
