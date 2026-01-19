"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small businesses getting started with automation",
    features: [
      "Up to 5 workflows",
      "Basic AI integration",
      "Email support",
      "Monthly strategy call",
      "n8n setup included",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$1,299",
    period: "/month",
    description: "Ideal for growing businesses scaling their operations",
    features: [
      "Up to 20 workflows",
      "Advanced AI integration",
      "Priority support",
      "Weekly strategy calls",
      "Custom integrations",
      "Performance analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited workflows",
      "Full AI & automation suite",
      "24/7 dedicated support",
      "Daily monitoring",
      "White-label options",
      "SLA guarantees",
      "On-premise deployment",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your automation needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative bg-card/50 backdrop-blur-sm border rounded-2xl p-8 ${
                plan.popular
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold gradient-text">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/login">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
