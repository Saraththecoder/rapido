import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wallet, Package, Clock, MapPin } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useWalletStore } from '../../store/useWalletStore';
import { useRideStore } from '../../store/useRideStore';
import { MOCK_SHIPMENTS } from '../../data/parcels';
import MapSVG from '../../components/MapSVG';
import BottomNav from '../../components/BottomNav';
import { ProfileDrawer } from '../../components/DrawerModals';

export default function CourierHome() {
  const navigate = useNavigate();
  const balance = useWalletStore((state) => state.balance);
  const { courier } = useRideStore();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    applyTheme('parcel');
  }, []);

  const hasActiveCourier = courier && courier.status !== 'idle' && courier.status !== 'delivered';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-[#111827] text-white"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-gray-800 z-10">
        <div 
          onClick={() => setProfileOpen(true)}
          className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img src="/avatar.png" className="w-7 h-7 rounded-full object-cover border border-yellow-450/20" alt="Profile" />
          <span className="text-sm font-black tracking-widest text-yellow-400 font-display">
            LADY PILOT COURIER
          </span>
        </div>
        
        {/* Wallet Balance */}
        <div className="flex items-center gap-1.5 bg-yellow-400 text-gray-950 px-2.5 py-1 rounded-full font-bold text-[11px] shadow-sm">
          <Wallet className="w-3.5 h-3.5" />
          <span>₹ {balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Hero Section with Map Background */}
        <div className="relative h-[240px] border-b border-gray-800 overflow-hidden shadow-inner flex flex-col justify-end p-5">
          <div className="absolute inset-0 z-0 opacity-40">
            <MapSVG mode="home" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent z-1"></div>

          {/* Headline details overlay */}
          <div className="relative z-10 text-left space-y-1">
            <h1 className="text-xl font-black uppercase text-white tracking-wide">
              Send Parcels. Fast.
            </h1>
            <p className="text-xs text-gray-400 font-semibold max-w-[280px]">
              Verified female partners for safe, reliable city-wide package courier delivery.
            </p>
            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/courier/book')}
                className="bg-yellow-400 text-gray-950 font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span>Book a Pickup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Active Courier Tracking Shortcut banner */}
        {hasActiveCourier && (
          <div className="p-4">
            <div 
              onClick={() => navigate('/courier/tracking')}
              className="bg-yellow-450/10 border-2 border-yellow-400/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-yellow-450/20 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-450/20 text-yellow-400 flex items-center justify-center border border-yellow-450/30">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-gray-150">Active Shipment In Transit</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">ID: #LP-7834-TRP • {courier.recipientName}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        )}

        {/* History / Recent Shipments */}
        <div className="p-4 text-left">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">
            Recent Shipments
          </h3>

          <div className="space-y-3">
            {MOCK_SHIPMENTS.map((shipment) => (
              <div 
                key={shipment.id}
                className="bg-gray-900 border border-gray-850 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3 pr-2 min-w-0">
                  <div className="p-2.5 rounded-xl bg-gray-800 text-gray-400 shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-250 font-mono">{shipment.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${
                        shipment.status === 'Delivered' 
                          ? 'bg-green-500/10 text-green-450 border border-green-500/20' 
                          : 'bg-yellow-400/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {shipment.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                      <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                      <span className="truncate">{shipment.destination}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">DATE</span>
                  <span className="text-[10px] text-gray-300 font-bold mt-0.5 block">{shipment.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav />

      {/* Profile Drawer */}
      <AnimatePresence>
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
