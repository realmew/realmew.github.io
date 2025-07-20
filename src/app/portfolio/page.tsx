

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CinematicIntro from "@/components/CinematicIntro";
import { siteConfig } from "@/config/siteConfig";

export default function PortfolioPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (unlocked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [unlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vsn") {
      setModalOpen(false);
      setTimeout(() => {
        setUnlocked(true);
      }, 200);
    } else {
      alert("Incorrect password");
    }
  };

  const handleIconMouseEnter = () => {
    setIsHovering(true);
    audioRef.current?.play();
  };
  const handleIconMouseLeave = () => {
    setIsHovering(false);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  if (siteConfig.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 relative overflow-hidden">
      {/* Cinematic intro overlay */}
      <CinematicIntro title="ARCHIVWE" />
      <audio ref={audioRef} src="/yandhi.mp3" preload="auto" />
      {/* Full-screen pastel waves on icon hover */}
      {isHovering && <div className="pastel-waves" />}
      {/* Main content (only show before unlock) */}
      {!unlocked && (
        <div className="flex flex-col items-center mt-24 mb-8 relative z-40">
          {/* Vault icon with hover audio and click to open modal */}
          <button
            ref={btnRef}
            className="group relative flex flex-col items-center justify-center mb-6 focus:outline-none bg-transparent border-none p-0"
            onClick={() => setModalOpen(true)}
            onMouseEnter={handleIconMouseEnter}
            onMouseLeave={handleIconMouseLeave}
            aria-label="Enter the vault"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span className="block w-64 h-64 rounded-full overflow-hidden bg-transparent border-none group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <Image src="/icon.jpg" alt="Vault Icon" width={256} height={256} className="object-cover w-full h-full" />
            </span>
          </button>
          <h1 className="mt-8 text-4xl font-extrabold text-gray-900 text-center">VSN Collective</h1>
          <p className="mt-2 text-lg text-gray-600 text-center max-w-md">Welcome to the VSN Collective Vault. Hover over the icon to play music. Click the icon to enter the vault.</p>
        </div>
      )}
      {/* Password modal */}
      {modalOpen && !unlocked && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Enter Password</h2>
            <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
              <input
                type="password"
                className="border border-gray-300 rounded px-6 py-4 text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700 transition-colors w-full"
              >
                Unlock
              </button>
              <button
                type="button"
                className="mt-2 text-gray-500 hover:underline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Vault page */}
      {unlocked && <AlbumGallery />}
    </div>
  );
}

function AlbumGallery() {
  const [selected, setSelected] = useState<null | 'art6' | 'yandhi'>(null);
  const [pressed, setPressed] = useState<null | 'art6' | 'yandhi'>(null);
  return (
    <div className="mt-2 flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">VSN COLLECTIVE VAULT</h1>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl justify-center items-center min-h-[600px]">
        {/* Art6 image slot */}
        <motion.div
          layout
          initial={false}
          animate={selected === 'yandhi' ? { opacity: 0, x: 200, scale: 0.7, pointerEvents: 'none' } : { opacity: 1, x: 0, scale: 1, pointerEvents: 'auto' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="flex flex-col items-center z-10"
          style={{ width: selected === 'art6' ? 400 : 320 }}
        >
          <motion.div
            layout
            className="bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-gray-300 cursor-pointer"
            style={{ width: selected === 'art6' ? 480 : 320, height: selected === 'art6' ? 360 : 240 }}
            onClick={() => setSelected(selected === 'art6' ? null : 'art6')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onTapStart={() => setPressed('art6')}
            onTapCancel={() => setPressed(null)}
            onTap={() => setPressed(null)}
            animate={pressed === 'art6' ? { scale: 0.95 } : { scale: 1 }}
          >
            <Image
              src="/art6.jpg"
              alt="DONDA: With Child"
              width={selected === 'art6' ? 480 : 700}
              height={selected === 'art6' ? 360 : 525}
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="mt-3 text-lg font-semibold text-gray-700">DONDA: With Child</span>
          {selected === 'art6' && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-2 flex flex-col items-center w-full max-w-2xl"
              style={{ fontSize: '1.35rem' }}
            >
              <button className="mb-4 bg-black text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-gray-800 transition-colors text-xl w-full">
                {selected === 'art6' ? 'Download DWC.zip' : 'Download YHNDI.zip'}
              </button>
            </motion.div>
          )}
        </motion.div>
        {/* Yandhi image slot */}
        <motion.div
          layout
          initial={false}
          animate={selected === 'art6' ? { opacity: 0, x: -200, scale: 0.7, pointerEvents: 'none' } : { opacity: 1, x: 0, scale: 1, pointerEvents: 'auto' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="flex flex-col items-center z-10"
          style={{ width: selected === 'yandhi' ? 400 : 320 }}
        >
          <motion.div
            layout
            className="bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-gray-300 cursor-pointer"
            style={{ width: selected === 'yandhi' ? 480 : 320, height: selected === 'yandhi' ? 360 : 240 }}
            onClick={() => setSelected(selected === 'yandhi' ? null : 'yandhi')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onTapStart={() => setPressed('yandhi')}
            onTapCancel={() => setPressed(null)}
            onTap={() => setPressed(null)}
            animate={pressed === 'yandhi' ? { scale: 0.95 } : { scale: 1 }}
          >
            <Image
              src="/yandhi.jpg"
              alt="Yandhi"
              width={selected === 'yandhi' ? 480 : 700}
              height={selected === 'yandhi' ? 360 : 525}
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="mt-3 text-lg font-semibold text-gray-700">Yandhi</span>
          {selected === 'yandhi' && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex flex-col items-center w-full max-w-2xl"
              style={{ fontSize: '1.35rem' }}
            >
              <button className="mb-4 bg-black text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-gray-800 transition-colors text-xl w-full">Download</button>
            </motion.div>
          )}
        </motion.div>
        {/* Details box for selected album */}
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            className="bg-white/90 rounded-2xl shadow-xl ml-0 md:ml-8 flex flex-col items-center justify-center z-20 border border-gray-300"
            style={selected === 'art6'
              ? { width: 400, height: 225, padding: 16, maxWidth: '97vw', aspectRatio: '16/9' }
              : { width: 900, height: 500, padding: 48, maxWidth: '95vw' }}
          >
            <h2 className={selected === 'art6' ? "text-5xl font-extrabold mb-8 text-gray-900 text-center w-full" : "text-3xl font-bold mb-4 text-gray-900 text-center w-full"}>{selected === 'art6' ? 'DONDA: With Child' : 'Yandhi'}</h2>
            <p className={selected === 'art6' ? "text-gray-700 mb-8 text-center w-full text-2xl" : "text-gray-700 mb-4 text-center w-full text-lg"}>
              {selected === 'art6'
                ? 'Details about DONDA: With Child album go here. Add tracklist, release info, or any description you want.'
                : 'Details about Yandhi album go here. Add tracklist, release info, or any description you want.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
