'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Copy, Trash2, Plus, LogOut } from 'lucide-react' 

interface Product {
  id: number
  name: string
  category: string
  price: number
}

export default function AdminPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
   
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' })
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }) 

    if (error) {
      console.error('Hata:', error)
    } else {
      setProducts((data as any) || [])
    }
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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
         
        <div className="flex justify-between items-center mb-8">
          {/* BAŞLIĞI DEĞİŞTİRDİM Kİ GÜNCELLENDİĞİNİ ANLAYALIM */}
          <h1 className="text-3xl font-bold text-indigo-700">YÖNETİM PANELİ (GÜNCELLENDİ)</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 font-medium">
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>

        {/* Ekleme Formu */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5"/> Yeni Ürün
          </h2>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Ürün Adı" className="border p-2 rounded" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Kategori" className="border p-2 rounded" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <input type="number" placeholder="Fiyat" className="border p-2 rounded" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">Ekle</button>
          </form>
        </div>

        {/* Tablo */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Ürün Kodu</th> {/* BURADA */}
                <th className="p-4">Ürün Adı</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <button onClick={() => copyCode(product.id)} className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-mono font-bold hover:bg-purple-200">
                      AUTO-{product.id}
                    </button>
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.price} ₺</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(product.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
