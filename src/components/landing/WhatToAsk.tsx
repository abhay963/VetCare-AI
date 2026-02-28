"use client";

import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";

function WhatToAsk() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <MessageCircleIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Veterinary Guidance
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ask about
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              any animal health concern
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From sudden illness to daily care, PashuSaathi AI provides instant
            health insights for livestock and pets — trained on real veterinary cases.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">

          {/* Left Side - Chat Examples */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8">
              Common questions farmers and pet owners ask:
            </h3>

            {[ 
              {
                question: "My cow is not eating and has a fever. What should I do?",
                description:
                  "Get immediate guidance on possible causes, home remedies, feeding advice, and when to call a vet urgently.",
                tags: ["Instant Advice", "Emergency Signs"],
              },
              {
                question: "My dog is vomiting repeatedly. Is it serious?",
                description:
                  "Understand possible reasons, hydration tips, warning symptoms, and whether clinic treatment is needed.",
                tags: ["Health Check", "Care Tips"],
              },
              {
                question: "There are wounds on my goat’s leg. How can I treat it?",
                description:
                  "Learn safe cleaning methods, Ayurvedic remedies, infection prevention, and recovery tracking steps.",
                tags: ["Home Remedy", "Infection Care"],
              },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <MessageSquareIcon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                        <p className="font-semibold text-primary">
                          "{item.question}"
                        </p>
                      </div>

                      <div className="bg-muted/30 rounded-2xl p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex gap-2 mt-3 flex-wrap">
                          {item.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Illustration */}
          <div className="relative rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 min-h-[650px]">

            <Image
              src="/wta.png"
              alt="PashuSaathi AI Assistant"
              fill
              className="object-cover"
              priority
            />

            {/* Optional Soft Overlay for aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default WhatToAsk;