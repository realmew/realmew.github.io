"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import MuteButton from "@/components/MuteButton";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
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
    const arr = Array.from({ length: 12 }, () => ({
      width: 24 + Math.random() * 24,
      height: 24 + Math.random() * 24,
      left: Math.random() * 100,
      top: Math.random() * 100,
      y: -30 - Math.random() * 40,
      duration: 7 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${inter.className}`}>
      {/* CinematicIntro removed as requested */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200/20 blur-2xl"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, p.y, 0],
              opacity: [0.15, 0.3, 0.15],
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
      <motion.div
        className="absolute inset-0 w-full h-full -z-20"
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(16px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(16px)' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Image
          src="/test.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-black/70 mix-blend-multiply"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
        />
        <div className="pointer-events-none absolute inset-0 z-20" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="z-20 w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-gray-200"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight text-center mb-4">VISION</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          🗳️ <strong>Voting is now live!</strong> Cast your vote and help shape the future of VISION. Your participation matters in driving our creative vision forward.
        </p>
      </motion.div>
      <MuteButton src="/song.wav" />
    </div>
  );
}
