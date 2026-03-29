import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ VetCare AI - gender based avatar (same logic, cleaner fallback)
export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";

  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  return `${base}/boy?username=${username}`;
}

// 🇮🇳 Indian phone formatting (UI only, no logic break)
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phone = value.replace(/[^\d]/g, "");

  if (phone.length <= 5) return phone;
  if (phone.length <= 10) {
    return `${phone.slice(0, 5)} ${phone.slice(5, 10)}`;
  }

  return phone.slice(0, 10); // limit to 10 digits
};

// 📅 next 5 days (unchanged logic)
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

// ⏰ slots (same logic)
export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

// 🐾 VetCare AI appointment types (UI updated)
export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "General Animal Checkup", duration: "30 min", price: "₹300" },
  { id: "vaccination", name: "Vaccination", duration: "20 min", price: "₹200" },
  { id: "consultation", name: "Vet Consultation", duration: "25 min", price: "₹250" },
  { id: "emergency", name: "Emergency Treatment", duration: "30 min", price: "₹500" },
];