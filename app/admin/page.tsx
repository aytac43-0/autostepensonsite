'use client'

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from 'next/navigation'
import { 
  ShoppingBag, Plus, Edit2, Trash2, Save, X, Copy, 
  LayoutDashboard, FileText, Database, Users, Loader2 
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
}

function AdminContent() {
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  // URL'den hangi sekmede olduğumuzu okuyoruz (Varsayılan: overview)
  const activeTab = searchParams.get('tab') || 'overview'
   
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' })
  const [isAdding, setIsAdding] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Sadece Ürünler sekmesindeysek verileri çek
  useEffect(() => {
    if (activeTab === 'products') {
        fetchProducts()
    }
  }, [activeTab])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }) 

    if (error) console.error('Hata:', error)
    else setProducts((data as any) || [])
    setLoading(false)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) return
    
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price)
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

  const copyCode = (id: number) => {
    navigator.clipboard.writeText(`AUTO-${id}`)
    alert(`Kopyalandı: AUTO-${id}`)
  }

  // --- 1. SEKME: YÖNETİM MERKEZİ (OVERVIEW) ---
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8 text-white animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Toplam Müşteri</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-white">128</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Bekleyen Talepler</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-yellow-500">5</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Aktif Ürünler</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-purple-500">8</div></CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // --- 2. SEKME: ÜRÜNLER & HİZMETLER (PRODUCTS) ---
  if (activeTab === 'products') {
    return (
      <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-purple-500"/> Ürünler & Hizmetler
                </h2>
                <p className="text-slate-400">Müşteri için 'Kopyala' butonunu kullanın.</p>
            </div>
            <Button onClick={() => setIsAdding(!isAdding)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2"/> Yeni Ürün
            </Button>
        </div>

        {/* Ekleme Formu */}
        {isAdding && (
            <Card className="bg-slate-800 border-purple-500/50 mb-6">
                <CardHeader><CardTitle className="text-white">Yeni Hizmet Oluştur</CardTitle></CardHeader>
                <CardContent>
                    {errorMsg && <p className="text-red-400 mb-2 text-sm">{errorMsg}</p>}
                    <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Ürün Adı</Label>
                            <Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Kategori</Label>
                            <Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Fiyat (₺)</Label>
                            <Input type="number" className="bg-slate-900 border-slate-700 text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                        </div>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">Kaydet</Button>
                    </form>
                </CardContent>
            </Card>
        )}

        {/* Ürün Tablosu */}
        {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin text-purple-500 w-8 h-8"/></div>
        ) : (
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                            <tr>
                                <th className="p-4 pl-6">Ürün Kodu</th>
                                <th className="p-4">Ürün Adı</th>
                                <th className="p-4">Kategori</th>
                                <th className="p-4">Fiyat</th>
                                <th className="p-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {products.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-slate-500">Ürün yok.</td></tr>}
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono font-bold text-xs">
                                                AUTO-{p.id}
                                            </span>
                                            <button onClick={() => copyCode(p.id)} className="text-slate-400 hover:text-white" title="Kopyala">
                                                <Copy className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white font-medium">{p.name}</td>
                                    <td className="p-4"><span className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700">{p.category || '-'}</span></td>
                                    <td className="p-4 text-white font-bold">{p.price.toLocaleString()} ₺</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
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

  // --- 3. SEKME: DOSYA VE DİĞERLERİ (GÖRSEL ŞABLON) ---
  if (activeTab === 'files') {
     return (
        <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Database className="w-6 h-6 text-blue-500"/> Dosya & Veri Kasası</h2>
            <div className="p-12 border border-dashed border-slate-700 rounded-xl text-center text-slate-500 bg-slate-800/50">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                <p>Müşteri dosyaları burada listelenecek.</p>
            </div>
        </div>
     )
  }

  // --- VARSAYILAN BOŞ ---
  return <div className="p-8 text-white">Yükleniyor...</div>
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Yükleniyor...</div>}>
      <AdminContent />
    </Suspense>
  )
}
