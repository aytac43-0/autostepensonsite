"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  CreditCard, 
  Database, 
  Package, 
  Clock, 
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [productCode, setProductCode] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  // Bu fonksiyon şimdilik "demo" amaçlı çalışır.
  // İleride burayı Supabase veritabanına bağlayıp gerçek sipariş durumunu çekeceğiz.
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(productCode) {
      // Demo: Kullanıcı ne yazarsa yazsın şimdilik bu sonucu gösteriyoruz
      setSearchResult({
        code: productCode,
        name: "Özel Otomasyon Projesi",
        status: "Geliştiriliyor",
        progress: 65 
      });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. ÜST BAŞLIK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Müşteri Portalı</h1>
          <p className="text-muted-foreground">
            Sipariş durumunu sorgula, ödemelerini yönet ve veri dosyalarını yükle.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Destek Al</Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Yeni Sipariş Oluştur
          </Button>
        </div>
      </div>

      {/* 2. SİPARİŞ SORGULAMA (Arama Motoru) */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-500" />
            Sipariş Durumu Sorgula
          </CardTitle>
          <CardDescription>
            Size verilen <strong>Ürün Kodu</strong> (Örn: AUTO-88) ile projenizin hangi aşamada olduğunu görün.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input 
              placeholder="Ürün Kodu Giriniz..." 
              className="max-w-md bg-background"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
            <Button type="submit">Sorgula</Button>
          </form>

          {/* Arama Sonucu Animasyonu */}
          {searchResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 border rounded-lg bg-background/80 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{searchResult.name}</h3>
                  <p className="text-xs text-muted-foreground">Kod: {searchResult.code}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-medium border border-yellow-200">
                  ⚡ {searchResult.status}
                </span>
              </div>
              
              {/* İlerleme Çubuğu */}
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${searchResult.progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Başlangıç</span>
                <span className="font-bold text-foreground">%{searchResult.progress} Tamamlandı</span>
                <span>Teslimat</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 3. FİNANS MERKEZİ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Ödemeler & Faturalar
            </CardTitle>
            <CardDescription>Bekleyen ve tamamlanan ödemeleriniz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Örnek Bekleyen Ödeme */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-purple-600 transition-colors">Web Otomasyon Kurulumu</p>
                  <p className="text-xs text-muted-foreground">Vade: 05.02.2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₺15,000</p>
                <Button size="sm" variant="secondary" className="mt-1 h-7 text-xs">
                  Ödeme Yap
                </Button>
              </div>
            </div>

            {/* Örnek Tamamlanmış Ödeme */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-card opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Danışmanlık Hizmeti</p>
                  <p className="text-xs text-muted-foreground">Ödendi: 28.01.2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₺2,500</p>
                <span className="text-xs text-green-600 font-medium">Ödendi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. VERİ KASASI (Data Vault) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Veri Kasası
            </CardTitle>
            <CardDescription>Otomasyon için gerekli dosyaları buraya yükleyin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Yükleme Alanı */}
            <div className="p-6 border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center text-center space-y-2 hover:bg-accent/50 hover:border-purple-500/50 cursor-pointer transition-all group">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Dosya Yüklemek İçin Tıklayın</p>
                <p className="text-xs text-muted-foreground">Excel, PDF, PNG (Max 50MB)</p>
              </div>
            </div>

            {/* Yüklü Dosyalar Listesi */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Yüklü Dosyalar</h4>
              <div className="flex items-center justify-between text-sm p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  hedef_kitle_listesi.xlsx
                </span>
                <span className="text-xs font-mono text-muted-foreground">2.4 MB</span>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
