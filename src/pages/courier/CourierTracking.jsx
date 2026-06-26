import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Package, Phone, FileText, CheckCircle, Camera } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useRideStore } from '../../store/useRideStore';
import MapSVG from '../../components/MapSVG';

const COURIER_STEPS = [
  { id: 'scheduled', label: 'Pickup Scheduled' },
  { id: 'collected', label: 'Parcel Collected' },
  { id: 'transit', label: 'In Transit' },
  { id: 'out_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' }
];

export default function CourierTracking() {
  const navigate = useNavigate();
  const { courier, resetRide } = useRideStore();
  const [activeStep, setActiveStep] = useState(2); // Start at 'In Transit' (index 2)
  const [showProof, setShowProof] = useState(false);

  useEffect(() => {
    applyTheme('parcel');

    // Auto-advance courier steps to show simulated delivery progress
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < COURIER_STEPS.length - 1) {
          const nextStep = prev + 1;
          if (nextStep === COURIER_STEPS.length - 1) {
            setShowProof(true); // Show proof of delivery once it is marked 'Delivered'
          }
          return nextStep;
        }
        clearInterval(timer);
        return prev;
      });
    }, 12000); // 12 seconds per step

    return () => clearInterval(timer);
  }, []);

  const handleCompleteShipment = () => {
    alert("Delivery confirmed! OTP verification successful. Thank you for using Lady Pilot Courier!");
    resetRide();
    navigate('/courier');
  };

  const parcelId = courier?.price ? `LP-7834-TRP` : 'LP-7834-TRP'; // Mock tracking ID
  const recipientName = courier?.recipientName || 'Sneha Reddy';
  const deliveryAddress = courier?.deliveryAddress || 'Gachibowli DLF, Hyderabad';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-[#111827] text-white font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-gray-800 z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/courier')}
            className="p-1 rounded-full hover:bg-gray-850 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
            Track Parcel
          </h2>
        </div>

        {/* Tracking ID badge */}
        <span className="font-mono text-[10px] font-black text-yellow-400 bg-yellow-450/15 border border-yellow-400/25 px-2 py-0.5 rounded">
          #{parcelId}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-8">
        
        {/* Pilot Info Details */}
        <div className="p-4 text-left">
          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-4 shadow-lg">
            <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider mb-2.5">Your Courier Partner</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black border border-purple-500/30 flex items-center justify-center text-sm">
                  MK
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-gray-150 leading-tight">Meena Kumari</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold text-yellow-400">⭐ 4.8</span>
                    <span className="text-[10px] text-gray-400 font-semibold truncate max-w-[120px]">Bajaj Maxima • Auto</span>
                  </div>
                </div>
              </div>

              <a 
                href="tel:+919988776655"
                className="flex items-center gap-1 bg-gray-850 border border-gray-750 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-300 hover:bg-gray-800 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Live Vector map */}
        <div className="relative">
          <MapSVG mode="tracking" />
        </div>

        {/* Courier steps milestone list */}
        <div className="p-5 text-left space-y-4">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">
            Shipment Timeline
          </h4>

          <div className="space-y-4">
            {COURIER_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isActive = idx === activeStep;

              return (
                <div key={step.id} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white font-bold' 
                        : isActive
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-bold animate-pulse'
                          : 'bg-gray-800 border-gray-700 text-gray-500'
                    }`}>
                      {isCompleted ? '✓' : isActive ? '●' : ''}
                    </div>
                    {idx < COURIER_STEPS.length - 1 && (
                      <div className={`w-0.5 h-6 my-1 ${
                        idx < activeStep ? 'bg-green-500' : 'bg-gray-800'
                      }`}></div>
                    )}
                  </div>

                  <div className="pt-0.5">
                    <span className={`text-xs font-bold ${
                      isCompleted ? 'text-gray-300' : isActive ? 'text-yellow-400' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="block text-[8px] text-yellow-400/70 font-semibold uppercase tracking-wider mt-0.5 leading-none">
                        In Transit
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proof of Delivery / OTP Section */}
        <AnimatePresence>
          {showProof && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-4 bg-gray-900 border border-gray-800 rounded-2xl p-4.5 text-left space-y-4 shadow-lg"
            >
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Delivery Confirmation Proof
                </span>
                
                {/* Simulated photo proof grey box */}
                <div className="h-32 rounded-xl bg-gray-800 flex flex-col items-center justify-center text-gray-500 gap-1.5 border border-dashed border-gray-700">
                  <Camera className="w-8 h-8 opacity-45" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Photo Proof Attached</span>
                  <span className="text-[9px] text-gray-600 font-semibold">LP-Courier-System-Sign.png</span>
                </div>
              </div>

              {/* Complete Delivery Action */}
              <button
                onClick={handleCompleteShipment}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm Courier Received ➔</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recipient meta footer */}
      <div className="bg-gray-900 border-t border-gray-800 px-5 py-4 flex items-center justify-between mt-auto z-10 text-left text-xs">
        <div>
          <span className="text-[9px] text-gray-500 font-bold uppercase block">Recipient</span>
          <span className="font-extrabold text-white leading-none block mt-0.5">{recipientName}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-gray-500 font-bold uppercase block">Destination</span>
          <span className="font-semibold text-gray-300 truncate max-w-[150px] leading-none block mt-0.5">{deliveryAddress}</span>
        </div>
      </div>
    </motion.div>
  );
}
