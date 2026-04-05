"use client";

import Header from "@/components/landing/Header";
import {
  Brain,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDarkMode } from "@/hooks/useDarkMode";
import clsx from "clsx";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function AboutPage() {
  const [darkMode] = useDarkMode();

  return (
    <div
      className={clsx(
        "min-h-screen bg-background text-foreground overflow-hidden",
        darkMode && "dark"
      )}
    >
      <Header />

      {/* 🌿 BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-primary/10" />

        {/* Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* ================= HERO ================= */}
        <motion.div
          initial="hidden"
          animate="show"
          className="text-center mb-28 space-y-6"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
                       bg-gradient-to-r from-primary/10 to-emerald-500/10 
                       border border-primary/20 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              AI-POWERED ANIMAL HEALTHCARE
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transforming Animal Care with
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              AI & Innovation
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
          >
            VetCare AI empowers farmers and pet owners with instant insights,
            smart recommendations, and seamless access to veterinary care.
          </motion.p>
        </motion.div>

        {/* ================= STATS ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mb-28"
        >
          {[
            { value: "10K+", label: "Animals Helped" },
            { value: "2K+", label: "Farmers Supported" },
            { value: "500+", label: "Vet Connections" },
            { value: "24/7", label: "AI Assistance" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="p-6 rounded-2xl border border-primary/20 
                         bg-background/60 backdrop-blur-xl text-center
                         hover:shadow-xl hover:shadow-primary/20 
                         hover:-translate-y-2 transition-all duration-500"
            >
              <h3 className="text-3xl font-bold text-primary">
                {item.value}
              </h3>
              <p className="text-muted-foreground mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= FEATURES ================= */}
        <div className="mb-28">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Diagnosis",
                desc: "Instant disease detection using AI models.",
              },
              {
                icon: Heart,
                title: "Smart Remedies",
                desc: "Natural and AI-recommended care solutions.",
              },
              {
                icon: MapPin,
                title: "Live Vet Map",
                desc: "Find nearby vets with real-time location.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Care",
                desc: "Verified doctors and safe guidance.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative p-6 rounded-2xl border border-primary/20 
                           bg-background/60 backdrop-blur-xl 
                           hover:-translate-y-4 hover:shadow-2xl 
                           hover:shadow-primary/20 transition-all duration-500 text-center overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                bg-gradient-to-br from-primary/10 to-emerald-400/10 
                                transition duration-500" />

                <item.icon className="mx-auto mb-4 text-primary group-hover:scale-110 transition relative z-10" />
                <h3 className="font-semibold text-lg mb-2 relative z-10">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= STORY ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-28 p-10 rounded-3xl border border-primary/20 
                     bg-gradient-to-br from-primary/5 to-emerald-500/5 
                     backdrop-blur-xl"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold text-center mb-6"
          >
            Why We Built This
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg text-muted-foreground max-w-3xl mx-auto text-center"
          >
            In rural areas, farmers often struggle to access timely veterinary care.
            VetCare AI bridges this gap by combining AI intelligence with real-time
            vet connectivity — saving time, cost, and animal lives.
          </motion.p>
        </motion.div>

        {/* ================= CREATOR ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 
                       bg-primary/10 border border-primary/20 
                       rounded-full text-primary text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Built with passion
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-2xl font-semibold"
          >
            Abhay Kumar Yadav
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-xl mx-auto text-muted-foreground"
          >
            Building impactful AI solutions for real-world problems.
            VetCare AI empowers farmers and improves animal healthcare accessibility.
          </motion.p>
        </motion.div>

      </div>
    </div>
  );
}