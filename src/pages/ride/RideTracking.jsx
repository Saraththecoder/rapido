import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Phone, MessageSquare, ShieldCheck, Share2, Star } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useRideStore } from '../../store/useRideStore';
import MapSVG from '../../components/MapSVG';

export default function RideTracking() {
  const navigate = useNavigate();
  const { vehicle, pilot, pickup, dropoff, resetRide } = useRideStore();
  const [etaMins, setEtaMins] = useState(2); // Match Screenshot 3

  useEffect(() => {
    applyTheme('taxi');
    if (!pilot) {
      navigate('/ride');
    }
  }, [pilot, navigate]);

  const handleCancel = () => {
    resetRide();
    navigate('/ride');
  };

  const handleSOS = () => {
    alert("🚨 EMERGENCY SOS SENT! Dispatching location to authorities and emergency contacts.");
  };

  const displayFare = vehicle?.price ? `$${(vehicle.price / 12).toFixed(2)}` : '$12.50'; // Coerce mock price format
  const displayOtp = '8821'; // Match Screenshot 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCancel}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-855" />
          </button>
          <h2 className="text-base font-extrabold uppercase tracking-wider text-[#FF7A00] font-display">
            Ride Tracking
          </h2>
        </div>
        
        {/* SOS Button */}
        <button 
          onClick={handleSOS}
          className="bg-white border border-red-500/30 px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest text-red-650 hover:bg-red-50 transition-colors shadow-xs font-display animate-pulse"
        >
          SOS
        </button>
      </div>

      {/* Map View Area */}
      <div className="relative flex-shrink-0 z-0">
        <MapSVG mode="tracking" />
        
        {/* Floating Pilot Info Card (Overlaying Map as shown in screenshot) */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-3xl p-3.5 shadow-xl flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              {/* Pilot Circle Portrait */}
              <div className="relative shrink-0">
                <img 
                  src="/avatar.png" 
                  className="w-12 h-12 rounded-full border border-orange-500/20 object-cover" 
                  alt="Pilot" 
                />
                <div className="absolute -bottom-1 -right-1 bg-white px-1 rounded-md border border-[#E5E5E5] flex items-center gap-0.5 shadow-xs">
                  <span className="text-[8px] font-black text-orange-600 font-display leading-none font-bold">4.9</span>
                  <Star className="w-2.5 h-2.5 text-orange-500 fill-current" />
                </div>
              </div>
              
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-gray-900 font-display leading-tight truncate">
                  {pilot?.name || 'Alexandria V.'}
                </h3>
                <p className="text-[10px] text-gray-550 font-semibold truncate leading-none mt-1">
                  Orange Scooter • XYZ 1234
                </p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${pilot?.phone || '+919988776655'}`}
                className="p-2.5 rounded-full bg-white hover:bg-gray-50 text-orange-600 transition-colors flex items-center justify-center border border-[#E5E5E5] shadow-xs"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button 
                onClick={() => alert(`Messaging Pilot: I'm waiting at pickup address!`)}
                className="p-2.5 rounded-full bg-white hover:bg-gray-50 text-orange-600 transition-colors flex items-center justify-center border border-[#E5E5E5] shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Milestone Timeline Sheet */}
      <div className="flex-1 bg-[#F8F8F8] border-t border-[#E5E5E5] px-5 pt-5 pb-8 rounded-t-3xl shadow-2xl flex flex-col justify-between mt-[-20px] z-10 overflow-y-auto scrollbar-none">
        
        <div className="space-y-5">
          {/* Arriving Counter and OTP verification row */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="block text-[10px] font-black text-gray-550 uppercase tracking-widest font-bold">Arriving In</span>
              <span className="text-2xl font-black text-gray-900 font-display mt-0.5 block leading-none">
                {etaMins} mins
              </span>
            </div>

            {/* OTP Panel */}
            <div className="bg-white border border-[#FF7A00]/20 rounded-2xl px-4 py-2.5 text-center shadow-xs">
              <span className="block text-[8px] font-extrabold text-[#FF7A00] uppercase tracking-widest leading-none">Your OTP</span>
              <span className="text-sm font-black text-gray-950 font-mono mt-1 block tracking-wider leading-none">
                {displayOtp}
              </span>
            </div>
          </div>

          {/* Timeline Node connector */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 flex gap-3.5 relative text-xs">
            <div className="flex flex-col items-center justify-between py-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#B3A6F2] shrink-0"></div>
              <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></div>
            </div>
            
            <div className="flex-1 space-y-2 text-left min-w-0">
              <div>
                <span className="block text-[9px] text-gray-450 font-bold uppercase tracking-wider">Pick-up</span>
                <span className="text-gray-800 font-extrabold truncate block">{pickup || 'The High-End Plaza, East Wing'}</span>
              </div>
              <div className="border-t border-[#E5E5E5]"></div>
              <div>
                <span className="block text-[9px] text-gray-450 font-bold uppercase tracking-wider">Drop-off</span>
                <span className="text-gray-800 font-extrabold truncate block">{dropoff || '42 Galactic Avenue'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fare + Actions Row */}
        <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">Estimated Fare</span>
              <span className="text-base font-black text-gray-900 leading-none font-display block mt-1">{displayFare}</span>
            </div>
            
            <button 
              onClick={() => alert(`Copied trip details! Send link to your emergency contacts.`)}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#E5E5E5] rounded-2xl text-[10px] font-extrabold uppercase tracking-wider text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs font-display"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Share Trip</span>
            </button>
          </div>

          <button
            onClick={handleCancel}
            className="w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xs transition-colors font-display"
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </motion.div>
  );
}
