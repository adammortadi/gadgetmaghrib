"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect } from "react";

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const bgStyle = settings.useBackgroundImage 
    ? { backgroundImage: "url('/site-bg.png')" } 
    : { backgroundColor: settings.backgroundColor };

  return (
    <div 
      className="min-h-screen flex flex-col bg-fixed bg-cover bg-center transition-colors duration-500"
      style={bgStyle}
    >
      {children}
    </div>
  );
}
