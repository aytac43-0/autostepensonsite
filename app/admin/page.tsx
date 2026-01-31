"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Users, FileText, Database, Download, ShoppingBag, Plus, Edit2, Trash2, Save, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- DEMO VERİLERİ (State) ---
  // Gerçekte burası Supabase'den gelecek
  const [products, setProducts] = useState([
    { id: 1, name: "Instagram DM Botu", category: "Sosyal Medya", price: 15000 },
    { id: 2, name: "Google Haritalar Kazıyıcı", category: "Veri", price: 5000 },
    { id: 3, name: "WhatsApp Otomasyonu", category: "İletişim", price: 8500 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<string>("");

  // Yeni Ürün Formu State
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if(newProduct.name && newProduct.price) {
        setProducts([...products, { 
            id: Date.now(), 
            name: newProduct.name, 
            category: newProduct.category, 
            price: Number(newProduct.price) 
        }]);
        setNewProduct({ name: "", category: "", price: "" });
        setIsAdding(false);
    }
  };

  const startEditing = (product: any) => {
    setEditingId(product.id);
    setTempPrice(product.price.toString());
  };

  const savePrice = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, price: Number(tempPrice) } : p));
    setEditingId(null);
  };

  const deleteProduct = (id: number) => {
    if(confirm("Bu ürünü silmek istediğine emin misin?")) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  // --- 1. SEKMELER ---
  
  // GENEL BAKIŞ
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8 text-white">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Toplam Ürün</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-white">{products.length}</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Bekleyen Talep</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-yellow-500">5</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Toplam Ciro</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-green-500">₺42,500</div></CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ÜRÜNLER & HİZMETLER (YENİ EKLENEN KISIM)
  if (activeTab === 'products') {
    return (
        <div className="p-8 space-y-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-purple-500"/> Ürünler & Hizmetler
                    </h2>
                    <p className="text-slate-400">Satışa sunduğunuz hizmetleri ve fiyatlarını yönetin.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2"/> Yeni Ürün Ekle
                </Button>
            </div>

            {/* Yeni Ürün Ekleme Formu (Açılır/Kapanır) */}
            {isAdding && (
                <Card className="bg-slate-800 border-purple-500/50 mb-6">
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
                                <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="border-slate-600 text-slate-300">iptal</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Ürün Tablosu */}
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
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 font-medium text-white">{product.name}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
                                            {product.category}
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
                                            `₺${product.price.toLocaleString()}`
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
        </div>
    );
  }

  // DOSYA & VERİ KASASI
  if (activeTab === 'files') {
    return (
      <div className="p-8 space-y-6 text-white">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-500"/> Dosya & Veri Kasası
            </h2>
            <p className="text-slate-400">Müşterilerin sisteme yüklediği tüm dosyaları buradan yönetin.</p>
        </div>
        <div className="flex gap-4 mb-4">
            <Input placeholder="Dosya veya Müşteri Ara..." className="bg-slate-800 border-slate-700 text-white max-w-sm"/>
            <Button variant="secondary">Ara</Button>
        </div>
        <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                        <tr>
                            <th className="p-4">Dosya Adı</th>
                            <th className="p-4">Yükleyen Müşteri</th>
                            <th className="p-4">Tarih</th>
                            <th className="p-4">Boyut</th>
                            <th className="p-4 text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        <tr className="hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-400"/> hedef_kitle_listesi.xlsx
                            </td>
                            <td className="p-4 text-slate-300">Ahmet Yılmaz</td>
                            <td className="p-4 text-slate-400">Bugün, 14:30</td>
                            <td className="p-4 text-slate-400">2.4 MB</td>
                            <td className="p-4 text-right">
                                <Button size="sm" variant="outline" className="h-8 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700">
                                    <Download className="w-4 h-4 mr-1"/> İndir
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
        <h2 className="text-2xl font-bold">Yapım Aşamasında</h2>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Yükleniyor...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
