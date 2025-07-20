"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.querySelector('html')?.classList.add('dark');
      } else {
        document.querySelector('html')?.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <SettingsContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
