"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import { PawPrint } from "lucide-react";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  const getAvatar = () => {
    if (
      doctor.imageUrl &&
      doctor.imageUrl.startsWith("http") &&
      !doctor.imageUrl.includes("avatar.iran.liara.run")
    ) {
      return doctor.imageUrl;
    }

    const base = "https://avatar.iran.liara.run/public";
    const genderPath = doctor.gender === "MALE" ? "boy" : "girl";
    const username = doctor.name.replace(/\s+/g, "").toLowerCase();

    return `${base}/${genderPath}?username=${username}`;
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 border border-border/50">
      <Image
        src={getAvatar()}
        alt={doctor.name}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
        unoptimized
      />

      <div>
        <h3 className="font-medium flex items-center gap-1">
          <PawPrint className="w-4 h-4 text-primary" />
          {doctor.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {doctor.speciality || "Veterinary Specialist"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;