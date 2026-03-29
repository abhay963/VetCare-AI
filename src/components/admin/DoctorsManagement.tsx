import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EditIcon, MailIcon, PhoneIcon, PlusIcon, StethoscopeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";
import { createAvatar } from "@dicebear/core";
import { adventurer, avataaars } from "@dicebear/collection";
function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

 



const getAvatar = (doctor: Doctor) => {
  if (
    doctor.imageUrl &&
    doctor.imageUrl.startsWith("http") &&
    !doctor.imageUrl.includes("avatar.iran.liara.run")
  ) {
    return doctor.imageUrl;
  }

  const seed = doctor.name || "Doctor";

  const style = doctor.gender === "MALE" ? adventurer : avataaars;

  const avatar = createAvatar(style, {
    seed,
    size: 128,
    radius: 50, // circle avatar
  });

  return avatar.toDataUri(); // ✅ NO API CALL
};

  return (
    <>
      <Card className="mb-12 shadow-lg border border-border/40">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <StethoscopeIcon className="size-5 text-primary" />
              Veterinary Doctors
            </CardTitle>
            <CardDescription>
              Manage and oversee all veterinary doctors in Vet Care AI
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/100 shadow-md"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={getAvatar(doctor)}
                      alt={doctor.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover ring-2 ring-primary/20"
                      onError={(e) => {
                        // ✅ FINAL FALLBACK (never breaks)
                        (e.target as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=Doctor";
                      }}
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                  </div>

                  <div>
                    <div className="font-semibold">{doctor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {doctor.speciality}

                      <span className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3" />
                        {doctor.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {doctor.appointmentCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {doctor.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 hover:bg-primary/10"
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

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

export default DoctorsManagement;