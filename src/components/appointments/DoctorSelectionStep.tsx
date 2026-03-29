"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import { useState } from "react";

interface Dentist {
  id: string;
  name: string;
  imageUrl: string;
  speciality: string;
  phone: string;
  bio: string | null;
  appointmentCount: number;
}

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Doctor</h2>
        <DoctorCardsLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Your Doctor</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(dentists as Dentist[]).map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedDentistId === dentist.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">

                {/* 🔥 AVATAR */}
                <Avatar name={dentist.name} imageUrl={dentist.imageUrl} />

                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {dentist.name}
                  </CardTitle>

                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "General Vet"}
                  </CardDescription>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      ({dentist.appointmentCount ?? 0} appointments)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>VetCare AI</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone || "Not Available"}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                {dentist.bio ||
                  "Experienced professional providing quality care."}
              </p>

              <Badge variant="secondary">Licensed Professional</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>
            Continue to Time Selection
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectionStep;

//////////////////////////////////////////////////////////
// 🔥 AVATAR COMPONENT (FINAL FIXED)
//////////////////////////////////////////////////////////

function Avatar({ name, imageUrl }: { name: string; imageUrl: string }) {
  const [error, setError] = useState(false);

  const safeName = name || "Doctor";

  // ✅ Correct DiceBear (v9)
  const dicebearUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    safeName
  )}`;

  const finalSrc = imageUrl || dicebearUrl;

  // 🔤 fallback (if image fails)
  if (error) {
    return (
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
        {safeName.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={safeName}
      width={64}
      height={64}
      onError={() => setError(true)}
      className="w-16 h-16 rounded-full object-cover"
    />
  );
}