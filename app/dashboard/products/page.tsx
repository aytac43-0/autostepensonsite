'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Search, ShoppingBag, Check, Lock, Unlock } from 'lucide-react'
import { AccessService } from '@/lib/access'

export default function ProductSearchPage() {
    const [internalCode, setInternalCode] = useState('')
    const [product, setProduct] = useState<any>(null)
    const [access, setAccess] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBuying, setIsBuying] = useState(false)

    const supabase = createClientComponentClient()
    const accessService = new AccessService(supabase)
    const { toast } = useToast()

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setProduct(null)
        setAccess(null)

        // 1. Find Product
        const { data: foundProduct, error } = await supabase
            .from('products')
            .select('*')
            .eq('internal_code', internalCode)
            .single()

        if (error || !foundProduct) {
            toast({
                variant: "destructive",
                title: "Ürün Bulunamadı",
                description: "Girdiğiniz koda ait bir ürün sistemde kayıtlı değil.",
            })
            setIsLoading(false)
            return
        }

        setProduct(foundProduct)

        // 2. Check Access
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const accessResult = await accessService.checkAccess(user.id, foundProduct.id)
            setAccess(accessResult)
        }

        setIsLoading(false)
    }

    const handlePurchase = async () => {
        setIsBuying(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user || !product) return

        // MOCK PAYMENT FLOW
        // In a real app, this would be Stripe/LemonSqueezy checkout

        // 1. Create Payment Record
        const { error: payError } = await supabase.from('payments').insert({
            user_id: user.id,
            product_id: product.id,
            amount: product.price,
            status: 'paid'
        })

        if (payError) {
            toast({ variant: "destructive", title: "Ödeme Hatası", description: payError.message })
            setIsBuying(false)
            return
        }

        // 2. Grant Access via AccessService (Simulating server-side grant)
        // NOTE: In production, this should be a webhook from Stripe calling an Admin API.
        // Here we rely on the RLS policy "System can insert payments" and a trigger or direct client call (if allowed).
        // Wait, the client CANNOT strictly call grantAccess due to RLS if not admin.
        // ACTUALLY: For this demo architecture, we will use a server action or assume the client has insert right to 'orders' which triggers a function.
        // BUT since we are architecting RLS strictness, regular users shouldn't write to `user_products` directly.

        // WORKAROUND FOR DEMO: 
        // We will assume the `payments` insert triggers a Postgres Function to update `user_products` OR 
        // for this specific demo, we might need to rely on a less strict policy temporarily or simulate it.
        // OPTION: "Users can create their own projects" -> We use 'projects' as a proxy OR we strictly use 'payments'.

        // Let's assume there is a Trigger on 'payments' table that grants access.
        // I will simulate this by checking if payment successful, then manually calling accessService IF RLS allows (it won't).

        // REVISIT: The user asked for "System can insert payments". 
        // Let's try to verify if we can grant access. If RLS blocks, we show a message "Payment recorded, awaiting activation".
        // However, to make it work for the user NOW, I will add a policy to `user_products` allowing INSERT for `auth.uid() = user_id` for purchase simulation.
        // But that breaks strictness.

        // Strict Solution: The 'grantAccess' call should happen via a secure server endpoint.
        // Since we don't have a backend server running, we'll try to execute the following for DEMO purposes:

        const { error: accessError } = await supabase.from('user_products').insert({
            user_id: user.id,
            product_id: product.id,
            status: 'active',
            // 30 days default for demo
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })

        if (accessError) {
            toast({ title: "Ödeme Alındı", description: "Erişim aktivasyonu için yönetici onayı bekleniyor (RLS Protected)." })
        } else {
            toast({ title: "Satın Alma Başarılı!", description: "Ürüne erişiminiz aktif edildi." })
            // Refresh access
            const updatedAccess = await accessService.checkAccess(user.id, product.id)
            setAccess(updatedAccess)
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
                            className="pl-10 bg-black/20 border-white/10 h-12 text-lg text-white"
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
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'USD' }).format(product.price)}
                                </CardDescription>
                            </div>
                            {access?.hasAccess ? (
                                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-1">
                                    <Unlock className="w-3 h-3" /> Erişim Aktif
                                </div>
                            ) : (
                                <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Satın Alınabilir
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-400 leading-relaxed">{product.description || "Açıklama bulunmuyor."}</p>

                        {/* Access Status Details */}
                        {access?.expiresAt && (
                            <div className="mt-4 p-3 bg-white/5 rounded border border-white/10 text-sm text-slate-300">
                                Son Geçerlilik: {new Date(access.expiresAt).toLocaleDateString()}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        {access?.hasAccess ? (
                            <Button
                                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => toast({ title: "Yönlendiriliyor", description: "Panel yükleniyor..." })}
                            >
                                Panele Git <Check className="ml-2 w-5 h-5" />
                            </Button>
                        ) : (
                            <Button
                                className="w-full h-12 text-lg bg-white text-black hover:bg-slate-200"
                                onClick={handlePurchase}
                                disabled={isBuying}
                            >
                                {isBuying ? "İşleniyor..." : "Hemen Satın Al"} <ShoppingBag className="ml-2 w-5 h-5" />
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
