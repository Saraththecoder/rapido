import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Phone, ChevronDown, ChevronUp, Clock, MapPin, Utensils, Home } from 'lucide-react';
import { applyTheme } from '../../utils/theme';

const STAGES = [
  { id: 'placed', label: 'Order Placed' },
  { id: 'accepted', label: 'Restaurant Accepted' },
  { id: 'out', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' }
];

export default function FoodOrderTracking() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1); // Default to 'Restaurant Accepted'
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    applyTheme('food');
    
    // Auto-advance delivery status milestones to simulate progress
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STAGES.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 12000); // 12 seconds per step

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900 font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/food')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            Track Order
          </h2>
        </div>

        {/* Live Tracking indicator */}
        <span className="bg-orange-50 text-orange-500 font-bold border border-orange-200 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          Active Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-5 pb-8">
        
        {/* ETA & Countdown Display */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4.5 text-center flex items-center justify-center gap-3">
          <Clock className="w-8 h-8 text-orange-500 shrink-0 animate-bounce" />
          <div className="text-left">
            <span className="block text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none">Estimated Delivery</span>
            <span className="text-lg font-black text-gray-900 mt-1 block leading-none">Arriving in 24 min</span>
          </div>
        </div>

        {/* Custom Fork-to-Door Metaphor SVG Map */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
            <span>Restaurant Kitchen</span>
            <span>Your Doorstep</span>
          </div>

          {/* Inline SVG showing fork-to-door path */}
          <div className="w-full h-24 flex items-center justify-center">
            <svg viewBox="0 0 350 80" className="w-full h-full text-gray-300">
              {/* Ground road path line */}
              <path 
                d="M 40 40 L 310 40" 
                stroke="#e2e8f0" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
              
              {/* Active path indicator */}
              <path 
                d="M 40 40 L 310 40" 
                stroke="#FC8019" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeDasharray="8 6"
                className="animate-dash"
              />

              {/* Fork (Restaurant Node) Left */}
              <g transform="translate(40, 40)">
                <circle cx="0" cy="0" r="14" fill="#FC8019" opacity="0.2" className="animate-ping" />
                <circle cx="0" cy="0" r="10" fill="#FC8019" />
                <Utensils className="w-3.5 h-3.5 text-white absolute" style={{ transform: 'translate(-7px, -7px)' }} />
              </g>

              {/* Door (Home Node) Right */}
              <g transform="translate(310, 40)">
                <circle cx="0" cy="0" r="10" fill="#475569" />
                <Home className="w-3.5 h-3.5 text-white absolute" style={{ transform: 'translate(-7px, -7px)' }} />
              </g>

              {/* Scooter Delivery Rider moving along path */}
              {/* Simulated translation */}
              <g transform={`translate(${40 + (activeStep / (STAGES.length - 1)) * 270}, 40)`}>
                <circle cx="0" cy="0" r="12" fill="#FC8019" opacity="0.4" className="animate-pulse" />
                <circle cx="0" cy="0" r="7" fill="#FC8019" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Delivery Partner Details Card */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3.5">
            Delivery Partner Assigned
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                KS
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-gray-900 leading-tight">Kavitha S.</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1 rounded">⭐ 4.7</span>
                  <span className="text-[10px] text-gray-400 font-semibold">TVS Scoty · Verified Pilot</span>
                </div>
              </div>
            </div>

            <a 
              href="tel:+919876501234"
              className="flex items-center gap-1 bg-white border border-gray-250 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Milestone Vertical Progress Tracker */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">
            Delivery Progress
          </span>

          <div className="space-y-4">
            {STAGES.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isActive = idx === activeStep;

              return (
                <div key={step.id} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white font-bold' 
                        : isActive
                          ? 'bg-orange-500/20 border-orange-500 text-orange-500 font-bold animate-pulse'
                          : 'bg-gray-200 border-gray-300 text-gray-400'
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
                      isCompleted ? 'text-gray-800' : isActive ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="block text-[8px] text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                        Active Step
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Accordion Card */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl overflow-hidden">
          <button
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-gray-700 hover:bg-gray-100/50 transition-colors"
          >
            <span className="uppercase tracking-widest text-[10px] font-black text-gray-500">Order Summary Receipt</span>
            {summaryOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {summaryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 text-left text-xs font-semibold text-gray-500 space-y-2 border-t border-gray-150/50 pt-3"
              >
                <div className="flex justify-between">
                  <span>Special Chicken Biryani × 1</span>
                  <span>₹299</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>₹30</span>
                </div>
                <div className="flex justify-between border-t border-gray-150/40 pt-2 font-black text-gray-800 text-sm">
                  <span>Total Paid</span>
                  <span className="text-orange-500">₹329</span>
                </div>
                <div className="mt-2 text-[10px] text-gray-400 leading-tight">
                  Payment Mode: Lady Pilot Wallet balance deduction.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
