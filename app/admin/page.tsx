'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
// İkonlar
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

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetchProducts()
  }, [])

  // Ürünleri Listele
  const fetchProducts = async () => {
    setLoading(true)
    // ID'ye göre sıralayalım ki kodlar (AUTO-1, AUTO-2) düzenli dursun
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }) 

    if (error) {
      console.error('Veri çekme hatası:', error)
    } else {
      setProducts((data as any) || [])
    }
    setLoading(false)
  }

  // Yeni Ürün Ekle
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
      ] as any)

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

  // Kodu Kopyala Fonksiyonu
  const copyCode = (id: number) => {
    const code = `AUTO-${id}`
    navigator.clipboard.writeText(code)
    alert(`Kopyalandı: ${code}`)
  }

  // Çıkış Yap
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
         
        {/* Başlık ve Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yönetim Paneli (Kod Özelliği Aktif)</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>

        {/* Ürün Ekleme Formu */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Plus className="w-5 h-5"/> Yeni Ürün Ekle
          </h2>
          {errorMsg && <p className="text-red-500 mb-4 text-sm bg-red-50 p-2 rounded">{errorMsg}</p>}
           
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Ürün Adı"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Kategori"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Fiyat"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Kaydet
            </button>
          </form>
        </div>

        {/* Ürün Listesi Tablosu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                {/* BURAYA ÜRÜN KODU BAŞLIĞINI EKLEDİM */}
                <th className="p-4 font-semibold text-gray-600">Ürün Kodu</th>
                <th className="p-4 font-semibold text-gray-600">Ürün Adı</th>
                <th className="p-4 font-semibold text-gray-600">Kategori</th>
                <th className="p-4 font-semibold text-gray-600">Fiyat</th>
                <th className="p-4 font-semibold text-gray-600 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Henüz ürün eklenmemiş.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    {/* BURAYA ÜRÜN KODU SÜTUNUNU EKLEDİM */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-mono text-sm font-bold">
                          AUTO-{product.id}
                        </span>
                        <button 
                          onClick={() => copyCode(product.id)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Kodu Kopyala"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">{product.name}</td>
                    <td className="p-4 text-gray-600">
                      {product.category ? (
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 border">
                            {product.category}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="p-4 font-bold text-gray-700">{product.price.toLocaleString()} ₺</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
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
