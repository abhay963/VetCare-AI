
"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, Volume2, Square, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/landing/Header";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: number;
}

export default function RemediesPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cleanup speech synthesis
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Text-to-Speech
  const speak = (text: string, messageId: number) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentlySpeakingId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentlySpeakingId(null);
  };

  // Voice Input
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      inputRef.current?.focus(); // Return focus to input
    };

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  // Send Message
  const sendMessage = async () => {
    const query = input.trim();
    if (!query || loading) return;

    const userMessage: Message = {
      role: "user",
      content: query,
      id: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/remedies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease: query }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.result || "Sorry, no response received.",
        id: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speak(data.result, assistantMessage.id);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        role: "assistant",
        content: "Maaf kijiye, kuch technical issue aa gaya. Kripya dobara try karein.",
        id: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-zinc-950 shadow-lg backdrop-blur-md bg-opacity-90 border-b border-zinc-800">
        <Header />
      </header>

      {/* Main Chat Area (Scrollable) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Container (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="max-w-3xl mx-auto flex flex-col space-y-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-12 px-4"
              >
                <div className="relative mb-8">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20 shadow-lg">
                    <Stethoscope className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl sm:text-5xl animate-bounce">🐄</div>
                  <div className="absolute -bottom-2 -left-2 text-3xl sm:text-4xl animate-pulse">🐕</div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pashu Doctor</h1>
                <p className="text-emerald-400 text-base sm:text-lg mb-4">Aapke pashuon ka AI dost</p>
                <p className="max-w-xs sm:max-w-sm text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Apni gaay, bhains, bhed-bakri ya pet ki bimari bataiye.
                  <br />
                  Main Hindi aur English mein upchar bataunga.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex gap-2 sm:gap-3 max-w-[85%] items-start">
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                          <Stethoscope className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div
                        className={`p-3 sm:p-4 rounded-2xl text-sm sm:text-[15px] leading-relaxed break-words ${
                          msg.role === "user"
                            ? "bg-emerald-600 text-white rounded-tr-none"
                            : "bg-zinc-900 border border-zinc-800 rounded-tl-none"
                        }`}
                      >
                        {msg.content}

                        {msg.role === "assistant" && (
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => speak(msg.content, msg.id)}
                              disabled={isSpeaking && currentlySpeakingId === msg.id}
                              aria-label="Read aloud"
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-700 transition flex items-center gap-1.5 text-xs"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              Suniye
                            </button>

                            {isSpeaking && currentlySpeakingId === msg.id && (
                              <button
                                onClick={stopSpeaking}
                                aria-label="Stop reading"
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-1.5 text-xs"
                              >
                                <Square className="w-3.5 h-3.5" />
                                Rokiye
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0 mt-1">
                          👤
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Typing Indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 items-start max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-emerald-400 italic">
                    Best ilaaj soch raha hoon...
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Input Area */}
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent px-4 pb-6 pt-2 z-50">
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-2 shadow-2xl flex items-center gap-2 focus-within:border-emerald-500 transition">
              <button
                onClick={startListening}
                disabled={loading}
                aria-label={isListening ? "Listening..." : "Start voice input"}
                className={`p-3 rounded-2xl transition-all focus:outline-none ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
                placeholder="Apne pashu ki dikkat batayein..."
                className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-sm placeholder-zinc-500 min-h-[48px]"
                disabled={loading}
                aria-label="Type your message"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="p-3 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                ) : (
                  <Send className="w-6 h-6 text-emerald-500" />
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-zinc-500 mt-3 uppercase tracking-widest">
              VetCare AI • Emergency mein turant doctor se sampark karein
            </p>
          </div>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #27272a;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #27272a;
          border-radius: 10px;
          border: 2px solid #18181b;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #10b981;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}