"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminStats {
  totalClients: number;
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalClients: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "client");

      const { data: requests } = await supabase
        .from("automation_requests")
        .select("status");

      const pendingCount =
        requests?.filter((r: any) => r.status === "pending").length || 0;
      const completedCount =
        requests?.filter((r: any) => r.status === "completed").length || 0;

      setStats({
        totalClients: profiles?.length || 0,
        totalRequests: requests?.length || 0,
        pendingRequests: pendingCount,
        completedRequests: completedCount,
      });

      setLoading(false);
    };

    fetchAdminStats();
  }, []);

  const statsCards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "from-purple-600 to-violet-600",
      delay: 0,
    },
    {
      title: "Total Requests",
      value: stats.totalRequests,
      icon: FileText,
      color: "from-blue-600 to-cyan-600",
      delay: 0.1,
    },
    {
      title: "Pending",
      value: stats.pendingRequests,
      icon: Clock,
      color: "from-orange-600 to-yellow-600",
      delay: 0.2,
    },
    {
      title: "Completed",
      value: stats.completedRequests,
      icon: CheckCircle,
      color: "from-green-600 to-emerald-600",
      delay: 0.3,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-gray-400">
          Manage clients and automation requests
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: stat.delay + 0.3 }}
                    className="text-3xl font-bold gradient-text"
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              View and manage all client automation requests from the Requests page.
              Monitor client profiles and activity from the Clients page.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
