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

/* ✅ FINAL TYPE */
type DoctorWithCount = Doctor & {
  appointmentCount?: number;
};

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorWithCount | null>(null);

  /* ✅ Open edit dialog */
  const handleEditDoctor = (doctor: DoctorWithCount) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  /* ✅ Close edit dialog */
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  /* ✅ Avatar generator */
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
      {/* ================= CARD ================= */}
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
                className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition"
              >
                {/* LEFT SIDE */}
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
                    <div className="font-semibold">
                      {doctor.name}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {doctor.speciality}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {doctor.email} • {doctor.phone}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                  {/* Appointments */}
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {doctor.appointmentCount ?? 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {/* Status */}
                  {doctor.isActive ? (
                    <Badge>Active</Badge>
                  ) : (
                    <Badge variant="secondary">
                      Inactive
                    </Badge>
                  )}

                  {/* Edit Button */}
                  <Button
                    variant="outline"
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    <EditIcon className="size-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ================= ADD ================= */}
      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {/* ================= EDIT ================= */}
      <EditDoctorDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}  // ✅ DIRECT PASS (NO TYPE ERROR)
      />
    </>
  );
}

export default DoctorsManagement;