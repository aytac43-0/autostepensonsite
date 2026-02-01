"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ShoppingBag, Plus, Edit2, Trash2, Save, X, Copy, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<string>("");
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "" });

  // Verileri Çek
  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    // ID'ye göre sırala ki kodlar karışmasın
    const { data } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const { data } = await supabase.from('products').insert([{
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price)
    }]).select();

    if (data) {
        setProducts([...products, data[0]]);
        setNewProduct({ name: "", category: "", price: "" });
        setIsAdding(false);
    }
  };

  const savePrice = async (id: number) => {
    const { error } = await supabase.from('products').update({ price: Number(tempPrice) }).eq('id', id);
    if (!error) {
        setProducts(products.map(p => p.id === id ? { ...p, price: Number(tempPrice) } : p));
        setEditingId(null);
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("Silmek istediğine emin misin?")) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) setProducts(products.filter(p => p.id !== id));
    }
  };

  const copyCode = (id: number) => {
    navigator.clipboard.writeText(`AUTO-${id}`);
    alert(`Kod Kopyalandı: AUTO-${id}`);
  };

  // --- ÜRÜNLER SEKMESİ ---
  if (activeTab === 'products') {
    return (
        <div className="p-8 space-y-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-purple-500"/> Ürünler & Kodlar
                    </h2>
                    <p className="text-slate-400">Müşteriye vermek için "Kopyala" butonuna basın.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2"/> Yeni Ürün
                </Button>
            </div>

            {isAdding && (
                <Card className="bg-slate-800 border-purple-500/50 mb-6">
                    <CardContent className="pt-6">
                        <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2"><Label className="text-slate-300">Ad</Label><Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required/></div>
                            <div className="space-y-2"><Label className="text-slate-300">Kategori</Label><Input className="bg-slate-900 border-slate-700 text-white" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}/></div>
                            <div className="space-y-2"><Label className="text-slate-300">Fiyat</Label><Input type="number" className="bg-slate-900 border-slate-700 text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required/></div>
                            <Button type="submit" className="bg-green-600">Kaydet</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-medium">
                            <tr>
                                <th className="p-4 pl-6">Ürün Kodu</th> {/* BURASI EKLENDİ */}
                                <th className="p-4">Ürün Adı</th>
                                <th className="p-4">Fiyat</th>
                                <th className="p-4 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-700/50">
                                    {/* KOD SÜTUNU */}
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            <code className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono font-bold">
                                                AUTO-{p.id}
                                            </code>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white" onClick={() => copyCode(p.id)}>
                                                <Copy className="w-3 h-3"/>
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white">
                                        {p.name} 
                                        {p.category && <span className="text-xs bg-slate-700 px-2 py-0.5 rounded ml-2 text-slate-300">{p.category}</span>}
                                    </td>
                                    <td className="p-4 text-white font-bold">
                                        {editingId === p.id ? (
                                            <div className="flex gap-2"><Input type="number" value={tempPrice} onChange={e=>setTempPrice(e.target.value)} className="w-20 h-8 bg-slate-900"/><Button size="icon" className="h-8 w-8 bg-green-600" onClick={()=>savePrice(p.id)}><Save className="w-4 h-4"/></Button></div>
                                        ) : `₺${p.price.toLocaleString()}`}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400" onClick={()=>{setEditingId(p.id); setTempPrice(p.price.toString())}}><Edit2 className="w-4 h-4"/></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={()=>deleteProduct(p.id)}><Trash2 className="w-4 h-4"/></Button>
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
  
  return <div className="p-8 text-white">Bu modül yapım aşamasında.</div>;
}

export default function AdminPage() { return <Suspense fallback={<div>Yükleniyor...</div>}><AdminDashboardContent /></Suspense>; }
