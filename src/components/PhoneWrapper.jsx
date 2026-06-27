import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatusBar from './StatusBar';
import { useAuthStore } from '../store/useAuthStore';

export default function PhoneWrapper() {
  const location = useLocation();
  const path = location.pathname;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Global Auth Guard: if unauthenticated and not on an /auth/* route, redirect to /auth
  if (!isAuthenticated && !path.startsWith('/auth')) {
    return <Navigate to="/auth" replace />;
  }

  // If already authenticated and trying to visit any /auth/* route, redirect back to home /
  if (isAuthenticated && path.startsWith('/auth')) {
    return <Navigate to="/" replace />;
  }

  // Determine Dynamic Island sizing and content dynamically
  let islandContent = null;
  let islandWidth = 110;
  let islandHeight = 30;

  if (path === '/ride/tracking') {
    islandWidth = 220;
    islandHeight = 32;
    islandContent = (
      <div className="flex items-center justify-between w-full px-2 text-[9px] font-bold text-white uppercase tracking-wider">
        <span className="text-xs shrink-0">🛵</span>
        <span className="text-lp-orange font-black truncate max-w-[110px] mx-1 font-display">Priya • TS09</span>
        <span className="text-[8px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded leading-none shrink-0 font-display animate-pulse">En Route</span>
      </div>
    );
  } else if (path === '/food/tracking') {
    islandWidth = 220;
    islandHeight = 32;
    islandContent = (
      <div className="flex items-center justify-between w-full px-2 text-[9px] font-bold text-white uppercase tracking-wider">
        <span className="text-xs shrink-0">🍔</span>
        <span className="text-lp-orange font-black truncate max-w-[110px] mx-1 font-display">Preparing</span>
        <span className="text-[8px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded leading-none shrink-0 font-display">24 Min</span>
      </div>
    );
  } else if (path === '/courier/tracking') {
    islandWidth = 220;
    islandHeight = 32;
    islandContent = (
      <div className="flex items-center justify-between w-full px-2 text-[9px] font-bold text-white uppercase tracking-wider">
        <span className="text-xs shrink-0">📦</span>
        <span className="text-lp-orange font-black truncate max-w-[110px] mx-1 font-display">Transit</span>
        <span className="text-[8px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded leading-none shrink-0 font-display">Meena K.</span>
      </div>
    );
  } else {
    // Compact Default State
    islandContent = (
      <div className="flex items-center justify-between w-full px-0.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 shrink-0"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse shrink-0"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-950 via-slate-950 to-black md:p-6 select-none font-sans overflow-x-hidden">
      {/* Phone simulator outer shell */}
      <div className="w-full h-[100vh] h-[100dvh] md:w-[390px] md:h-[min(844px,92vh)] md:rounded-[3rem] md:border-[10px] md:border-gray-800 md:shadow-2xl md:bg-gray-900 flex flex-col relative overflow-hidden transition-all duration-300">
        
        {/* Dynamic Island Capsule (Only on Desktop) */}
        <motion.div 
          layout
          style={{ width: islandWidth, height: islandHeight }}
          transition={{ type: 'spring', damping: 22, stiffness: 240 }}
          className="hidden md:flex absolute top-3.5 left-1/2 -translate-x-1/2 bg-black rounded-full z-50 items-center justify-between px-3.5 shadow-lg pointer-events-none border border-white/5 overflow-hidden"
        >
          {islandContent}
        </motion.div>

        {/* Home Indicator Bar (Only on Desktop) */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-gray-600/80 rounded-full z-50 pointer-events-none"></div>

        {/* Screen container */}
        <div className="w-full h-full bg-[var(--color-bg)] flex flex-col relative overflow-hidden transition-colors duration-300">
          <StatusBar />
          
          <div className="flex-1 overflow-y-auto scrollbar-none relative flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 md:pb-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
