"use client";
import { useEffect, useState } from "react";
// Removed unused motion import

export default function CinematicIntro({ title = "VISION" }: { title?: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-cinematic-fade"
      aria-hidden="true"
    >
      <h1 className="text-6xl font-extrabold text-white tracking-widest drop-shadow-2xl animate-cinematic-title">
        {title}
      </h1>
    </div>
  );
}
