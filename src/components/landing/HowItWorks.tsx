"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: string;
  tags: string[];
}

const steps: Step[] = [
  {
    step: "1",
    title: "Describe Symptoms",
    desc: "Upload images or describe your animal’s condition. Our AI instantly analyzes symptoms and detects possible issues.",
    icon: "/audio.png",
    tags: ["Image Upload", "Instant Analysis"],
  },
  {
    step: "2",
    title: "Get Smart Guidance",
    desc: "Receive AI-based treatment suggestions, home remedies, food advice, and nearby trusted vet recommendations.",
    icon: "/brain.png",
    tags: ["AI-Powered", "Personalized Care"],
  },
  {
    step: "3",
    title: "Book & Track Care",
    desc: "Connect with verified animal doctors, schedule appointments, and track recovery progress seamlessly.",
    icon: "/calendar.png",
    tags: ["Verified Vets", "Follow-up Tracking"],
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-7xl py-28 px-6 overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-20 space-y-6">

        {/* Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 shadow-sm backdrop-blur-sm"
        >
          <ZapIcon className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-primary">
            Simple & Smart Process
          </span>
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Three steps to smarter animal care
          </span>
        </h2>
      </div>

      {/* ================= STEPS ================= */}
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />

        <div className="grid gap-12 lg:grid-cols-3">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative rounded-3xl border border-primary/20 bg-background/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">

                {/* Step Number */}
                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-500 text-sm font-bold text-white shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-center text-2xl font-bold bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mb-6 text-center text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= CTA BUTTON ================= */}
      <div className="mt-16 flex justify-center">
        <SignUpButton mode="modal">
          <button
            className={cn(
              "group relative overflow-hidden rounded-xl px-10 py-6 text-lg font-semibold",
              "bg-gradient-to-r from-primary to-emerald-500",
              "hover:from-emerald-500 hover:to-primary",
              "transition-all duration-500",
              "text-white shadow-xl shadow-primary/30",
              "hover:shadow-2xl hover:shadow-primary/40",
              "hover:scale-105 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <ArrowRightIcon className="mr-3 h-6 w-6 inline transition-transform duration-500 group-hover:translate-x-2" />
            Get started now
          </button>
        </SignUpButton>
      </div>

    </section>
  );
};

export default HowItWorks;