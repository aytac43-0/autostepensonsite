"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Workflow, PlusCircle, LogOut, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Automations",
    href: "/dashboard/automations",
    icon: Workflow,
  },
  {
    name: "New Request",
    href: "/dashboard/request",
    icon: PlusCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-64 bg-card/50 backdrop-blur-sm border-r border-border flex flex-col"
    >
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Autostep</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 text-purple-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-secondary"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-red-400"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </motion.aside>
  );
}
