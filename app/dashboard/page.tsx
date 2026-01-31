"use client";

// BU SATIR HATALARI ENGELLER:
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, CreditCard, Database, Package, Clock, CheckCircle, HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// --- İçerik Yönetimi ---
function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // 1. GENEL BAKIŞ
  const OverviewTab = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
        <p className="text-muted-foreground">Dijital operasyonlarınızın kontrol merkezi.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Aktif Projeler</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">2</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan İşler</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">14</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Bekleyen Ödeme</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">₺15,000</div></CardContent>
        </Card>
      </div>
    </div>
  );

  // 2. SİPARİŞ TAKİBİ
  const TrackingTab = () => {
    const [code, setCode] = useState("");
    const [result, setResult] = useState<any>(null);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(code) setResult({ name: "Instagram DM Botu V2", status: "Kodlanıyor", progress: 45 });
    };
    return (
        <div className="space-y-6 max-w-3xl">
            <div><h2 className="text-2xl font-bold">Sipariş Takibi</h2></div>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <Input placeholder="Ürün Kodu (Örn: AUTO-88)" value={code} onChange={e=>setCode(e.target.value)} className="bg-background"/>
                        <Button type="submit">Sorgula</Button>
                    </form>
                    {result && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 bg-secondary/30 rounded-lg border">
                            <h3 className="font-bold text-lg">{result.name}</h3>
                            <div className="h-3 bg-secondary rounded-full overflow-hidden mt-4">
                                <div className="h-full bg-purple-600 transition-all duration-1000" style={{width: `${result.progress}%`}}/>
                            </div>
                            <p className="text-right text-sm text-muted-foreground mt-2">%{result.progress} Tamamlandı</p>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
  };

  // 3. ÖDEMELER
  const PaymentsTab = () => (
    <div className="space-y-6 max-w-4xl">
         <div><h2 className="text-2xl font-bold">Ödemeler & Finans</h2></div>
         <Card>
            <CardHeader><CardTitle>Bekleyen Ödemeler</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                    <div>
                        <p className="font-bold">Web Otomasyon Kurulumu</p>
                        <p className="text-xs text-muted-foreground">Vade: 05.02.2026</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">₺15,000</p>
                        <Button size="sm" className="mt-1">Ödeme Yap</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );

  // 4. VERİ KASASI
  const FilesTab = () => (
    <div className="space-y-6 max-w-4xl">
        <div><h2 className="text-2xl font-bold">Veri Kasası</h2></div>
        <Card className="border-dashed border-2 border-muted hover:bg-accent/20 cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="w-8 h-8 text-blue-500 mb-4"/>
                <h3 className="font-bold text-lg">Dosya Yükle</h3>
            </CardContent>
        </Card>
    </div>
  );

  return (
    <div className="p-8">
      <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tracking' && <TrackingTab />}
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'files' && <FilesTab />}
      </motion.div>
    </div>
  );
}

// --- Ana Sayfa ---
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Yükleniyor...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
