import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircleIcon } from "lucide-react";

function PricingSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">Simple & Affordable</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Choose your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            VetCare AI Plan
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade for unlimited AI-powered animal health support.
            Designed for farmers and pet parents.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Free Plan */}
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">Basic animal care access</p>
                </div>

                <SignUpButton mode="modal">
                  <Button className="w-full py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl font-semibold">
                    Start Free
                  </Button>
                </SignUpButton>

                <div className="space-y-4">
                  <Feature text="Book vet appointments" />
                  <Feature text="Find nearby animal doctors" />
                  <Feature text="Limited AI symptom checks (5/month)" />
                  <Feature text="Basic chat support" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Basic */}
          <div className="relative group">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 scale-105 transition-all duration-500">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">AI Basic</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      ₹299
                    </span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">
                    AI health guidance + vet booking
                  </p>
                </div>

                <Button className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg">
                  Upgrade to AI Basic
                </Button>

                <div className="space-y-4">
                  <Feature text="Everything in Free" />
                  <Feature text="Unlimited AI symptom analysis" />
                  <Feature text="Upload animal images for diagnosis" />
                  <Feature text="Home remedies & food suggestions" />
                  <Feature text="10 AI voice consultations/month" />
                  <Feature text="Priority support" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Pro */}
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">AI Pro</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">₹599</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">
                    Unlimited AI + advanced care insights
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full py-3 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-xl font-semibold"
                >
                  Upgrade to AI Pro
                </Button>

                <div className="space-y-4">
                  <Feature text="Everything in AI Basic" />
                  <Feature text="Unlimited AI voice consultations" />
                  <Feature text="Advanced disease prediction" />
                  <Feature text="Personalized livestock care plans" />
                  <Feature text="24/7 AI assistance" />
                  <Feature text="Detailed health reports & history" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default PricingSection;