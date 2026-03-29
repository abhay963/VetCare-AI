"use client";

import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
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

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const [phoneError, setPhoneError] = useState("");

  const createDoctorMutation = useCreateDoctor();

  // 🇮🇳 Indian phone validation
  const handlePhoneChange = (value: string) => {
    // allow only numbers
    const cleaned = value.replace(/\D/g, "");

    // max 10 digits
    if (cleaned.length <= 10) {
      setNewDoctor({ ...newDoctor, phone: cleaned });

      if (cleaned.length === 10) {
        setPhoneError("");
      } else {
        setPhoneError("Enter valid 10-digit Indian number");
      }
    }
  };

  const handleSave = () => {
    if (newDoctor.phone.length !== 10) {
      setPhoneError("Enter valid 10-digit Indian number");
      return;
    }

    createDoctorMutation.mutate(
      {
        ...newDoctor,
        phone: `+91${newDoctor.phone}`, // store with country code
      },
      { onSuccess: handleClose }
    );
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
    setPhoneError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>🐾 Add Veterinary Doctor</DialogTitle>
          <DialogDescription>
            Add a new veterinary doctor to Vet Care AI platform.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. Sharma"
              />
            </div>

            <div className="space-y-2">
              <Label>Speciality *</Label>
              <Input
                value={newDoctor.speciality}
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    speciality: e.target.value,
                  })
                }
                placeholder="Veterinary Surgeon"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={newDoctor.email}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, email: e.target.value })
              }
              placeholder="doctor@vetcare.ai"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone (India)</Label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 bg-muted rounded-md text-sm">
                +91
              </span>
              <Input
                value={newDoctor.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="9876543210"
              />
            </div>

            {phoneError && (
              <p className="text-sm text-red-500">{phoneError}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={newDoctor.gender}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({
                    ...newDoctor,
                    isActive: value === "active",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.speciality ||
              newDoctor.phone.length !== 10 ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog;