"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Loader } from "lucide-react";

interface AutomationRequest {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  created_at: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/50",
    label: "Pending",
  },
  in_progress: {
    icon: Loader,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/50",
    label: "In Progress",
  },
  completed: {
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-400 border-green-500/50",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "bg-red-500/10 text-red-400 border-red-500/50",
    label: "Cancelled",
  },
};

export default function AutomationsPage() {
  const [requests, setRequests] = useState<AutomationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("automation_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setRequests(data || []);
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

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
          My <span className="gradient-text">Automations</span>
        </h1>
        <p className="text-gray-400">
          Track the status of your automation requests
        </p>
      </motion.div>

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-400 mb-4">
                You haven't submitted any automation requests yet.
              </p>
              <a
                href="/dashboard/request"
                className="text-purple-400 hover:text-purple-300"
              >
                Create your first request
              </a>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => {
            const StatusIcon = statusConfig[request.status].icon;

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {request.title}
                        </CardTitle>
                        {request.description && (
                          <p className="text-gray-400 text-sm">
                            {request.description}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={statusConfig[request.status].color}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[request.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Submitted on{" "}
                      {new Date(request.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
