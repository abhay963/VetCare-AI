"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Stethoscope, Award, PawPrint } from "lucide-react";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [], isLoading } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (isLoading) {
    return <DoctorInfoSkeleton />;
  }

  if (!doctor || !doctor.name) {
    return (
      <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-sm text-muted-foreground">
        Doctor information not available
      </div>
    );
  }

  // Get first letter of name (uppercase)
  const firstLetter = doctor.name.trim().charAt(0).toUpperCase();

  return (
    <div className="group relative flex items-center gap-5 p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
      
      {/* Background accent */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

      {/* Avatar - First Letter */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center ring-2 ring-offset-2 ring-offset-zinc-950 ring-emerald-400/30 shadow-inner">
          <span className="text-3xl font-bold text-white tracking-tighter">
            {firstLetter}
          </span>
        </div>

        {/* Online status */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-zinc-950 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      {/* Doctor Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Stethoscope className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-lg tracking-tight text-white truncate">
            {doctor.name}
          </h3>
        </div>

        <p className="text-sm text-zinc-400 mb-3 line-clamp-1">
          {doctor.speciality || "Veterinary Specialist"}
        </p>

        {/* Status badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            <span className="font-medium">Verified</span>
          </div>
          <div className="text-emerald-400/70">•</div>
          <span className="text-emerald-400 font-medium">Available Now</span>
        </div>
      </div>

      {/* Decorative element */}
      <PawPrint className="absolute bottom-5 right-6 w-12 h-12 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
    </div>
  );
}

// Loading Skeleton
function DoctorInfoSkeleton() {
  return (
    <div className="flex items-center gap-5 p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-zinc-800" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-zinc-800 rounded w-48" />
        <div className="h-4 bg-zinc-800 rounded w-36" />
        <div className="h-3 bg-zinc-800 rounded w-24" />
      </div>
    </div>
  );
}

export default DoctorInfo;