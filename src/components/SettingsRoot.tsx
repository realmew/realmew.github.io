"use client";
import React from "react";
import { SettingsProvider } from "./SettingsContext";
import SettingsPanel from "./SettingsPanel";

export default function SettingsRoot({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  return (
    <SettingsProvider>
      {/* Settings button in top right */}
      <button
        className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-full shadow p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={() => setSettingsOpen(true)}
        aria-label="Open settings"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06c.46.46 1.12.6 1.82.33h.09c.7 0 1.31-.4 1.51-1V3a2 2 0 0 1 4 0v.09c0 .7.4 1.31 1 1.51.7.27 1.36.13 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .7.4 1.31 1 1.51.7.27 1.36.13 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .7-.4 1.31-1 1.51z" />
        </svg>
      </button>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {children}
    </SettingsProvider>
  );
}
