'use client'

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, ShoppingCart, AlertCircle, Loader2, CheckCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [searchCode, setSearchCode] = useState("");
  const [foundProduct, setFoundProduct] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFoundProduct(null);
    setErrorMsg("");
    setSearchLoading(true);

    const codeToSearch = searchCode.trim();

    if (codeToSearch.length < 3) {
        setErrorMsg("Lütfen geçerli bir ürün kodu girin.");
        setSearchLoading(false);
        return;
    }

    try {
        // ARTIK 'product_code' SÜTUNUNDA ARIYORUZ
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('product_code', codeToSearch) // Tam eşleşme arar
            .single();

        if (error || !data) {
            setErrorMsg("Bu kod ile eşleşen bir ürün bulunamadı.");
        } else {
            setFoundProduct(data);
        }
    } catch (err) {
        setErrorMsg("Bağlantı hatası oluştu.");
    } finally {
        setSearchLoading(false);
    }
  };

  const handleBuy = (productName: string) => {
    alert(`"${productName}" için talep oluşturuldu! Yöneticiler iletişime geçecek.`);
  };

  // --- 1. GENEL BAKIŞ ---
  if (activeTab === 'overview') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-8">
        <div><h1 className="text-3xl font-bold">Hoş Geldiniz</h1><p className="text-muted-foreground">Kontrol paneli.</p></div>
        <div className="grid md:grid-cols-3 gap-6">
           <Card className="border-purple-500/20"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Aktif İşler</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">0</div></CardContent></Card>
        </div>
      </motion.div>
    );
  }

  // --- 2. SİPARİŞ ARAMA (YENİ KOD SİSTEMİ) ---
  if (activeTab === 'tracking') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-6">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-purple-500"/> Ürün & Sipariş Arama</h2>
            <p className="text-muted-foreground">Size verilen özel ürün kodunu girin.</p>
        </div>
        
        <Card className="border-purple-500/20">
            <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-lg mb-4">
                    <Input 
                        placeholder="Örn: xk92-mpsl-10kd" 
                        className="bg-background font-mono"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                    />
                    <Button type="submit" disabled={searchLoading} className="bg-purple-600 hover:bg-purple-700">
                        {searchLoading ? <Loader2 className="animate-spin w-4 h-4"/> : "Sorgula"}
                    </Button>
                </form>

                {errorMsg && (
                    <div className="p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4"/> {errorMsg}
                    </div>
                )}

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
                                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                    Kod: <code className="bg-secondary px-1 rounded">{foundProduct.product_code}</code>
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">₺{foundProduct.price?.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">+ KDV</p>
                            </div>
                        </div>
                        <div className="bg-secondary/30 p-4 flex justify-end gap-3 border-t">
                            <Button onClick={() => handleBuy(foundProduct.name)} className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                                <ShoppingCart className="w-4 h-4 mr-2"/> Satın Al
                            </Button>
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  return <div className="p-8">Yükleniyor...</div>;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Yükleniyor...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
