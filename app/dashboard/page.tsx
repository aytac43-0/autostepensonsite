"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, CreditCard, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- 1. SEKME: GENEL BAKIŞ ---
  if (activeTab === 'overview') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
          <p className="text-muted-foreground">Dijital operasyonlarınızın özet durumu.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Aktif Projeler</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">2</div></CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">14</div></CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Bekleyen Ödeme</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">₺15,000</div></CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  // --- 2. SEKME: SİPARİŞ TAKİBİ ---
  if (activeTab === 'tracking') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-6">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-purple-500"/> Sipariş Takibi</h2>
            <p className="text-muted-foreground">Ürün kodunuzu girerek durumu sorgulayın.</p>
        </div>
        <Card>
            <CardContent className="pt-6">
                <div className="flex gap-4 max-w-md">
                    <Input placeholder="Ürün Kodu Giriniz (Örn: AUTO-88)" className="bg-background"/>
                    <Button>Sorgula</Button>
                </div>
                <div className="mt-8 p-6 border border-dashed rounded-lg text-center text-muted-foreground">
                    Henüz bir sorgulama yapmadınız.
                </div>
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  // --- 3. SEKME: ÖDEMELER ---
  if (activeTab === 'payments') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-6">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="w-6 h-6 text-green-500"/> Ödemeler</h2>
            <p className="text-muted-foreground">Geçmiş ve gelecek ödemeleriniz.</p>
        </div>
        <Card>
            <CardHeader><CardTitle>Bekleyen Ödemeler</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                    <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-red-500"/>
                        <div>
                            <p className="font-bold">Web Otomasyon Kurulumu</p>
                            <p className="text-xs text-muted-foreground">Vade: 05.02.2026</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">₺15,000</p>
                        <Button size="sm" className="mt-1">Ödeme Yap</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </motion.div>
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
