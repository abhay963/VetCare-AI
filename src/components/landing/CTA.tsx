import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon, CalendarIcon } from "lucide-react";

function CTA() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-muted/10 via-background to-muted/5">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-primary">
                  Always Here for Your Animals
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Better care for your
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  livestock & pets starts today
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join farmers and pet parents using PashuSaathi for instant AI
                health guidance, image-based diagnosis, and easy vet booking —
                anytime, anywhere.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="px-6 py-3 font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <MicIcon className="mr-2 h-4 w-4" />
                Start AI Consultation
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 font-semibold border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Book a Vet
              </Button>
            </div>
          </div>

          {/* Right Content - CTA Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">

              {/* Floating Availability Badge */}
              <div className="absolute -top-4 left-4 bg-gradient-to-r from-primary to-primary/80 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  24/7 AI Support
                </div>
              </div>

              {/* Image Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl scale-110"></div>

            <Image
  src="/ct.png"
  alt="PashuSaathi AI Assistant"
  width={500}
  height={500}
  className="relative w-[500px] lg:w-[550px] h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
  priority
/>

              {/* Decorative Glow */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-lg"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;