import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { applyTheme } from '../utils/theme';
import RoleModal from '../components/RoleModal';
import { ProfileDrawer } from '../components/DrawerModals';
import { ChevronRight, Bell, Car, Utensils, Box } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Hub() {
  const navigate = useNavigate();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [modalService, setModalService] = useState('ride');
  const [profileOpen, setProfileOpen] = useState(false);

  // Apply the hub theme on mount
  useEffect(() => {
    applyTheme('hub');
  }, []);

  const openModal = (service) => {
    setModalService(service);
    setRoleModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex-1 flex flex-col p-5 pb-28 justify-between relative overflow-y-auto scrollbar-none bg-[#0C0B10]"
    >
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-20%] w-[320px] h-[320px] rounded-full bg-purple-500/10 blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[250px] h-[250px] rounded-full bg-pink-500/5 blur-[80px] pointer-events-none"></div>

      <div className="space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between py-1 bg-transparent border-b border-white/5 z-10">
          <div 
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
          >
            <img 
              src="/avatar.png" 
              className="w-7 h-7 rounded-full border border-purple-500/30 object-cover" 
              alt="Avatar" 
            />
            <span className="font-extrabold text-sm tracking-widest text-white uppercase font-display leading-none">
              LADY PILOT
            </span>
          </div>
          <button className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Main Landing Title Greetings */}
        <div className="text-left z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase font-display">
              LADY PILOT
            </h1>
            <span className="text-[9px] bg-[#2E204B] text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold font-display leading-none">
              Beta
            </span>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Your city. On demand.
          </p>
        </div>

        {/* Service Stack */}
        <div className="space-y-3.5 z-10">
          {/* Card 1 - RIDE */}
          <div
            onClick={() => openModal('ride')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#1A1822] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              {/* Left icon wrapper */}
              <div className="p-3.5 rounded-2xl bg-[#2A233C] text-purple-400 border border-purple-900/10">
                <Car className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-white leading-tight font-display">
                  Ride
                </h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                  Bike • Auto • Cab
                </p>
              </div>
            </div>
            
            {/* Right circular button arrow */}
            <button className="w-8 h-8 rounded-full bg-[#252230] text-gray-400 group-hover:text-white group-hover:bg-[#322F40] transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2 - FOOD */}
          <div
            onClick={() => navigate('/food')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#1A1822] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-[#383120] text-yellow-500 border border-yellow-900/10">
                <Utensils className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-white leading-tight font-display">
                  Food
                </h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                  Restaurants Near You
                </p>
              </div>
            </div>
            
            <button className="w-8 h-8 rounded-full bg-[#252230] text-gray-400 group-hover:text-white group-hover:bg-[#322F40] transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3 - COURIER */}
          <div
            onClick={() => openModal('courier')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#1A1822] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-[#232B3C] text-indigo-400 border border-indigo-900/10">
                <Box className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-white leading-tight font-display">
                  Courier
                </h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                  City-wide Parcel Delivery
                </p>
              </div>
            </div>
            
            <button className="w-8 h-8 rounded-full bg-[#252230] text-gray-400 group-hover:text-white group-hover:bg-[#322F40] transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offers Section */}
        <div className="text-left pt-2 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-xs text-white uppercase tracking-wider font-display">
              Offers For You
            </h3>
            <button className="text-[11px] font-bold text-purple-400 hover:underline">
              View all
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {/* Card 1 */}
            <div className="flex-shrink-0 w-56 rounded-3xl overflow-hidden bg-[#1A1822] border border-white/5 relative">
              <img src="/ride_promo.png" className="w-full h-28 object-cover" alt="Ride Promo" />
              <div className="p-3">
                <span className="inline-block bg-[#2E204B] text-purple-300 border border-purple-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1 font-display">
                  Ride Promo
                </span>
                <h4 className="font-extrabold text-xs text-white leading-tight">50% Off First Ride</h4>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="flex-shrink-0 w-56 rounded-3xl overflow-hidden bg-[#1A1822] border border-white/5 relative">
              <img src="/food_promo.png" className="w-full h-28 object-cover" alt="Food Promo" />
              <div className="p-3">
                <span className="inline-block bg-[#3C321E] text-yellow-400 border border-yellow-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1 font-display">
                  Free Delivery
                </span>
                <h4 className="font-extrabold text-xs text-white leading-tight">Top Rated Restaurants</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav />

      {/* RoleModal portal */}
      <AnimatePresence>
        {roleModalOpen && (
          <RoleModal
            service={modalService}
            onClose={() => setRoleModalOpen(false)}
          />
        )}
        {profileOpen && (
          <ProfileDrawer
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
