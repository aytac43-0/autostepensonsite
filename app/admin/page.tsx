"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Users, FileText, Database, Download, CheckCircle, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // --- 1. ADMIN GENEL BAKIŞ ---
  if (activeTab === 'overview') {
    return (
      <div className="p-8 space-y-8 text-white">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Toplam Müşteri</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-white">128</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Bekleyen Talep</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-yellow-500">5</div></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-sm">Yüklenen Dosyalar</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-blue-500">42</div></CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- 2. DOSYA & VERİ KASASI (YENİ - MÜŞTERİ VERİLERİ) ---
  if (activeTab === 'files') {
    return (
      <div className="p-8 space-y-6 text-white">
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-500"/> Dosya & Veri Kasası
            </h2>
            <p className="text-slate-400">Müşterilerin sisteme yüklediği tüm dosyaları buradan yönetin.</p>
        </div>

        {/* Arama Barı */}
        <div className="flex gap-4 mb-4">
            <Input placeholder="Dosya veya Müşteri Ara..." className="bg-slate-800 border-slate-700 text-white max-w-sm"/>
            <Button variant="secondary">Ara</Button>
        </div>

        {/* Dosya Tablosu */}
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
                        {/* ÖRNEK VERİLER (Şimdilik Demo) */}
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
                        <tr className="hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-400"/> şirket_logosu.png
                            </td>
                            <td className="p-4 text-slate-300">Mazren Official</td>
                            <td className="p-4 text-slate-400">Dün, 09:15</td>
                            <td className="p-4 text-slate-400">1.1 MB</td>
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

  // --- DİĞER SEKMELER (Müşteri Talepleri vb.) ---
  if (activeTab === 'requests') {
    return (
        <div className="p-8 text-white">
            <h2 className="text-2xl font-bold">Müşteri Talepleri</h2>
            <p className="text-slate-400">Gelen otomasyon istekleri burada listelenecek.</p>
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
