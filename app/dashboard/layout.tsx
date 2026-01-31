"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  LayoutDashboard, 
  Search, 
  CreditCard, 
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// "Veri Kasası" (Database ikonu) buradan kaldırıldı
const menuItems = [
  { label: "Genel Bakış", icon: LayoutDashboard, key: "overview" },
  { label: "Sipariş Takibi", icon: Search, key: "tracking" },
  { label: "Ödemeler & Finans", icon: CreditCard, key: "payments" },
];

function SidebarContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white">A</span>
          </div>
          Autostep
        </div>
      </div>

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

      <div className="p-4 border-t border-border/50 space-y-4">
        <div className="bg-secondary/30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-xs font-medium truncate">Hesabım</span>
                    <span className="text-[10px] text-muted-foreground truncate">Müşteri Paneli</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 hidden md:block h-full">
        <Suspense fallback={<div className="p-4">Yükleniyor...</div>}>
          <SidebarContent />
        </Suspense>
      </aside>
      <main className="flex-1 overflow-y-auto bg-background/50 relative">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent -z-10 pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
