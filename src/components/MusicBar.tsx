"use client";
import React, { useRef, useState } from "react";

export default function MusicBar({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white/40 dark:bg-gray-900/40 rounded-lg shadow flex items-center gap-2 px-2 py-1 border border-gray-200 dark:border-gray-700 backdrop-blur-md" style={{ minHeight: 36, opacity: 0.98 }}>
      <button
        onClick={handlePlayPause}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        )}
      </button>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        className="flex-1 h-2 accent-blue-500 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none"
        style={{ minWidth: 120 }}
      />
      <span className="text-xs text-gray-700 dark:text-gray-300 w-16 text-right">
        {formatTime(progress)} / {formatTime(duration)}
      </span>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        style={{ display: "none" }}
      />
    </div>
  );
}

function formatTime(time: number) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
