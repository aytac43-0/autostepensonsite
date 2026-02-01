'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// Basit tip tanımı (UI için)
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

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetchProducts()
  }, [])

  // Ürünleri Listele
  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Veri çekme hatası:', error)
    } else {
      setProducts((data as any) || [])
    }
    setLoading(false)
  }

  // Yeni Ürün Ekle (HATA DÜZELTİLEN KISIM BURADA)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) {
      setErrorMsg('Lütfen isim ve fiyat alanlarını doldurun.')
      return
    }

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price)
        }
      ] as any) // <--- HATA ÇÖZÜMÜ: 'as any' eklendi.

      if (error) throw error

      // Başarılıysa formu temizle ve listeyi yenile
      setNewProduct({ name: '', category: '', price: '' })
      setErrorMsg('')
      fetchProducts()
    } catch (error: any) {
      console.error('Ekleme hatası:', error)
      setErrorMsg('Ürün eklenirken bir hata oluştu: ' + error.message)
    }
  }

  // Ürün Sil
  const handleDelete = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğine emin misin?')) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Silme hatası!')
    } else {
      fetchProducts()
    }
  }

  // Çıkış Yap
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Başlık ve Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yönetim Paneli</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Ürün Ekleme Formu */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Yeni Ürün Ekle</h2>
          {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>}
          
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Ürün Adı"
              className="border p-2 rounded"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Kategori"
              className="border p-2 rounded"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Fiyat"
              className="border p-2 rounded"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Ekle
            </button>
          </form>
        </div>

        {/* Ürün Listesi Tablosu */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Ürün Adı</th>
                <th className="p-4 font-semibold text-gray-600">Kategori</th>
                <th className="p-4 font-semibold text-gray-600">Fiyat</th>
                <th className="p-4 font-semibold text-gray-600 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">Henüz ürün eklenmemiş.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4 text-gray-600">{product.category || '-'}</td>
                    <td className="p-4 font-mono">{product.price} ₺</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
