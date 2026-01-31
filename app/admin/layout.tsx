"use client";

// Vercel hatasını önleyen kod:
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Database, // Veri kasası ikonu
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Admin Menüsü
const menuItems = [
  { label: "Yönetim Merkezi", icon: ShieldCheck, key: "overview" },
  { label: "Müşteri Talepleri", icon: FileText, key: "requests" },
  { label: "Dosya & Veri Kasası", icon: Database, key: "files" }, // YENİ EKLENEN
  { label: "Müşteriler", icon: Users, key: "users" },
];

function AdminSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          Autostep Admin
        </div>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentTab === item.key;
          return (
            <Link 
              key={item.key} 
              href={`/admin?tab=${item.key}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-red-600/10 text-red-500 border border-red-600/20" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Alt Kısım */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-xs font-medium text-white truncate">Süper Admin</span>
                    <span className="text-[10px] text-slate-400 truncate">Tam Yetkili</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}

// Ana Layout
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <aside className="w-64 hidden md:block h-full">
        <Suspense fallback={<div className="p-4 text-slate-400">Yükleniyor...</div>}>
          <AdminSidebar />
        </Suspense>
      </aside>
      <main className="flex-1 overflow-y-auto bg-slate-900 relative">
        {children}
      </main>
    </div>
  );
}
