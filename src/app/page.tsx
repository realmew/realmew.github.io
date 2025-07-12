"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useRef, useState, useEffect } from "react";

import ScrapbookMenu from "@/components/ScrapbookMenu";
import CinematicIntro from "@/components/CinematicIntro";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });



export default function Home() {
  // Helper for letter-by-letter animation
  const title = "VISION";
  // Generate floating particle data once on the client to avoid hydration errors
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    y: number;
    duration: number;
    delay: number;
  }>>([]);
  useEffect(() => {
    // Only run on client
    const arr = Array.from({ length: 18 }, () => ({
      width: 16 + Math.random() * 32,
      height: 16 + Math.random() * 32,
      left: Math.random() * 100,
      top: Math.random() * 100,
      y: -40 - Math.random() * 60,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 4,
    }));
    setParticles(arr);
  }, []);
  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${inter.className}`}>
      {/* Cinematic intro overlay */}
      <CinematicIntro />
      {/* Scrapbook/tape style menu button and dropdown (shared component, pastel) */}
      <ScrapbookMenu />
      {/* Floating particles for cinematic effect */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-2xl"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, p.y, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Cinematic animated background with parallax/zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full -z-20"
        style={{ position: "absolute" }}
        initial={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      >
        <Image
          src="/test.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 mix-blend-multiply"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
        />
        {/* Soft vignette for filmic look */}
        <div className="pointer-events-none absolute inset-0 z-20" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }} />
      </motion.div>

      {/* Animated VISION heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
        className="z-20 text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-widest text-center mb-12 mt-8 select-none"
        aria-label="VISION"
      >
        VISION
      </motion.h1>

      {/* Cinematic fade-in for menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
        className="z-30"
      >
        <AudioPlayer />
      </motion.div>
    </div>
  );
}

// AudioPlayer component
function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [debug, setDebug] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      if (!isFinite(audio.duration) || audio.duration === 0) {
        setDebug("Metadata loaded, but duration is 0 or invalid. Check audio file format.");
      } else {
        setDebug(null);
      }
    };
    const onError = () => setDebug("Audio failed to load. Check file path and format.");
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);
    // Try to autoplay on mount
    audio.play().catch(() => setIsPlaying(false));
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => setIsPlaying((p) => !p);
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
    setProgress(audioRef.current.currentTime);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col items-center gap-2 bg-black/60 py-4 z-50 shadow-2xl">
      <audio ref={audioRef} src="/song.wav" preload="auto" />
      <div className="w-full max-w-md h-2 bg-white/30 rounded cursor-pointer" onClick={handleBarClick}>
        <div
          className="h-2 bg-blue-400 rounded"
          style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
        />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 font-bold shadow transition-colors"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <span className="text-xs text-white/80">
          {formatTime(progress)} / {duration > 0 ? formatTime(duration) : "--:--"}
        </span>
      </div>
      {debug && (
        <div className="text-xs text-red-400 mt-1">{debug}</div>
      )}
    </div>
  );
}

function formatTime(time: number) {
  if (!isFinite(time) || time < 0) return "--:--";
  const min = Math.floor(time / 60).toString();
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
