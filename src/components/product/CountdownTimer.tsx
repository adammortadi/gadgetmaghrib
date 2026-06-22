"use client";

import { useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function CountdownTimer() {
  const { settings } = useSettingsStore();
  const { showTimer, timerHours, timerMinutes, timerSeconds } = settings;
  const [timeLeft, setTimeLeft] = useState({
    hours: timerHours,
    minutes: timerMinutes,
    seconds: timerSeconds
  });

  useEffect(() => {
    if (!showTimer) return;

    const resetTimer = window.setTimeout(() => {
      setTimeLeft({
        hours: timerHours,
        minutes: timerMinutes,
        seconds: timerSeconds
      });
    }, 0);

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

    return () => {
      window.clearTimeout(resetTimer);
      clearInterval(timer);
    };
  }, [showTimer, timerHours, timerMinutes, timerSeconds]);

  if (!showTimer) return null;

  // Calculate progress bar fill percentage (assuming a standard maximum of 24 hours)
  const totalSeconds = (timeLeft.hours * 3600) + (timeLeft.minutes * 60) + timeLeft.seconds;
  const maxOfferSeconds = 24 * 3600; // 24 hours as standard window
  const percentage = Math.min(100, Math.max(0, (totalSeconds / maxOfferSeconds) * 100));

  return (
    <div className="w-full space-y-4 py-2" dir="rtl">
      {/* Digit blocks */}
      <div className="flex justify-center items-center gap-3 md:gap-4 select-none" dir="ltr">
        
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 md:h-16 md:w-16 bg-white border border-neutral-200/80 rounded-xl shadow-premium flex items-center justify-center">
            <span className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 mt-1.5 uppercase tracking-wider">ساعات / H</span>
        </div>
        
        <span className="text-xl font-bold text-neutral-300 mb-5">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 md:h-16 md:w-16 bg-white border border-neutral-200/80 rounded-xl shadow-premium flex items-center justify-center">
            <span className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 mt-1.5 uppercase tracking-wider">دقائق / M</span>
        </div>

        <span className="text-xl font-bold text-neutral-300 mb-5">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 md:h-16 md:w-16 bg-white border border-neutral-200/80 rounded-xl shadow-premium flex items-center justify-center">
            <span className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 mt-1.5 uppercase tracking-wider">ثواني / S</span>
        </div>

      </div>

      {/* Modern, thin progress bar */}
      <div className="max-w-xs mx-auto space-y-1.5 text-center">
        <div className="h-1.5 w-full bg-neutral-200/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(79,70,229,0.3)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
