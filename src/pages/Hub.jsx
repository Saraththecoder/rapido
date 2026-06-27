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
      className="flex-1 flex flex-col p-5 pb-28 justify-between relative overflow-y-auto scrollbar-none bg-[#FFFFFF]"
    >
      {/* Subtle Warm Glow Effects */}
      <div className="absolute top-[-10%] left-[-20%] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[250px] h-[250px] rounded-full bg-orange-500/3 blur-[80px] pointer-events-none"></div>

      <div className="space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between py-1 bg-transparent border-b border-[#E5E5E5] z-10">
          <div 
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
          >
            <img 
              src="/avatar.png" 
              className="w-7 h-7 rounded-full border border-orange-500/20 object-cover" 
              alt="Avatar" 
            />
            <span className="font-extrabold text-sm tracking-widest text-gray-900 uppercase font-display leading-none">
              SWIFTGO
            </span>
          </div>
          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Main Landing Title Greetings */}
        <div className="text-left z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase font-display">
              SWIFTGO
            </h1>
            <span className="text-[9px] bg-orange-500/10 text-orange-650 border border-orange-500/20 px-2 py-0.5 rounded-full font-bold font-display leading-none">
              Beta
            </span>
          </div>
          <p className="text-xs text-gray-550 font-semibold mt-1">
            Your city. On demand.
          </p>
        </div>

        {/* Service Stack */}
        <div className="space-y-3.5 z-10">
          {/* Card 1 - RIDE */}
          <div
            onClick={() => openModal('ride')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#F8F8F8] border border-[#E5E5E5] hover:border-orange-500/30 hover:bg-[#FFFFFF] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              {/* Left icon wrapper */}
              <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-500/10">
                <Car className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-gray-900 leading-tight font-display">
                  Ride
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                  Bike • Auto • Cab
                </p>
              </div>
            </div>
            
            {/* Right circular button arrow */}
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] text-gray-400 group-hover:text-gray-700 group-hover:bg-gray-50 transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2 - FOOD */}
          <div
            onClick={() => openModal('food')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#F8F8F8] border border-[#E5E5E5] hover:border-orange-500/30 hover:bg-[#FFFFFF] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-500/10">
                <Utensils className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-gray-900 leading-tight font-display">
                  Food
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                  Restaurants Near You
                </p>
              </div>
            </div>
            
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] text-gray-400 group-hover:text-gray-700 group-hover:bg-gray-50 transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3 - COURIER */}
          <div
            onClick={() => openModal('courier')}
            className="flex items-center justify-between p-4 rounded-3xl bg-[#F8F8F8] border border-[#E5E5E5] hover:border-orange-500/30 hover:bg-[#FFFFFF] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-500/10">
                <Box className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-gray-900 leading-tight font-display">
                  Courier
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                  City-wide Parcel Delivery
                </p>
              </div>
            </div>
            
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] text-gray-400 group-hover:text-gray-700 group-hover:bg-gray-50 transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offers Section */}
        <div className="text-left pt-2 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider font-display">
              Offers For You
            </h3>
            <button className="text-[11px] font-bold text-orange-600 hover:underline">
              View all
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {/* Card 1 */}
            <div className="flex-shrink-0 w-56 rounded-3xl overflow-hidden bg-[#F8F8F8] border border-[#E5E5E5] relative shadow-xs">
              <img src="/ride_promo.png" className="w-full h-28 object-cover" alt="Ride Promo" />
              <div className="p-3">
                <span className="inline-block bg-orange-50 text-orange-600 border border-orange-500/10 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1 font-display">
                  Ride Promo
                </span>
                <h4 className="font-extrabold text-xs text-gray-800 leading-tight">50% Off First Ride</h4>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="flex-shrink-0 w-56 rounded-3xl overflow-hidden bg-[#F8F8F8] border border-[#E5E5E5] relative shadow-xs">
              <img src="/food_promo.png" className="w-full h-28 object-cover" alt="Food Promo" />
              <div className="p-3">
                <span className="inline-block bg-orange-50 text-orange-650 border border-orange-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1 font-display">
                  Free Delivery
                </span>
                <h4 className="font-extrabold text-xs text-gray-800 leading-tight">Top Rated Restaurants</h4>
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
