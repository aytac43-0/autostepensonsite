"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Users, FileText, Database, Download, ShoppingBag, Plus, Edit2, Trash2, Save, X, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase"; // Gerçek bağlantı

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- GERÇEK VERİ STATE'LERİ ---
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Düzenleme State'leri
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<string>("");
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "" });

  // 1. Sayfa Yüklenince Ürünleri Çek
  useEffect(() => {
    if (activeTab === 'products') {
        fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  // 2. Yeni Ürün Ekle (Supabase'e Yazar)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const { data, error } = await supabase
        .from('products')
        .insert([{
            name: newProduct.name,
            category: newProduct.category,
            price: Number(newProduct.price)
        }])
        .select();

    if (!error && data) {
        setProducts([...products, data[0]]); // Listeye ekle
        setNewProduct({ name: "", category: "", price: "" }); // Formu temizle
        setIsAdding(false); // Formu kapat
    } else {
        alert("Hata: Ürün eklenemedi. Yetkiniz var mı?");
    }
  };

  // 3. Fiyat Güncelle (Supabase'de Değiştirir)
  const savePrice = async (id: number) => {
    const { error } = await supabase
        .from('products')
        .update({ price: Number(tempPrice) })
        .eq('id', id);

    if (!error) {
        // Yerel listeyi de güncelle ki sayfa yenilenmesin
        setProducts(products.map(p => p.id === id ? { ...p, price: Number(tempPrice) } : p));
        setEditingId(null);
    }
  };

  // 4. Ürün Sil (Supabase'den Siler)
  const deleteProduct = async (id: number) => {
    if (confirm("Bu ürünü gerçekten silmek istiyor musunuz?")) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        
        if (!error) {
            setProducts(products.filter(p => p.id !== id));
        }
    }
  };

  const startEditing = (product: any) => {
    setEditingId(product.id);
    setTempPrice(product.price.toString());
  };

  // --- ARAYÜZ ---

  // GENEL BAKIŞ
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8 text-white">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Sistemdeki Ürünler</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-white">---</div></CardContent>
          </Card>
           {/* Diğer kartlar şimdilik statik kalsın, sırayla bağlayacağız */}
        </div>
      </div>
    );
  }

  // ÜRÜNLER & HİZMETLER (ARTIK CANLI ÇALIŞIYOR)
  if (activeTab === 'products') {
    return (
        <div className="p-8 space-y-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-purple-500"/> Ürünler & Hizmetler
                    </h2>
                    <p className="text-slate-400">Veritabanındaki ürünleri yönetin.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2"/> Yeni Ürün Ekle
                </Button>
            </div>

            {/* Yeni Ürün Formu */}
            {isAdding && (
                <Card className="bg-slate-800 border-purple-500/50 mb-6 animate-in slide-in-from-top-2">
                    <CardHeader><CardTitle className="text-white">Yeni Hizmet Oluştur</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Ürün Adı</Label>
                                <Input placeholder="Örn: Seo Paketi" className="bg-slate-900 border-slate-700 text-white" 
                                    value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required/>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Kategori</Label>
                                <Input placeholder="Örn: Web" className="bg-slate-900 border-slate-700 text-white"
                                    value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}/>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Fiyat (₺)</Label>
                                <Input type="number" placeholder="0" className="bg-slate-900 border-slate-700 text-white"
                                    value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required/>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">Kaydet</Button>
                                <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="border-slate-600 text-slate-300">Vazgeç</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Yükleniyor Göstergesi */}
            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-500"/></div>
            ) : (
                /* Ürün Tablosu */
                <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                                <tr>
                                    <th className="p-4">Ürün Adı</th>
                                    <th className="p-4">Kategori</th>
                                    <th className="p-4">Fiyat</th>
                                    <th className="p-4 text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {products.length === 0 && (
                                    <tr><td colSpan={4} className="p-6 text-center text-slate-500">Henüz ürün eklenmemiş.</td></tr>
                                )}
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-700/50 transition-colors">
                                        <td className="p-4 font-medium text-white">{product.name}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
                                                {product.category || 'Genel'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white font-bold">
                                            {editingId === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <Input 
                                                        type="number" 
                                                        value={tempPrice} 
                                                        onChange={(e) => setTempPrice(e.target.value)}
                                                        className="w-24 h-8 bg-slate-900 border-slate-600"
                                                    />
                                                    <Button size="icon" className="h-8 w-8 bg-green-600 hover:bg-green-700" onClick={() => savePrice(product.id)}>
                                                        <Save className="w-4 h-4"/>
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400" onClick={() => setEditingId(null)}>
                                                        <X className="w-4 h-4"/>
                                                    </Button>
                                                </div>
                                            ) : (
                                                `₺${product.price?.toLocaleString()}`
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => startEditing(product)}>
                                                    <Edit2 className="w-4 h-4"/>
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => deleteProduct(product.id)}>
                                                    <Trash2 className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
  }

  // DOSYA YÖNETİMİ (Şimdilik Demo)
  if (activeTab === 'files') {
    return (
      <div className="p-8 text-white">
        <h2 className="text-2xl font-bold">Dosya & Veri Kasası</h2>
        <p className="text-slate-400 mb-6">Müşteri dosyaları burada listelenecek.</p>
        <div className="p-8 border border-slate-700 border-dashed rounded-xl text-center text-slate-500">
            Dosya sistemi bir sonraki adımda bağlanacak.
        </div>
      </div>
    );
  }

  return null;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Yükleniyor...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
