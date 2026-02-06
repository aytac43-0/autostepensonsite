"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar } from "lucide-react";

interface Client {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  request_count?: number;
}

export const dynamic = 'force-dynamic'

export default function ClientsPage() {
  const supabase = createClientComponentClient();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "client")
        .order("created_at", { ascending: false });

      if (profiles && profiles.length > 0) {
        const clientsWithCounts = await Promise.all(
          profiles.map(async (profile: any) => {
            const { data: requests } = await supabase
              .from("automation_requests")
              .select("id")
              .eq("user_id", profile.id);

            return {
              ...profile,
              request_count: requests?.length || 0,
            };
          })
        );

        setClients(clientsWithCounts);
      }

      setLoading(false);
    };

    fetchClients();
  }, [supabase]);

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
          Client <span className="gradient-text">Management</span>
        </h1>
        <p className="text-gray-400">
          View and manage all registered clients
        </p>
      </motion.div>

      {clients.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-400">No clients registered yet.</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {client.full_name || "No name"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-purple-500/10 text-purple-400 border-purple-500/50"
                    >
                      {client.request_count || 0} requests
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Joined on{" "}
                    {new Date(client.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
