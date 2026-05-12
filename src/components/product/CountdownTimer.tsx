"use client";

import { useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function CountdownTimer() {
  const { settings } = useSettingsStore();
  const [timeLeft, setTimeLeft] = useState({
    hours: settings.timerHours,
    minutes: settings.timerMinutes,
    seconds: settings.timerSeconds
  });

  useEffect(() => {
    if (!settings.showTimer) return;

    setTimeLeft({
      hours: settings.timerHours,
      minutes: settings.timerMinutes,
      seconds: settings.timerSeconds
    });

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings]);

  if (!settings.showTimer) return null;

  return (
    <div className="bg-[#2d0a3d] py-4 w-full flex justify-center items-center gap-8 md:gap-12 mt-6 rounded-sm shadow-inner" dir="ltr">
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-5xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase mt-1">H</span>
      </div>
      <span className="text-2xl md:text-4xl font-black text-white/30">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-5xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase mt-1">M</span>
      </div>
      <span className="text-2xl md:text-4xl font-black text-white/30">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-5xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase mt-1">S</span>
      </div>
    </div>
  );
}
