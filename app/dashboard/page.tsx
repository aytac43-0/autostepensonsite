"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, CreditCard, Database, Package, Clock, CheckCircle, Zap, Shield, HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview'; // Varsayılan: overview

  // --- SEKME 1: GENEL BAKIŞ (OVERVIEW) ---
  const OverviewTab = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
        <p className="text-muted-foreground">Dijital operasyonlarınızın kontrol merkezi.</p>
      </div>
      
      {/* Özet Kartları */}
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

      {/* Hızlı Erişim */}
      <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => window.location.href='/dashboard?tab=tracking'}>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5 text-purple-500"/> Siparişim Nerede?</CardTitle>
                  <CardDescription>Aktif projenizin durumunu hemen sorgulayın.</CardDescription>
              </CardHeader>
          </Card>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => window.location.href='/dashboard?tab=files'}>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5 text-blue-500"/> Dosya Yükle</CardTitle>
                  <CardDescription>Veri setlerinizi ve görsellerinizi kasaya ekleyin.</CardDescription>
              </CardHeader>
          </Card>
      </div>
    </div>
  );

  // --- SEKME 2: SİPARİŞ SORGULA (TRACKING) ---
  const TrackingTab = () => {
    const [code, setCode] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(code) setResult({ name: "Instagram DM Botu V2", status: "Kodlanıyor", progress: 45 });
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h2 className="text-2xl font-bold">Sipariş Takibi</h2>
                <p className="text-muted-foreground">Ürün kodunuzu girerek canlı durumu izleyin.</p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <Input placeholder="Ürün Kodu (Örn: AUTO-88)" value={code} onChange={e=>setCode(e.target.value)} className="bg-background"/>
                        <Button type="submit">Sorgula</Button>
                    </form>
                    {result && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 bg-secondary/30 rounded-lg border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">{result.name}</h3>
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium">{result.status}</span>
                            </div>
                            <div className="h-3 bg-secondary rounded-full overflow-hidden">
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

  // --- SEKME 3: ÖDEMELER (PAYMENTS) ---
  const PaymentsTab = () => (
    <div className="space-y-6 max-w-4xl">
         <div>
            <h2 className="text-2xl font-bold">Ödemeler & Finans</h2>
            <p className="text-muted-foreground">Açık faturalarınızı ve ödeme geçmişinizi görüntüleyin.</p>
        </div>
        <Card>
            <CardHeader><CardTitle>Bekleyen Ödemeler</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-500/10 rounded-full"><Clock className="w-5 h-5 text-red-500"/></div>
                        <div>
                            <p className="font-bold">Web Otomasyon Kurulumu</p>
                            <p className="text-xs text-muted-foreground">Son Ödeme: 05.02.2026</p>
                        </div>
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

  // --- SEKME 4: VERİ KASASI (FILES) ---
  const FilesTab = () => (
    <div className="space-y-6 max-w-4xl">
        <div>
            <h2 className="text-2xl font-bold">Veri Kasası</h2>
            <p className="text-muted-foreground">Projeleriniz için gerekli dosyaları güvenle yükleyin.</p>
        </div>
        <Card className="border-dashed border-2 border-muted hover:bg-accent/20 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Package className="w-8 h-8 text-blue-500"/>
                </div>
                <h3 className="font-bold text-lg">Dosya Yüklemek İçin Tıklayın</h3>
                <p className="text-muted-foreground text-sm">veya buraya sürükleyip bırakın (Excel, PDF, PNG)</p>
            </CardContent>
        </Card>
        
        <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Yüklü Dosyalar</h3>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-purple-500"/>
                    <span className="text-sm">musteri_listesi.xlsx</span>
                </div>
                <span className="text-xs text-muted-foreground">2.4 MB</span>
            </div>
        </div>
    </div>
  );

  // --- İÇERİK SEÇİCİ (ROUTER) ---
  return (
    <div className="p-8">
      <motion.div
        key={activeTab} // Tab değişince animasyon çalışsın
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tracking' && <TrackingTab />}
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'files' && <FilesTab />}
        {activeTab === 'support' && (
            <div className="text-center py-20">
                <HelpCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4"/>
                <h2 className="text-2xl font-bold">Destek Merkezi</h2>
                <p className="text-muted-foreground">Yakında burada canlı destek olacak.</p>
            </div>
        )}
      </motion.div>
    </div>
  );
}
