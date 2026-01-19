"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, CheckCircle, XCircle, Loader, User } from "lucide-react";

interface RequestWithClient {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  user_id: string;
  client_name: string;
  client_email: string;
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

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestWithClient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const { data: requestsData } = await supabase
      .from("automation_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (requestsData) {
      const requestsWithClients = await Promise.all(
        requestsData.map(async (request: any) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, email")
            .eq("id", request.user_id)
            .maybeSingle();

          return {
            ...request,
            client_name: (profile as any)?.full_name || "Unknown",
            client_email: (profile as any)?.email || "",
          };
        })
      );

      setRequests(requestsWithClients);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (
    requestId: string,
    newStatus: "pending" | "in_progress" | "completed" | "cancelled"
  ) => {
    const { error } = await (supabase as any)
      .from("automation_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (!error) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
    }
  };

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
          Request <span className="gradient-text">Management</span>
        </h1>
        <p className="text-gray-400">
          View and manage all automation requests
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
              <p className="text-gray-400">No automation requests yet.</p>
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
                whileHover={{ scale: 1.01 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {request.title}
                        </CardTitle>
                        {request.description && (
                          <p className="text-gray-400 text-sm mb-3">
                            {request.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{request.client_name}</span>
                          <span className="text-gray-600">•</span>
                          <span>{request.client_email}</span>
                        </div>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        Submitted on{" "}
                        {new Date(request.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <Select
                        value={request.status}
                        onValueChange={(value: any) =>
                          handleStatusChange(request.id, value)
                        }
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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
