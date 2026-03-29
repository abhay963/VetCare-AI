"use client";

import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";

import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

import { Doctor } from "@prisma/client";

/* ✅ FINAL FIXED TYPE */
type DoctorWithCount = Doctor & {
  appointmentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorWithCount | null>(null);

  const handleEditDoctor = (doctor: DoctorWithCount) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  const getAvatar = (doctor: DoctorWithCount) => {
    if (
      doctor.imageUrl &&
      doctor.imageUrl.startsWith("http") &&
      !doctor.imageUrl.includes("avatar.iran.liara.run")
    ) {
      return doctor.imageUrl;
    }

    const avatar = createAvatar(adventurer, {
      seed: doctor.name,
      size: 128,
      radius: 50,
    });

    return avatar.toDataUri();
  };

  return (
    <>
      <Card className="mb-12 shadow-md border border-border/50">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <StethoscopeIcon className="size-5 text-primary" />
              Veterinary Doctors
            </CardTitle>
            <CardDescription>
              Manage and oversee all veterinary doctors
            </CardDescription>
          </div>

          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusIcon className="mr-2 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {(doctors as DoctorWithCount[]).map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={getAvatar(doctor)}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                    unoptimized
                  />

                  <div>
                    <div className="font-semibold">{doctor.name}</div>

                    <div className="text-sm text-muted-foreground">
                      {doctor.speciality}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {doctor.email} • {doctor.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {doctor.appointmentCount ?? 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {doctor.isActive ? (
                    <Badge>Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}

                  <Button onClick={() => handleEditDoctor(doctor)}>
                    <EditIcon className="size-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {/* ✅ FINAL FIX */}
      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={
          selectedDoctor
            ? {
                id: selectedDoctor.id,
                name: selectedDoctor.name,
                email: selectedDoctor.email,
                phone: selectedDoctor.phone,
                speciality: selectedDoctor.speciality,
                bio: selectedDoctor.bio,
                imageUrl: selectedDoctor.imageUrl,
                gender: selectedDoctor.gender,
                isActive: selectedDoctor.isActive,
                createdAt: selectedDoctor.createdAt,
                updatedAt: selectedDoctor.updatedAt,
              }
            : null
        }
      />
    </>
  );
}

export default DoctorsManagement;