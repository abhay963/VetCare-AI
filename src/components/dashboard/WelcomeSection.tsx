import { currentUser } from "@clerk/nextjs/server";
import { Stethoscope, PawPrint } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();

  const greeting =
    new Date().getHours() < 12
      ? "morning"
      : new Date().getHours() < 18
      ? "afternoon"
      : "evening";

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
      
      {/* LEFT CONTENT */}
      <div className="space-y-4">
        
        {/* STATUS */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">
            VetCare AI Online
          </span>
        </div>

        {/* TEXT */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good {greeting},{" "}
            {user?.firstName || "Guest"} 🐾
          </h1>

          <p className="text-muted-foreground">
            Your AI veterinary assistant is ready to help with your pets and farm animals.
          </p>
        </div>
      </div>

      {/* RIGHT ICON (NO IMAGE DEPENDENCY) */}
      <div className="lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full relative">
        
        {/* main icon */}
        <Stethoscope size={50} className="text-primary" />

        {/* paw overlay */}
        <PawPrint
          size={20}
          className="absolute bottom-4 right-4 text-primary"
        />
      </div>
    </div>
  );
}