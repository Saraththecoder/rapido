import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Phone, MapPin, Package, Check, Clipboard, ShieldCheck } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useRideStore } from '../../store/useRideStore';
import MapSVG from '../../components/MapSVG';

const STAGES = [
  { id: 'pickup', label: 'Rider Heading to Pickup' },
  { id: 'collected', label: 'Collected & In Transit' },
  { id: 'out_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered Successfully' }
];

export default function CourierTracking() {
  const navigate = useNavigate();
  const { courier, resetRide } = useRideStore();
  const [activeStep, setActiveStep] = useState(1); // Collected & In Transit

  useEffect(() => {
    applyTheme('parcel');
    
    // Autoplay simulated shipping progress
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < STAGES.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 15000); // Advance every 15s

    return () => clearInterval(interval);
  }, []);

  const handleCompleteShipment = () => {
    alert("Delivery confirmed! OTP verification successful. Thank you for using SwiftGo Courier!");
    resetRide();
    navigate('/courier');
  };

  const parcelId = courier?.price ? `SG-7834-TRP` : 'SG-7834-TRP'; // Mock tracking ID
  const recipientName = courier?.recipientName || 'Sneha Reddy';
  const deliveryAddress = courier?.deliveryAddress || 'Gachibowli DLF, Hyderabad';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900 font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/courier')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-805 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#FF7A00] font-display animate-pulse">
            Shipment Tracking
          </h2>
        </div>

        {/* Tracking ID badge */}
        <span className="font-mono text-[10px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
          #{parcelId}
        </span>
      </div>

      {/* Map View */}
      <div className="relative flex-shrink-0 z-0">
        <MapSVG mode="tracking" />
        
        {/* Floating Courier Partner Details Card */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-3xl p-3.5 shadow-xl flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 text-[#FF7A00] flex items-center justify-center font-black text-sm">
                MK
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-gray-900 leading-tight">Meena Kumari</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-orange-600">⭐ 4.8</span>
                  <span className="text-[10px] text-gray-500 font-semibold truncate max-w-[120px]">Bajaj Maxima • Auto</span>
                </div>
              </div>
            </div>

            <a 
              href="tel:+919988776655"
              className="flex items-center gap-1 bg-white border border-[#E5E5E5] px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Milestone Timeline Sheet */}
      <div className="flex-1 bg-[#F8F8F8] border-t border-[#E5E5E5] px-5 pt-5 pb-24 rounded-t-3xl shadow-2xl flex flex-col justify-between mt-[-20px] z-10 overflow-y-auto scrollbar-none">
        
        <div className="space-y-4">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block text-left">
            Delivery Status
          </span>

          {/* Stepper Timeline List */}
          <div className="space-y-4">
            {STAGES.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isActive = idx === activeStep;

              return (
                <div key={step.id} className="flex gap-4 items-start text-left">
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white font-bold' 
                        : isActive
                          ? 'bg-orange-550/20 border-[#FF7A00] text-[#FF7A00] font-bold animate-pulse'
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? '✓' : isActive ? '●' : ''}
                    </div>
                    {idx < STAGES.length - 1 && (
                      <div className={`w-0.5 h-6 my-1 ${
                        idx < activeStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>

                  <div className="pt-0.5">
                    <span className={`text-xs font-bold ${
                      isCompleted ? 'text-gray-800' : isActive ? 'text-[#FF7A00]' : 'text-gray-450'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="block text-[8px] text-orange-600 font-bold uppercase tracking-wider mt-0.5 leading-none">
                        In Transit
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete Shipment Floating CTA Box */}
      <div className="bg-white border-t border-[#E5E5E5] p-4 absolute bottom-0 left-0 right-0 z-20 space-y-4">
        <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-3xl p-4.5 flex flex-col gap-4 shadow-sm text-left">
          
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white border border-[#E5E5E5] text-orange-500 shrink-0">
              <Clipboard className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none block mb-1">Delivering To</span>
              <h4 className="font-extrabold text-xs text-gray-900 leading-tight truncate">{recipientName}</h4>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{deliveryAddress}</p>
            </div>
          </div>

          <button
            onClick={handleCompleteShipment}
            className="w-full py-4 bg-[#FF7A00] text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 font-display hover:bg-[#ff9133] transition-colors"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Complete Shipment (Simulate)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
