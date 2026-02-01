'use client'

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from 'next/navigation'
import { 
  ShoppingBag, Plus, Trash2, Copy, 
  Loader2, LayoutDashboard, FileText, Database, Users, 
  ArrowUpRight, Clock, CheckCircle2, XCircle
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
  product_code: string 
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
    // Sadece ürünler sekmesindeysek verileri çek
    if (activeTab === 'products') fetchProducts()
  }, [activeTab])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false }) 

    if (error) console.error('Hata:', error)
    else setProducts((data as any) || [])
    setLoading(false)
  }

  // LİSANS KODU ÜRETİCİSİ
  const generateLicenseCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) result += '-';
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) return
    
    const randomCode = generateLicenseCode()

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          product_code: randomCode 
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

  // --- 1. SEKME: YÖNETİM MERKEZİ (OVERVIEW) ---
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8 text-white animate-in fade-in duration-500">
        <div>
            <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
            <p className="text-slate-400">Hoş geldiniz, sistem durumu stabil.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-colors">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-400 text-sm font-medium">Toplam Ciro</CardTitle>
                  <ArrowUpRight className="w-4 h-4 text-green-500"/>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl font-bold text-white">₺42,500</div>
                  <p className="text-xs text-green-500 mt-1">+%12 geçen aydan</p>
              </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-400 text-sm font-medium">Aktif Müşteriler</CardTitle>
                  <Users className="w-4 h-4 text-blue-500"/>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl font-bold text-white">128</div>
                  <p className="text-xs text-slate-500 mt-1">Son 7 günde +5 yeni</p>
              </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500/50 transition-colors">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-400 text-sm font-medium">Bekleyen Talepler</CardTitle>
                  <Clock className="w-4 h-4 text-yellow-500"/>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">3</div>
                  <p className="text-xs text-slate-500 mt-1">İşlem bekleniyor</p>
              </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // --- 2. SEKME: ÜRÜNLER (PRODUCTS) ---
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
                                <th className="p-4 pl-6">ÖZEL ÜRÜN KODU</th>
                                <th className="p-4">ÜRÜN ADI</th>
                                <th className="p-4">FİYAT</th>
                                <th className="p-4 text-right">İŞLEM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded font-mono font-bold text-xs tracking-wider border border-purple-500/20">
                                                {p.product_code || `AUTO-${p.id}`}
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

  // --- 3. SEKME: MÜŞTERİ TALEPLERİ (REQUESTS) ---
  if (activeTab === 'requests') {
    return (
        <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-yellow-500"/> Müşteri Talepleri
                </h2>
                <p className="text-slate-400">Müşterilerden gelen siparişler ve özel istekler.</p>
            </div>

            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                        <tr>
                            <th className="p-4">Müşteri</th>
                            <th className="p-4">Talep Edilen Hizmet</th>
                            <th className="p-4">Tarih</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {/* DEMO VERİLER */}
                        <tr className="hover:bg-slate-700/50">
                            <td className="p-4 font-medium text-white">Ahmet Yılmaz</td>
                            <td className="p-4">Instagram Bot Kurulumu</td>
                            <td className="p-4 text-slate-400">Bugün, 14:30</td>
                            <td className="p-4"><span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs border border-yellow-500/20">Bekliyor</span></td>
                            <td className="p-4 text-right"><Button size="sm" variant="secondary">İncele</Button></td>
                        </tr>
                        <tr className="hover:bg-slate-700/50">
                            <td className="p-4 font-medium text-white">Ayşe Demir</td>
                            <td className="p-4">SEO Analizi</td>
                            <td className="p-4 text-slate-400">Dün, 09:15</td>
                            <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs border border-green-500/20">Tamamlandı</span></td>
                            <td className="p-4 text-right"><Button size="sm" variant="ghost">Arşiv</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
    )
  }

  // --- 4. SEKME: DOSYA KASASI (FILES) ---
  if (activeTab === 'files') {
     return (
        <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Database className="w-6 h-6 text-blue-500"/> Dosya & Veri Kasası
                </h2>
                <p className="text-slate-400">Sistemdeki dosyalar ve yedekler.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                    <Card key={i} className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-blue-500">
                                <FileText className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Müşteri_Listesi_{i}.xlsx</h3>
                                <p className="text-xs text-slate-400">2.4 MB • 12 Ara 2025</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
     )
  }
    
    // --- 5. SEKME: MÜŞTERİLER (USERS) ---
  if (activeTab === 'users') {
     return (
        <div className="p-8 space-y-6 text-white animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-green-500"/> Müşteri Listesi
            </h2>
            <Card className="bg-slate-800 border-slate-700 p-8 text-center text-slate-400">
                <p>Müşteri veritabanı bağlantısı hazırlanıyor...</p>
            </Card>
        </div>
     )
  }

  return <div className="p-8 text-white">Yükleniyor...</div>
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Yükleniyor...</div>}>
      <AdminContent />
    </Suspense>
  )
}
