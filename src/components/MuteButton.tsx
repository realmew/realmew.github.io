"use client";
import React, { useRef, useState, useEffect } from "react";

export default function MuteButton({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Auto-play the audio when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Autoplay was prevented");
      });
    }
  }, []);

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      // Unmute and play
      audioRef.current.volume = 1;
      audioRef.current.play();
    } else {
      // Mute and pause
      audioRef.current.volume = 0;
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <button
        onClick={handleMuteToggle}
        className={`fixed bottom-12 right-12 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg border border-gray-300/50 hover:bg-white/30 transition-all duration-200 shadow-lg z-50 ${isMuted ? 'ring-2 ring-red-400' : ''}`}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-red-500">
            <line x1="8" y1="8" x2="16" y2="16" />
            <line x1="16" y1="8" x2="8" y2="16" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-blue-600">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
            <path d="M17.5 7a7 7 0 0 1 0 10" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        loop
        style={{ display: "none" }}
      />
    </>
  );
}
