"use client";

import Header from "@/components/landing/Header";
import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Search,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom pulsing vet marker
const createPulsingIcon = () => {
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
};

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

  // Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          setLocating(false);
          searchNearbyVets(latitude, longitude);
        },
        () => {
          setLocating(false);
          setError("Please allow location access or search manually.");
        }
      );
    }
  }, []);

  const searchNearbyVets = async (lat: number, lon: number) => {
    setLoading(true);
    setError("");
    setHospitals([]);
    setSelectedHospital(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=veterinary+hospital&` +
        `viewbox=${lon - 0.8},${lat - 0.8},${lon + 0.8},${lat + 0.8}&bounded=1&limit=20`
      );
      const data: Hospital[] = await res.json();
      setHospitals(data);
      if (data.length === 0) setError("No veterinary hospitals found nearby.");
    } catch (err) {
      setError("Unable to fetch hospitals. Please try again.");
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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        setError("City not found. Please try another location.");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];
      setUserLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
      await searchNearbyVets(parseFloat(lat), parseFloat(lon));
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (lat: string, lon: string) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#22c55e_0.6px,transparent_1px)] bg-[length:50px_50px] opacity-10 pointer-events-none" />

      <div className="relative p-6 max-w-7xl mx-auto pt-24 pb-20">
        <Header />

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-900/50 border border-emerald-700 rounded-full mb-6">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-widest text-emerald-300">NEARBY HOSPITAL</span>
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
                if (navigator.geolocation) {
                  setLocating(true);
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const { latitude, longitude } = pos.coords;
                      setUserLocation({ lat: latitude, lon: longitude });
                      searchNearbyVets(latitude, longitude);
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
                className="px-12 bg-white text-black font-semibold rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-3"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        {loading && (
          <div className="flex items-center justify-center gap-4 py-16 text-emerald-400 text-lg">
            <Loader2 className="w-8 h-8 animate-spin" />
            Finding nearby veterinary hospitals...
          </div>
        )}

        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 p-6 rounded-3xl max-w-md mx-auto flex items-center gap-4">
            <AlertCircle className="w-6 h-6" />
            {error}
          </div>
        )}

        {/* Map + List */}
        {userLocation && hospitals.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Map */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-emerald-800/70 h-[620px] relative shadow-2xl">
                <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-emerald-700 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-emerald-400" />
                  Interactive Map
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

                  {/* User Location */}
                  <Marker position={[userLocation.lat, userLocation.lon]}>
                    <Popup>You are here</Popup>
                  </Marker>

                  {/* Hospital Markers with Pulse Animation */}
                  {hospitals.map((hospital, i) => (
                    <Marker
                      key={i}
                      position={[parseFloat(hospital.lat), parseFloat(hospital.lon)]}
                      icon={createPulsingIcon()}
                      eventHandlers={{
                        click: () => setSelectedHospital(hospital),
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong className="block mb-2">{hospital.display_name.split(",")[0]}</strong>
                          <button
                            onClick={() => getDirections(hospital.lat, hospital.lon)}
                            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-xl text-white text-xs font-medium"
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
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Nearby Hospitals ({hospitals.length})</h2>
              </div>

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
                      <div>
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
        {!loading && hospitals.length === 0 && !error && (
          <div className="text-center py-28">
            <div className="text-[120px] mb-8 opacity-80">🐾</div>
            <h3 className="text-4xl font-medium mb-4">Find Care Nearby</h3>
            <p className="text-emerald-200/70 max-w-md mx-auto text-lg">
              Use your current location or search a city to discover trusted veterinary hospitals on the map.
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
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #84cc16;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}