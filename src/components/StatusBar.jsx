import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function StatusBar() {
  const location = useLocation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine whether to use dark text (light theme) or light text (dark theme)
  // Food theme is light (bg-white), others are dark (taxi, parcel, hub)
  const isFood = location.pathname.startsWith('/food');
  const textColorClass = isFood ? 'text-gray-800' : 'text-white';
  const batteryColorClass = isFood ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`h-11 px-5 flex items-center justify-between z-40 select-none text-[13px] font-semibold ${textColorClass} transition-colors duration-300`}>
      {/* Clock */}
      <span className="font-medium tracking-tight">{time}</span>

      {/* Notch gap placeholder (Desktop view centering spacer) */}
      <div className="hidden md:block w-24"></div>

      {/* Status Indicators */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-wider leading-none">5G</span>
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        
        {/* Battery Icon */}
        <div className="relative w-5.5 h-3 border-1.5 border-current rounded-[4px] flex items-center p-[1px] justify-start">
          <div className={`h-full w-4/5 rounded-[2px] ${batteryColorClass}`}></div>
          <div className="absolute -right-[3px] top-[3px] w-[1.5px] h-[4px] bg-current rounded-r-[1px]"></div>
        </div>
      </div>
    </div>
  );
}
