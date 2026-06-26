import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Wallet, X, User, Clock, Tag, Settings, HelpCircle, MapPin, Bell } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useWalletStore } from '../../store/useWalletStore';
import { useRideStore } from '../../store/useRideStore';
import { useAuthStore } from '../../store/useAuthStore';
import MapSVG from '../../components/MapSVG';
import BottomNav from '../../components/BottomNav';

export default function RideHome() {
  const navigate = useNavigate();
  const balance = useWalletStore((state) => state.balance);
  const { pickup, dropoff, setRoute } = useRideStore();
  const user = useAuthStore((state) => state.user);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pickupInput, setPickupInput] = useState(pickup || '128 Market St, SF');
  const [dropoffInput, setDropoffInput] = useState(dropoff || '');

  // Apply taxi theme on mount
  useEffect(() => {
    applyTheme('taxi');
  }, []);

  const handleFindPilots = (e) => {
    e.preventDefault();
    if (!dropoffInput) return;
    
    // Set route in Zustand store
    setRoute(
      pickupInput === 'Detecting Current Location...' ? '128 Market St, SF' : pickupInput,
      dropoffInput
    );
    navigate('/ride/book');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-[#0C0B10] text-white"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0C0B10] border-b border-white/5 z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <span className="text-sm font-black tracking-widest text-white font-display">
            LADY PILOT
          </span>
        </div>
        
        {/* Notification bell */}
        <button className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Map Area */}
      <div className="relative flex-shrink-0 z-0">
        <MapSVG mode="home" />
      </div>

      {/* Premium Bottom Sheet Address Form */}
      <div className="flex-1 bg-[#1A1822] border-t border-white/5 px-5 pt-5 pb-24 rounded-t-3xl shadow-2xl flex flex-col justify-between mt-[-20px] z-10">
        <div className="space-y-4">
          {/* Header text greeting */}
          <div className="text-left">
            <h2 className="text-xl font-black text-white font-display">
              LADY PILOT
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              Your city. On demand.
            </p>
          </div>

          {/* Address Stack Panel inside dark capsule container */}
          <div className="bg-[#0D0C12] border border-white/5 rounded-2xl p-4 flex gap-3.5 relative">
            {/* Vertical timeline connector */}
            <div className="flex flex-col items-center justify-between py-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B3A6F2] shadow-[0_0_8px_rgba(179,166,242,0.6)] shrink-0"></div>
              <div className="w-0.5 flex-1 bg-gray-800 my-1.5"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FDE047] shadow-[0_0_8px_rgba(253,224,71,0.6)] shrink-0"></div>
            </div>

            {/* Input elements */}
            <div className="flex-1 space-y-3.5">
              <div className="relative">
                <input
                  type="text"
                  value={pickupInput}
                  onChange={(e) => setPickupInput(e.target.value)}
                  placeholder="Detecting Location..."
                  className="w-full bg-transparent border-none p-0 text-xs text-white placeholder-gray-500 font-extrabold focus:outline-none focus:ring-0 leading-none"
                />
              </div>
              <div className="border-t border-white/5"></div>
              <div className="relative">
                <input
                  type="text"
                  value={dropoffInput}
                  onChange={(e) => setDropoffInput(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent border-none p-0 text-xs text-white placeholder-gray-500 font-extrabold focus:outline-none focus:ring-0 leading-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button Action */}
        <div className="pt-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: dropoffInput ? 1.01 : 1 }}
            onClick={handleFindPilots}
            disabled={!dropoffInput}
            className={`w-full py-4 font-black rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 font-display shadow-lg ${
              dropoffInput 
                ? 'btn-grad-yellow shadow-yellow-500/10'
                : 'bg-gray-800 text-gray-550 border border-gray-800 cursor-not-allowed'
            }`}
          >
            Find Lady Pilots
          </motion.button>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav />

      {/* Left Side Drawer Portal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="absolute inset-0 z-50 flex">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            {/* Left slide-in Drawer Panel (75% width) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-3/4 h-full bg-[#1A1822] flex flex-col justify-between z-10 shadow-2xl text-white border-r border-white/5"
            >
              {/* Purple Header Section */}
              <div className="bg-[#7C3AED] p-5 pt-8 text-white relative overflow-hidden">
                {/* mesh lights */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
                
                {/* Close Button X */}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* User Profile Details */}
                <div className="flex items-center gap-3 mt-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-white border-2 border-white/20 overflow-hidden">
                    <img src="/avatar.png" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-extrabold text-base leading-tight font-display">
                      {user?.name || 'Rahul Sharma'}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                      <span className="font-extrabold bg-white/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-display leading-none">
                        ⭐ 4.8
                      </span>
                      <span className="text-purple-200 font-semibold">
                        {user?.phone || '+91 98765 43210'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* White Body Menu Items */}
              <div className="flex-1 px-5 py-4 overflow-y-auto divide-y divide-white/5 text-gray-200">
                <button onClick={() => setIsDrawerOpen(false)} className="w-full flex items-center gap-4 py-4 text-left font-bold text-sm hover:text-purple-400 transition-colors">
                  <User className="w-5 h-5 text-gray-500" />
                  <span>Profile</span>
                </button>
                <button onClick={() => { setIsDrawerOpen(false); navigate('/ride'); }} className="w-full flex items-center gap-4 py-4 text-left font-bold text-sm hover:text-purple-400 transition-colors">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>Ride History</span>
                </button>
                <button onClick={() => setIsDrawerOpen(false)} className="w-full flex items-center gap-4 py-4 text-left font-bold text-sm hover:text-purple-400 transition-colors">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <span>Offers & Promos</span>
                </button>
                <button onClick={() => setIsDrawerOpen(false)} className="w-full flex items-center gap-4 py-4 text-left font-bold text-sm hover:text-purple-400 transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>Settings</span>
                </button>
                <button onClick={() => setIsDrawerOpen(false)} className="w-full flex items-center gap-4 py-4 text-left font-bold text-sm hover:text-purple-400 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Footer Panel */}
              <div className="p-4 border-t border-white/5 text-center bg-[#100E16]">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-display">
                  LADY PILOT v1.0.0
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
