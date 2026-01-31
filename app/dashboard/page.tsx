"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, CreditCard, Database, Package, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- SEKME 1: GENEL BAKIŞ ---
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
          <p className="text-muted-foreground">Müşteri paneline erişim sağladınız.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-purple-500/20">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Aktif İşler</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">2</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Tamamlanan</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">14</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Bakiye</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-red-500">₺15,000</div></CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- SEKME 2: SİPARİŞ TAKİBİ ---
  if (activeTab === 'tracking') {
    return (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold">Sipariş Sorgula</h2>
        <Card>
            <CardContent className="pt-6">
                <div className="flex gap-4">
                    <Input placeholder="Ürün Kodu (Örn: AUTO-88)" className="bg-background"/>
                    <Button>Sorgula</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  // --- SEKME 3: ÖDEMELER ---
  if (activeTab === 'payments') {
    return (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold">Ödemeler</h2>
        <Card>
            <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
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
      </div>
    );
  }

  // --- SEKME 4: VERİ KASASI ---
  if (activeTab === 'files') {
    return (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold">Veri Kasası</h2>
        <Card className="border-dashed border-2 hover:bg-accent/20 cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="w-8 h-8 text-blue-500 mb-4"/>
                <h3 className="font-bold">Dosya Yükle</h3>
            </CardContent>
        </Card>
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
