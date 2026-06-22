"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect, useState } from "react";

export default function DynamicBackground({ 
  children
}: { 
  children: React.ReactNode;
}) {
  const { settings, fetchSettings, currentBackgroundOverride } = useSettingsStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Wait for zustand persist to rehydrate from localStorage before rendering
    // dynamic styles. This prevents the background from flickering on first load.
    const unsub = useSettingsStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // If hydration already completed before this effect ran, mark it immediately
    if (useSettingsStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (hydrated) {
      fetchSettings();
    }
  }, [hydrated, fetchSettings]);

  // Before the store is hydrated, always show the zellige background image
  // so there's no flash of a blank/colored background on first visit.
  const bgStyle = !hydrated
    ? { backgroundImage: "url('/site-bg.png')" }
    : currentBackgroundOverride 
      ? { backgroundColor: currentBackgroundOverride }
      : settings.useBackgroundImage 
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
