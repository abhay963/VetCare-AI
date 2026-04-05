import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Mic,
  Calendar,
  Stethoscope,
  PawPrint,
} from "lucide-react";
import Link from "next/link";

export default function MainActions() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">

{/* UPLOAD ANIMAL DATA */}
<Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
  
  {/* hover bg */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

  <CardContent className="relative p-8">
    
    {/* HEADER */}
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
        
        {/* main icon */}
        <PawPrint className="w-8 h-8 text-primary" />

        {/* small overlay */}
        <Stethoscope className="w-4 h-4 text-primary absolute bottom-2 right-2" />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Analyze Animal Health</h3>
        <p className="text-muted-foreground">
          Upload animal details for AI-based diagnosis
        </p>
      </div>
    </div>

    {/* FEATURES */}
    <div className="space-y-4">
      <Feature text="Upload multiple images/videos" />
      <Feature text="Select animal type & body part" />
      <Feature text="Add symptoms (text or voice)" />
    </div>

    {/* BUTTON */}
    <Link
      href="/analyze"
      className={buttonVariants({
        variant: "default",
        className:
          "w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
      })}
    >
      <PawPrint className="mr-2 h-5 w-5" />
      Start Analysis
    </Link>
  </CardContent>
</Card>
      {/* AI VOICE ASSISTANT */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        
        {/* hover bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <CardContent className="relative p-8">
          
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              
              {/* main icon */}
              <Mic className="w-8 h-8 text-primary" />

              {/* paw overlay */}
              <PawPrint className="w-4 h-4 text-primary absolute bottom-2 right-2" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Vet AI Voice Assistant</h3>
              <p className="text-muted-foreground">
                Get instant veterinary advice via voice
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            <Feature text="24/7 animal health support" />
            <Feature text="Covers pets & farm animals" />
            <Feature text="Instant treatment guidance" />
          </div>

          {/* BUTTON */}
          <Link
            href="/voice"
            className={buttonVariants({
              variant: "default",
              className:
                "w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
            })}
          >
            <Mic className="mr-2 h-5 w-5" />
            Start Consultation
          </Link>
        </CardContent>
      </Card>

      {/* BOOK APPOINTMENT */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <CardContent className="relative p-8">
          
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              
              <Calendar className="w-8 h-8 text-primary" />
              <Stethoscope className="w-4 h-4 text-primary absolute bottom-2 right-2" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Book Vet Appointment</h3>
              <p className="text-muted-foreground">
                Connect with nearby veterinary doctors
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            <Feature text="Verified veterinary doctors" />
            <Feature text="Nearby availability" />
            <Feature text="Quick booking & confirmation" />
          </div>

          {/* BUTTON */}
          <Link href="/appointments">
            <Button
              variant="outline"
              className="w-full mt-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-semibold py-3 rounded-xl transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Visit
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

/* 🔥 Reusable Feature Component */
function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-primary rounded-full"></div>
      <span className="text-sm">{text}</span>
    </div>
  );
}