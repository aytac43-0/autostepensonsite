"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { CheckCircle, Sparkles } from "lucide-react";

export default function NewRequestPage() {
  const supabase = createClientComponentClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await (supabase as any).from("automation_requests").insert({
          user_id: user.id,
          title,
          description,
          status: "pending",
        });

        if (error) throw error;

        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/automations");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Request Submitted!</h2>
          <p className="text-gray-400">
            We&apos;ll review your automation request and get back to you soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          New <span className="gradient-text">Automation Request</span>
        </h1>
        <p className="text-gray-400">
          Tell us about your automation needs and we'll build it for you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="title">Automation Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Automate customer onboarding emails"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-background/50 focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your automation needs in detail. What tasks do you want to automate? What tools are involved? What should be the expected outcome?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="bg-background/50 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                />
                <p className="text-sm text-gray-500">
                  Be as detailed as possible to help us understand your requirements
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">1.</span>
                Our team will review your request within 24 hours
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">2.</span>
                We&apos;ll reach out to discuss requirements and provide a timeline
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">3.</span>
                We&apos;ll build, test, and deploy your custom automation
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
