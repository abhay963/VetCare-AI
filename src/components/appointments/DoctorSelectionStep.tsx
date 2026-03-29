"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon, PawPrint } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";

import { createAvatar } from "@dicebear/core";
import { adventurer, avataaars } from "@dicebear/collection";

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

  const getAvatar = (dentist: any) => {
    if (
      dentist.imageUrl &&
      dentist.imageUrl.startsWith("http") &&
      !dentist.imageUrl.includes("avatar.iran.liara.run")
    ) {
      return dentist.imageUrl;
    }

    const seed = dentist.name || "Vet";

    const style = dentist.gender === "MALE" ? adventurer : avataaars;

    const avatar = createAvatar(style, {
      seed,
      size: 128,
      radius: 50,
    });

    return avatar.toDataUri();
  };

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Veterinary Doctor</h2>
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <PawPrint className="w-6 h-6 text-primary" />
        Choose Your Veterinary Doctor
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border border-border/50 ${
              selectedDentistId === dentist.id
                ? "ring-2 ring-primary shadow-lg"
                : ""
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Image
                  src={getAvatar(dentist)}
                  alt={dentist.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  unoptimized
                />

                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {dentist.name}
                  </CardTitle>

                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "Veterinary Specialist"}
                  </CardDescription>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      ({dentist.appointmentCount} cases handled)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Vet Care AI Clinic</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                {dentist.bio ||
                  "Experienced veterinary doctor providing care for animals and livestock."}
              </p>

              <Badge variant="secondary">Verified Vet</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end">
          <Button className="px-6 shadow-md">
            Continue to Time Selection
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectionStep;