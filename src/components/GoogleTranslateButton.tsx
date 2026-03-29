"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export default function GoogleTranslateButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      setOpen(false);
    }
  };

  // ✅ close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 🌐 BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
      >
        <Globe className="w-5 h-5 text-white" />
      </button>

      {/* 🌍 DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 p-2 rounded-lg border border-zinc-700 shadow-lg z-50">

          <button onClick={() => changeLanguage("en")} className="btn-lang">
            🇬🇧 English
          </button>

          <button onClick={() => changeLanguage("hi")} className="btn-lang">
            🇮🇳 हिंदी
          </button>

          <button onClick={() => changeLanguage("pa")} className="btn-lang">
            🇮🇳 ਪੰਜਾਬੀ
          </button>

          <button onClick={() => changeLanguage("bn")} className="btn-lang">
            🇮🇳 বাংলা
          </button>

          <button onClick={() => changeLanguage("ta")} className="btn-lang">
            🇮🇳 தமிழ்
          </button>

        </div>
      )}

      {/* REQUIRED */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </div>
  );
}