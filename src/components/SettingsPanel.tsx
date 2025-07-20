import React from "react";
import { useSettings } from "./SettingsContext";

export default function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { darkMode, toggleDarkMode } = useSettings();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 min-w-[300px] relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 ${darkMode ? 'justify-end' : 'justify-start'}`}
            onClick={toggleDarkMode}
          >
            <span className={`w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow transition-transform duration-300`}></span>
          </button>
        </div>
        {/* Add more settings here */}
      </div>
    </div>
  );
}
