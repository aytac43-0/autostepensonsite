"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Tell Us Your Needs",
    description: "Share your business challenges and automation goals through our simple request form.",
  },
  {
    icon: Wrench,
    title: "2. We Build Your Solution",
    description: "Our experts design and implement custom AI and n8n workflows tailored to your requirements.",
  },
  {
    icon: Rocket,
    title: "3. Launch & Optimize",
    description: "Deploy your automation and enjoy continuous monitoring and optimization for peak performance.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started with automation in three simple steps
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-purple-500/50"
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 text-lg max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Join hundreds of businesses already automating with Autostep
          </p>
        </motion.div>
      </div>
    </section>
  );
}
