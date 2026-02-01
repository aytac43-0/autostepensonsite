'use client'

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from 'next/navigation'
import { 
  ShoppingBag, Plus, Trash2, Copy, 
  Loader2, RefreshCw
} from 'lucide-react' 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Product {
  id: number
  name: string
  category: string
  price: number
  product_code: string // YENİ: Artık kodumuz bu
}

function AdminContent() {
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
   
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' })
  const [isAdding, setIsAdding] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (activeTab === 'products') fetchProducts()
  }, [activeTab])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false }) // En son eklenen en üste gelsin

    if (error) console.error('Hata:', error)
    else setProducts((data as any) || [])
    setLoading(false)
  }

  // --- RASTGELE KARMAŞIK KOD ÜRETİCİ ---
  const generateLicenseCode = () => {
    // Örnek çıktı: xk92-mpsl-10kd-zm41
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) result += '-'; // Her 4 karakterde bir tire koy
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) return
    
    // Otomatik kod üret
    const randomCode = generateLicenseCode()

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          product_code: randomCode // Veritabanına bu kodu yazıyoruz
        }
      ] as any)

      if (error) throw error
      setNewProduct({ name: '', category: '', price: '' })
      setIsAdding(false)
      fetchProducts()
    } catch (error: any) {
      setErrorMsg(error.message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istiyor musunuz?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) fetchProducts()
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Kopyalandı: ${code}`)
  }

  // --- SADECE ÜRÜNLER SEKMESİ ---
  if (activeTab === 'products') {
    return (
      <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-purple-500"/> Ürünler & Kodlar
                </h2>
                <p className="text-slate-400">Ürünler artık özel lisans anahtarlarıyla oluşturuluyor.</p>
            </div>
            <Button onClick={() => setIsAdding(!isAdding)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2"/> Yeni Ürün
            </Button>
        </div>

        {isAdding && (
            <Card className="bg-slate-800 border-purple-500/50 mb-6">
                <CardHeader><CardTitle className="text-white">Yeni Hizmet Oluştur</CardTitle></CardHeader>
                <CardContent>
                    {errorMsg && <p className="text-red-400 mb-2 text-sm">{errorMsg}</p>}
                    <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2"><Label className="text-slate-300">Ürün Adı</Label><Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} /></div>
                        <div className="space-y-2"><Label className="text-slate-300">Kategori</Label><Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} /></div>
                        <div className="space-y-2"><Label className="text-slate-300">Fiyat (₺)</Label><Input type="number" className="bg-slate-900 border-slate-700 text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} /></div>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">Oluştur & Kod Üret</Button>
                    </form>
                </CardContent>
            </Card>
        )}

        {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin text-purple-500 w-8 h-8"/></div>
        ) : (
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                            <tr>
                                <th className="p-4 pl-6">Özel Ürün Kodu</th>
                                <th className="p-4">Ürün Adı</th>
                                <th className="p-4">Fiyat</th>
                                <th className="p-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded font-mono font-bold text-xs tracking-wider border border-purple-500/20">
                                                {p.product_code || `AUTO-${p.id}`} {/* Eskiler bozulmasın diye */}
                                            </span>
                                            <button onClick={() => copyCode(p.product_code)} className="text-slate-400 hover:text-white ml-2" title="Kopyala">
                                                <Copy className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white font-medium">
                                        {p.name}
                                        <div className="text-xs text-slate-500">{p.category}</div>
                                    </td>
                                    <td className="p-4 text-white font-bold">{p.price.toLocaleString()} ₺</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        )}
      </div>
    )
  }

  // Diğer sekmeler (Overview vb.) şimdilik boş dönsün veya önceki kodun aynısı kalsın
  return <div className="p-8 text-white">Yükleniyor...</div>
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Yükleniyor...</div>}>
      <AdminContent />
    </Suspense>
  )
}
