"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, CreditCard, ShoppingCart, CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- ARAMA STATE'LERİ ---
  const [searchCode, setSearchCode] = useState("");
  const [foundProduct, setFoundProduct] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ÜRÜN ARAMA FONKSİYONU
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFoundProduct(null);
    setErrorMsg("");
    setSearchLoading(true);

    // 1. Kodu kontrol et (AUTO-123 formatında mı?)
    if (!searchCode.toUpperCase().startsWith("AUTO-")) {
        setErrorMsg("Lütfen geçerli bir ürün kodu girin (Örn: AUTO-15)");
        setSearchLoading(false);
        return;
    }

    // 2. ID'yi ayıkla (AUTO-15 -> 15)
    const productId = searchCode.split("-")[1];

    // 3. Veritabanından sor
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

    if (error || !data) {
        setErrorMsg("Ürün bulunamadı. Kodu kontrol edip tekrar deneyin.");
    } else {
        setFoundProduct(data);
    }
    setSearchLoading(false);
  };

  // SATIN ALMA FONKSİYONU (Şimdilik Demo)
  const handleBuy = (productName: string) => {
    alert(`"${productName}" için sipariş talebiniz alındı! Yöneticiler sizinle iletişime geçecek.`);
    // İleride burayı 'orders' tablosuna kayıt atacak şekilde güncelleyeceğiz.
  };

  // --- 1. SEKME: GENEL BAKIŞ ---
  if (activeTab === 'overview') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-8">
        <div><h1 className="text-3xl font-bold">Hoş Geldiniz</h1><p className="text-muted-foreground">Kontrol paneli.</p></div>
        {/* Özet Kartları (Demo) */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Aktif İşler</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">0</div></CardContent></Card>
        </div>
      </motion.div>
    );
  }

  // --- 2. SEKME: ÜRÜN/SİPARİŞ ARAMA (GÜNCELLENEN KISIM) ---
  if (activeTab === 'tracking') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-6">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-purple-500"/> Ürün & Sipariş Arama</h2>
            <p className="text-muted-foreground">Size verilen kodu (Örn: AUTO-12) girerek ürünü görüntüleyin.</p>
        </div>
        
        <Card className="border-purple-500/20">
            <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-lg mb-4">
                    <Input 
                        placeholder="Kodu Giriniz (AUTO-...)" 
                        className="bg-background"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                    />
                    <Button type="submit" disabled={searchLoading}>
                        {searchLoading ? <Loader2 className="animate-spin w-4 h-4"/> : "Ara"}
                    </Button>
                </form>

                {/* HATA MESAJI */}
                {errorMsg && (
                    <div className="p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4"/> {errorMsg}
                    </div>
                )}

                {/* BULUNAN ÜRÜN KARTI */}
                {foundProduct && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 border rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/5 to-blue-500/5"
                    >
                        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    {foundProduct.name}
                                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full">
                                        {foundProduct.category}
                                    </span>
                                </h3>
                                <p className="text-muted-foreground mt-1">Ürün Kodu: AUTO-{foundProduct.id}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">₺{foundProduct.price.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">+ KDV</p>
                            </div>
                        </div>
                        <div className="bg-secondary/30 p-4 flex justify-end gap-3 border-t">
                            <Button variant="outline">Detayları Gör</Button>
                            <Button onClick={() => handleBuy(foundProduct.name)} className="bg-green-600 hover:bg-green-700">
                                <ShoppingCart className="w-4 h-4 mr-2"/> Satın Al / Talep Et
                            </Button>
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  // --- 3. SEKME: ÖDEMELER (Aynı Kalıyor) ---
  if (activeTab === 'payments') {
    return (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold">Ödemeler</h2>
        <Card><CardContent className="pt-6"><p>Ödeme geçmişi burada görünecek.</p></CardContent></Card>
      </div>
    );
  }

  return null;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Yükleniyor...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
