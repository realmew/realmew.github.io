
"use client";
import React, { useState } from "react";
import Image from "next/image";
import CinematicIntro from "@/components/CinematicIntro";
import { siteConfig } from "@/config/siteConfig";

export default function ArchivePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  if (siteConfig.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-900 relative overflow-hidden">
      {/* Cinematic intro overlay */}
      <CinematicIntro title="ARCHIVE" />
      <audio ref={audioRef} src="/yandhi.mp3" preload="auto" />
      {/* Full-screen pastel waves on icon hover */}
      {isHovering && <div className="pastel-waves" />}
      {/* Main content (only show before unlock) */}
      {!unlocked && (
        <div className="flex flex-col items-center mt-24 mb-8 relative z-40">
          <h2 className="text-3xl font-bold mb-4">Access the Archive</h2>
          <p className="text-base text-gray-700 mb-6 text-center max-w-lg">
            The VISION Archive contains a curated selection of past works, creative projects, and milestones. Enter the password to unlock exclusive content and explore our creative journey.
          </p>
          {/* Vault icon with hover audio and click to open modal */}
          <button
            ref={btnRef}
            className="group relative flex flex-col items-center justify-center mb-6 focus:outline-none bg-transparent border-none p-0"
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => { setIsHovering(true); audioRef.current?.play(); }}
            onMouseLeave={() => { setIsHovering(false); audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0; }}
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
      {/* Archive content would go here when unlocked */}
      {unlocked && (
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Archive Content</h2>
          <p className="text-center text-gray-600">Archive gallery will be displayed here when implemented.</p>
        </div>
      )}
    </div>
  );
}
