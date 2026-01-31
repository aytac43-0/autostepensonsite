"use client";

// BU SATIR HATALARI ENGELLER:
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  CreditCard, 
  Database, 
  LogOut,
  LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// --- Yan Menü Bileşeni ---
function DashboardSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email || "");
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { label: "Genel Bakış", icon: LayoutDashboard, key: "overview" },
    { label: "Sipariş Sorgula", icon: Search, key: "tracking" },
    { label: "Ödemeler & Finans", icon: CreditCard, key: "payments" },
    { label: "Veri Kasası", icon: Database, key: "files" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white">A</span>
          </div>
          Autostep
        </div>
      </div>

      {/* Linkler */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentTab === item.key;
          return (
            <Link 
              key={item.key} 
              href={`/dashboard?tab=${item.key}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-purple-600/10 text-purple-500 border border-purple-600/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Alt Kısım */}
      <div className="p-4 border-t border-border/50 space-y-4">
        <div className="bg-secondary/30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-xs font-medium truncate">Hesabım</span>
                    <span className="text-[10px] text-muted-foreground truncate">{userEmail}</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </aside>
  );
}

// --- Ana Layout ---
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Suspense fallback={<div className="w-64 bg-card border-r border-border" />}>
        <DashboardSidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto bg-background/50 relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent -z-10 pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
