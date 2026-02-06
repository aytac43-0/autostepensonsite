'use client'

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Loader } from "lucide-react"

interface AutomationRequest {
  id: string
  title: string
  description: string | null
  status: "pending" | "in_progress" | "completed" | "cancelled"
  created_at: string
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
}

export default function AutomationsPage() {
  const [requests, setRequests] = useState<AutomationRequest[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  const fetchRequests = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from("automation_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (data) {
          // Cast the string status to the union type safely
          const typedData = data.map(item => ({
            ...item,
            status: item.status as AutomationRequest['status']
          }))
          setRequests(typedData)
        }
      }
    } catch (error) {
      console.error("Error fetching automations:", error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-white">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Automations</span>
        </h1>
        <p className="text-slate-400">
          Track the status of your automation requests
        </p>
      </motion.div>

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/5">
            <CardContent className="pt-6 text-center">
              <p className="text-slate-400 mb-4">
                You haven&apos;t submitted any automation requests yet.
              </p>
              <a
                href="/dashboard/requests"
                className="text-purple-400 hover:text-purple-300 hover:underline"
              >
                Create your first request
              </a>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => {
            const config = statusConfig[request.status] || statusConfig.pending
            const StatusIcon = config.icon

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/5 hover:border-purple-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-white">
                          {request.title}
                        </CardTitle>
                        {request.description && (
                          <p className="text-slate-400 text-sm line-clamp-2">
                            {request.description}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`${config.color} whitespace-nowrap`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-2" />
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
            )
          })}
        </div>
      )}
    </div>
  )
}
