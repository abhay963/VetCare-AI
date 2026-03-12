import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateAvatar(
  name: string,
  gender: "MALE" | "FEMALE"
) {
  const username = name.replace(/\s+/g, "").toLowerCase();

  const base = "https://api.dicebear.com/9.x/personas/svg";

  const background =
    gender === "FEMALE"
      ? "ffdfbf"   // soft warm tone
      : "b6e3f4";  // soft blue tone

  return `${base}?seed=${username}&backgroundColor=${background}`;
}


export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove everything except digits
  let phone = value.replace(/\D/g, "");

  // Remove leading 91 if user typed country code
  if (phone.startsWith("91") && phone.length > 10) {
    phone = phone.slice(2);
  }

  // Limit to max 10 digits
  phone = phone.slice(0, 10);

  if (phone.length <= 5) {
    return `+91 ${phone}`;
  }

  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
};