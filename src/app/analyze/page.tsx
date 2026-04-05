"use client";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, PawPrint, Loader2, X, Leaf, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnalyzePage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image");

    setLoading(true);
    setResult("");

    try {
      const base64 = await toBase64(image);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, symptoms }),
      });

      const data = await res.json();
      setResult(data.result || "No result returned.");
    } catch (error) {
      setResult("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white">
      <Navbar />

      <div className="max-w-5xl mt-9 mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center gap-4 mb-6">
            <Leaf className="text-emerald-400" size={48} />
            <PawPrint className="text-emerald-400" size={48} />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Analyze with AI
          </h1>
          <p className="mt-4 text-xl text-emerald-200 max-w-lg mx-auto">
            Upload animal photo • Get instant, simple veterinary advice
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-xl bg-zinc-900/80 border border-emerald-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                📸 Upload Animal Photo
              </h2>

              <div
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 min-h-[340px] flex items-center justify-center
                  ${preview ? "border-emerald-600 bg-emerald-950/30" : "border-emerald-700 hover:border-emerald-500"}`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {!preview ? (
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-900 rounded-full flex items-center justify-center mb-6">
                      <Upload size={42} className="text-emerald-400" />
                    </div>
                    <p className="text-xl font-medium">Drag & drop or click to upload</p>
                    <p className="text-emerald-400 mt-2">JPG, PNG supported • Cow, Buffalo, Goat, Dog etc.</p>
                  </label>
                ) : (
                  <div className="relative w-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full rounded-2xl shadow-2xl object-cover max-h-[340px]"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-xl"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Symptoms */}
            <div className="backdrop-blur-xl bg-zinc-900/80 border border-emerald-700/50 rounded-3xl p-8">
              <label className="text-emerald-300 font-medium mb-3 flex items-center gap-2">
                <Leaf size={22} /> Describe Symptoms (Optional)
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: Cow not eating, swelling on udder, less milk, limping..."
                className="w-full h-40 p-5 rounded-2xl bg-black/60 border border-emerald-800 focus:border-emerald-500 text-white placeholder:text-emerald-600 resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading || !image}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-2xl shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={28} />
                  AI is Analyzing...
                </>
              ) : (
                <>
                  <PawPrint size={28} />
                  Get Veterinary Advice
                </>
              )}
            </Button>

           <Link href="/remedies">
  <Button
    className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-2xl shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-3"
  >
    Talk With AI
  </Button>
</Link>

          </motion.div>

          {/* Right: Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8 self-start"
          >
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="backdrop-blur-xl bg-zinc-900/90 border border-emerald-700/60 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-emerald-500/10 p-4 rounded-2xl">
                      <PawPrint className="text-emerald-400" size={40} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-emerald-100">AI Diagnosis Report</h2>
                      <p className="text-emerald-400">Simple & Practical Advice</p>
                    </div>
                  </div>

                  {/* Beautiful Formatted Result */}
                  <div className="prose prose-invert prose-emerald max-w-none text-lg leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-10 pt-8 border-t border-emerald-800 flex items-start gap-3 text-sm text-emerald-400/80">
                    <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" />
                    <p>
                      This is AI-generated advice for quick help. 
                      <strong className="text-emerald-300"> Always consult a real veterinarian</strong> for serious cases.
                    </p>
                  </div>
                </motion.div>
              )}

              {!result && !loading && (
                <div className="backdrop-blur-xl bg-zinc-900/50 border border-emerald-800/50 rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center">
                  <Heart className="text-emerald-600 mb-6" size={80} />
                  <p className="text-emerald-300 text-xl">
                    Upload a clear photo of your animal<br />
                    and get instant health advice
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}