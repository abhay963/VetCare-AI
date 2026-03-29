"use client";

import { useUpdateDoctor } from "@/hooks/use-doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { Doctor, Gender } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";

/* ✅ FINAL TYPE (matches DoctorsManagement) */
type DoctorWithOptionalCount = Doctor & {
  appointmentCount?: number;
};

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorWithOptionalCount | null;
}

function EditDoctorDialog({
  doctor,
  isOpen,
  onClose,
}: EditDoctorDialogProps) {
  /* ✅ SAFE STATE INIT */
  const [editingDoctor, setEditingDoctor] =
    useState<DoctorWithOptionalCount | null>(null);

  const updateDoctorMutation = useUpdateDoctor();

  /* ✅ Sync doctor when dialog opens */
  useEffect(() => {
    setEditingDoctor(doctor);
  }, [doctor]);

  /* ✅ Phone formatter */
  const handlePhoneChange = (value: string) => {
    if (!editingDoctor) return;

    const formatted = formatPhoneNumber(value);

    setEditingDoctor({
      ...editingDoctor,
      phone: formatted,
    });
  };

  /* ✅ Save handler */
  const handleSave = () => {
    if (!editingDoctor) return;

    updateDoctorMutation.mutate(editingDoctor, {
      onSuccess: handleClose,
    });
  };

  /* ✅ Close handler */
  const handleClose = () => {
    onClose();
    setEditingDoctor(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>
            Update doctor information and status.
          </DialogDescription>
        </DialogHeader>

        {editingDoctor && (
          <div className="grid gap-4 py-4">
            {/* NAME + SPECIALITY */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editingDoctor.name}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Speciality</Label>
                <Input
                  value={editingDoctor.speciality}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      speciality: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editingDoctor.email}
                onChange={(e) =>
                  setEditingDoctor({
                    ...editingDoctor,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={editingDoctor.phone}
                onChange={(e) =>
                  handlePhoneChange(e.target.value)
                }
              />
            </div>

            {/* GENDER + STATUS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>

                <Select
                  value={editingDoctor.gender}
                  onValueChange={(value) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      gender: value as Gender,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="MALE">
                      Male
                    </SelectItem>
                    <SelectItem value="FEMALE">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={
                    editingDoctor.isActive
                      ? "active"
                      : "inactive"
                  }
                  onValueChange={(value) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      isActive: value === "active",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="active">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={
              updateDoctorMutation.isPending ||
              !editingDoctor
            }
          >
            {updateDoctorMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDoctorDialog;