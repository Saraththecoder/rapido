import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CreditCard, ChevronRight, Loader2, Bike, Car } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useWalletStore } from '../../store/useWalletStore';
import { useRideStore } from '../../store/useRideStore';
import { getPilotByVehicle } from '../../data/riders';
import MapSVG from '../../components/MapSVG';
import { fakeDelay } from '../../utils/fakeDelay';

// Vehicle options mapping matching Screenshot 2
const VEHICLES = [
  { id: 'bike', label: 'Bike', icon: '🛵', price: 45, displayPrice: '$3', eta: '3 min' },
  { id: 'auto', label: 'Auto', icon: '🛺', price: 89, displayPrice: '$6', eta: '5 min' },
  { id: 'cab', label: 'Cab', icon: '🚗', price: 149, displayPrice: '$12', eta: '8 min' }
];

export default function RideBook() {
  const navigate = useNavigate();
  const { pickup, dropoff, selectVehicle, assignPilot, updateStatus } = useRideStore();
  const { balance, deduct } = useWalletStore();
  
  const [selectedId, setSelectedId] = useState('auto'); // Default to Auto as shown in Screenshot 2
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    applyTheme('taxi');
    if (!dropoff) {
      navigate('/ride');
    }
  }, [dropoff, navigate]);

  const handleConfirmBooking = async () => {
    const selectedVehicle = VEHICLES.find(v => v.id === selectedId);
    if (!selectedVehicle) return;

    if (balance < selectedVehicle.price) {
      alert("Insufficient wallet balance! Please switch roles or top up.");
      return;
    }

    setIsSearching(true);
    updateStatus('searching');

    // Simulate search delay (2s)
    await fakeDelay(2000);

    selectVehicle(selectedVehicle);
    const assignedPilot = getPilotByVehicle(selectedVehicle.id);
    assignPilot(assignedPilot);
    updateStatus('assigned');

    // Deduct cost
    deduct(selectedVehicle.price);

    setIsSearching(false);
    navigate('/ride/tracking');
  };

  const selectedVehicleObj = VEHICLES.find(v => v.id === selectedId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E5E5E5] z-10">
        <button 
          onClick={() => navigate('/ride')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-805" />
        </button>
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 font-display">
          Choose a Ride
        </h2>
      </div>

      {/* Map View */}
      <div className="relative flex-shrink-0 z-0">
        <MapSVG mode="route" />
      </div>

      {/* Bottom Sheet Visual Layout */}
      <div className="flex-1 bg-[#F8F8F8] border-t border-[#E5E5E5] p-5 rounded-t-3xl shadow-2xl flex flex-col justify-between mt-[-20px] z-10">
        <div className="space-y-5">
          {/* Pickup and Dropoff Static Displays */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 flex gap-3 relative text-xs">
            <div className="flex flex-col items-center justify-between py-1">
              <div className="w-2 h-2 rounded-full bg-[#B3A6F2]"></div>
              <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF7A00]"></div>
            </div>
            
            <div className="flex-1 space-y-2 text-left">
              <div className="text-gray-800 font-extrabold truncate">{pickup || '128 Market St, SF'}</div>
              <div className="border-t border-[#E5E5E5]"></div>
              <div className="text-gray-800 font-extrabold truncate">{dropoff || 'Where to?'}</div>
            </div>
          </div>

          {/* Grid Selection Block */}
          <div className="grid grid-cols-3 gap-3">
            {VEHICLES.map((vehicle) => {
              const isSelected = selectedId === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedId(vehicle.id)}
                  className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#FF7A00] bg-[#FFF4E5] text-[#FF7A00]'
                      : 'border-[#E5E5E5] bg-white text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="text-3xl block mb-2 filter drop-shadow">{vehicle.icon}</span>
                  <div className="text-center">
                    <span className={`block text-[11px] font-extrabold font-display ${isSelected ? 'text-[#FF7A00]' : 'text-gray-600'}`}>
                      {vehicle.label}
                    </span>
                    <span className={`block text-xs font-black mt-1 font-display ${isSelected ? 'text-[#FF7A00]' : 'text-gray-900'}`}>
                      {vehicle.displayPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Selection Indicator */}
          <div className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-extrabold text-gray-700 font-display">
                Personal • Card ...4242
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Place Booking Action */}
        <div className="pt-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleConfirmBooking}
            className="w-full py-4 bg-[#FF7A00] text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-orange-500/10 font-display hover:bg-[#ff9133] transition-colors"
          >
            Find Drivers
          </motion.button>
        </div>
      </div>

      {/* Matching Overlay Loading screen */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative mb-6">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                🛵
              </div>
            </div>
            <h3 className="text-base font-black text-gray-900 uppercase tracking-wider font-display">
              Finding your driver
            </h3>
            <p className="text-[11px] text-gray-650 font-semibold max-w-[200px] mt-2 leading-relaxed">
              Locating nearby verified partners for a secure, safe trip...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
