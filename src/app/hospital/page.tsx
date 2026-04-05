"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Header from "@/components/landing/Header";
import { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Navigation,
  Search,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports for Leaflet (SSR disabled)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Hospital {
  display_name: string;
  lat: string;
  lon: string;
}

export default function HospitalsPage() {
  const [city, setCity] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchedCity, setSearchedCity] = useState("");

  // Create pulsing icon safely (only on client)
  const pulsingIcon = useMemo(() => {
    if (typeof window === "undefined") return null;

    // Safe import and fix for Leaflet
    const L = require("leaflet");

    // Fix default icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    return L.divIcon({
      className: "custom-pulsing-marker",
      html: `
        <div class="pulsing-container">
          <div class="pulse-ring"></div>
          <div class="vet-marker">🏥</div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -40],
    });
  }, []);

  // Auto-detect user location
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          searchNearbyVets(latitude, longitude, "Your Current Location");
          setLocating(false);
        },
        () => {
          setLocating(false);
          setError("Location access denied. Please search manually.");
        }
      );
    }
  }, []);

  const searchNearbyVets = async (lat: number, lon: number, locationName: string = "") => {
    setLoading(true);
    setError("");
    setHospitals([]);
    setSelectedHospital(null);
    setSearchedCity(locationName);

    try {
      const viewbox = `${lon - 0.5},${lat - 0.5},${lon + 0.5},${lat + 0.5}`;

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=veterinary&viewbox=${viewbox}&bounded=1&limit=20`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "VetCareAI/1.0 (contact@vetcareai.com)",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch hospitals");

      const data: Hospital[] = await res.json();
      setHospitals(data);

      if (data.length === 0) {
        setError(`No veterinary hospitals found in ${locationName || "this area"}.`);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch hospitals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const searchHospitals = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setHospitals([]);
    setSelectedHospital(null);

    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`,
        {
          headers: {
            "User-Agent": "VetCareAI/1.0 (contact@vetcareai.com)",
          },
        }
      );

      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError("City not found. Please try another location.");
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = geoData[0];
      const parsedLat = parseFloat(lat);
      const parsedLon = parseFloat(lon);

      setUserLocation({ lat: parsedLat, lon: parsedLon });
      setSearchedCity(display_name.split(",")[0] || city);

      await searchNearbyVets(parsedLat, parsedLon, city.trim());
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (lat: string, lon: string) => {
    if (typeof window !== "undefined") {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen  text-white overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(#22c55e_0.6px,transparent_1px)] bg-[length:50px_50px] opacity-10 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <SignedOut>
          <Header />
        </SignedOut>
        <SignedIn>
          <Navbar />
        </SignedIn>
      </header>

      <div className="pt-24 pb-20 relative p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-900/50 border border-emerald-700 rounded-full mb-6">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-widest text-emerald-300">NEARBY VET CARE</span>
          </div>

          <h1 className="text-6xl font-bold tracking-tighter mb-4">
            Find Trusted <span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">Veterinary Hospitals</span>
          </h1>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
            Locate professional vet care near you instantly. Your animals deserve the best.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-zinc-900/80 border border-emerald-800/70 backdrop-blur-xl rounded-3xl p-3 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && navigator.geolocation) {
                  setLocating(true);
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const { latitude, longitude } = pos.coords;
                      setUserLocation({ lat: latitude, lon: longitude });
                      searchNearbyVets(latitude, longitude, "Your Current Location");
                      setLocating(false);
                    },
                    () => setLocating(false)
                  );
                }
              }}
              disabled={locating}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-5 rounded-2xl font-semibold transition-all disabled:opacity-70"
            >
              {locating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
              {locating ? "Detecting Location..." : "Use My Current Location"}
            </button>

            <div className="flex-1 flex gap-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchHospitals()}
                placeholder="Enter city or area (e.g., Ludhiana)"
                className="flex-1 bg-zinc-900 border border-emerald-800 focus:border-emerald-500 rounded-2xl px-7 py-5 text-lg placeholder:text-emerald-400/60 focus:outline-none"
              />
              <button
                onClick={searchHospitals}
                disabled={loading || !city.trim()}
                className="px-12 bg-white text-black font-semibold rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-3 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="flex items-center justify-center gap-4 py-16 text-emerald-400 text-lg">
            <Loader2 className="w-8 h-8 animate-spin" />
            Finding veterinary hospitals...
          </div>
        )}

        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 p-6 rounded-3xl max-w-md mx-auto flex items-center gap-4">
            <AlertCircle className="w-6 h-6" />
            {error}
          </div>
        )}

        {/* Map + List */}
        {userLocation && hospitals.length > 0 && pulsingIcon && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-emerald-800/70 h-[620px] relative shadow-2xl">
                <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-emerald-700 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-emerald-400" />
                  {searchedCity ? `Hospitals near ${searchedCity}` : "Interactive Map"}
                </div>

                <MapContainer
                  center={[userLocation.lat, userLocation.lon]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />

                  <Marker position={[userLocation.lat, userLocation.lon]}>
                    <Popup>You are here</Popup>
                  </Marker>

                  {hospitals.map((hospital, i) => (
                    <Marker
                      key={i}
                      position={[parseFloat(hospital.lat), parseFloat(hospital.lon)]}
                      icon={pulsingIcon}
                      eventHandlers={{
                        click: () => setSelectedHospital(hospital),
                      }}
                    >
                      <Popup>
                        <div className="text-sm min-w-[200px]">
                          <strong className="block mb-2">{hospital.display_name.split(",")[0]}</strong>
                          <button
                            onClick={() => getDirections(hospital.lat, hospital.lon)}
                            className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 py-2.5 rounded-xl text-white text-xs font-medium"
                          >
                            Get Directions →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Hospital List */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight">
                Veterinary Hospitals {searchedCity && `near ${searchedCity}`} ({hospitals.length})
              </h2>

              <div className="space-y-5 max-h-[580px] overflow-y-auto pr-4 custom-scroll">
                {hospitals.map((hospital, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedHospital(hospital)}
                    className={`group bg-zinc-900 border transition-all duration-300 rounded-3xl p-7 cursor-pointer hover:border-emerald-500 ${
                      selectedHospital?.display_name === hospital.display_name
                        ? "border-emerald-500 shadow-xl shadow-emerald-900/40"
                        : "border-emerald-800 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex gap-5">
                      <div className="w-14 h-14 bg-emerald-900/80 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                        🏥
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl leading-tight group-hover:text-emerald-300 transition-colors">
                          {hospital.display_name.split(",")[0]}
                        </h3>
                        <p className="text-emerald-200/70 text-sm mt-3 line-clamp-3">
                          {hospital.display_name}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <a
                        href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-4 border border-emerald-700 hover:border-emerald-400 rounded-2xl text-sm font-medium transition-colors"
                      >
                        View on Map
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(hospital.lat, hospital.lon);
                        }}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && hospitals.length === 0 && !error && !userLocation && (
          <div className="text-center py-28">
            <div className="text-[120px] mb-8 opacity-80">🐾</div>
            <h3 className="text-4xl font-medium mb-4">Find Care Nearby</h3>
            <p className="text-emerald-200/70 max-w-md mx-auto text-lg">
              Use your current location or enter a city name to discover trusted veterinary hospitals.
            </p>
          </div>
        )}
      </div>

      {/* Pulsing Marker Styles */}
      <style jsx global>{`
        .custom-pulsing-marker { background: transparent; border: none; }
        .pulsing-container {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(163, 230, 77, 0.3);
          border-radius: 50%;
          animation: pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .vet-marker {
          width: 34px;
          height: 34px;
          background: #84cc16;
          color: #0a0f0a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 0 5px rgba(163, 230, 77, 0.5);
          z-index: 2;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 0.9; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #84cc16;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}