"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Workflow, Database, Mail, Calendar, BarChart } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Integration",
    description: "Integrate cutting-edge AI models into your workflows for intelligent automation and decision-making.",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Build tailored n8n workflows that perfectly match your business processes and requirements.",
  },
  {
    icon: Database,
    title: "Data Automation",
    description: "Automate data collection, processing, and syncing across all your business tools seamlessly.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Set up intelligent email sequences, notifications, and responses that run on autopilot.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Reminders",
    description: "Never miss important tasks with automated scheduling, reminders, and follow-ups.",
  },
  {
    icon: BarChart,
    title: "Reporting & Analytics",
    description: "Get automated reports and insights delivered to your inbox on your schedule.",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as any,
      },
    },
  };

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive automation solutions tailored to your business needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
