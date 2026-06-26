import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, ToggleLeft, ToggleRight, DollarSign, Clock, Bike, Compass, MapPin } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useWalletStore } from '../../store/useWalletStore';

const MOCK_JOB = {
  id: 'JOB-9021',
  customer: 'Rahul Sharma',
  pickup: 'Jubilee Hills Road No. 36',
  dropoff: 'Hitech City Cyber Towers',
  distance: '4.8 km',
  fare: 89,
  otp: '7342'
};

export default function RideRiderConsole() {
  const navigate = useNavigate();
  const { add } = useWalletStore();
  
  const [isOnline, setIsOnline] = useState(false);
  const [incomingJob, setIncomingJob] = useState(null);
  const [countdown, setCountdown] = useState(15);
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripStage, setTripStage] = useState('accepted'); // 'accepted' | 'picked_up' | 'completed'
  const [todayEarnings, setTodayEarnings] = useState(1240);
  const [todayTrips, setTodayTrips] = useState(8);

  useEffect(() => {
    applyTheme('taxi');
  }, []);

  // Simulate an incoming job after going online
  useEffect(() => {
    let jobTimeout;
    if (isOnline && !activeTrip && !incomingJob) {
      jobTimeout = setTimeout(() => {
        setIncomingJob(MOCK_JOB);
        setCountdown(15);
      }, 3000);
    }
    return () => clearTimeout(jobTimeout);
  }, [isOnline, activeTrip, incomingJob]);

  // Countdown timer for incoming job
  useEffect(() => {
    let timer;
    if (incomingJob && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0 && incomingJob) {
      setIncomingJob(null);
    }
    return () => clearInterval(timer);
  }, [incomingJob, countdown]);

  const handleDecline = () => {
    setIncomingJob(null);
  };

  const handleAccept = () => {
    setActiveTrip(incomingJob);
    setIncomingJob(null);
    setTripStage('accepted');
  };

  const handleStatusChange = () => {
    setIsOnline(!isOnline);
    setIncomingJob(null);
  };

  const handleTripAction = () => {
    if (tripStage === 'accepted') {
      setTripStage('picked_up');
    } else if (tripStage === 'picked_up') {
      // Complete trip: increment wallet store balance and rider earnings
      add(activeTrip.fare);
      setTodayEarnings(prev => prev + activeTrip.fare);
      setTodayTrips(prev => prev + 1);
      
      setTripStage('completed');
      
      setTimeout(() => {
        setActiveTrip(null);
      }, 2000);
    }
  };

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
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-base font-extrabold uppercase tracking-wider text-white">
            Rider Console
          </h2>
        </div>

        {/* Toggle Switch */}
        <div 
          onClick={handleStatusChange}
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className={`text-[10px] font-black uppercase tracking-wider ${isOnline ? 'text-green-400' : 'text-red-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <motion.div className="flex items-center">
            {isOnline ? (
              <ToggleRight className="w-7 h-7 text-green-400" />
            ) : (
              <ToggleLeft className="w-7 h-7 text-gray-500" />
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20">
        {/* Earnings Card */}
        <div className="bg-[#1F2937] border border-gray-850 rounded-2xl p-4.5 mb-5 shadow-lg text-left">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Today's Summary</span>
          <div className="grid grid-cols-3 gap-2">
            <div className="border-r border-gray-800 pr-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Earnings</span>
              <span className="text-base font-black text-yellow-400 block mt-0.5">₹ {todayEarnings}</span>
            </div>
            <div className="border-r border-gray-800 px-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Trips</span>
              <span className="text-base font-black text-gray-100 block mt-0.5">{todayTrips}</span>
            </div>
            <div className="pl-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Hours</span>
              <span className="text-base font-black text-gray-100 block mt-0.5">6.5</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="space-y-4">
          {/* Active Job Layout */}
          {activeTrip && (
            <div className="bg-gray-900 border-2 border-yellow-400 rounded-2xl p-4 shadow-xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-950 font-black px-3 py-1 text-[9px] uppercase tracking-wider rounded-bl-xl">
                Active Job
              </div>

              {tripStage === 'completed' ? (
                <div className="text-center py-6">
                  <span className="text-4xl block mb-2">🏆</span>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Trip Completed!</h3>
                  <p className="text-xs text-yellow-400 font-bold mt-1">₹ {activeTrip.fare} added to wallet balance</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Customer Name</span>
                    <span className="font-extrabold text-sm text-gray-200">{activeTrip.customer}</span>
                    <span className="ml-3 inline-block bg-yellow-450/20 text-yellow-400 font-bold border border-yellow-400/20 text-[10px] px-2 py-0.5 rounded font-mono">
                      OTP: {activeTrip.otp}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-400 mb-4 bg-gray-950/40 p-3 rounded-xl border border-gray-850">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-gray-300">Pickup:</strong> {activeTrip.pickup}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-gray-300">Dropoff:</strong> {activeTrip.dropoff}
                      </div>
                    </div>
                  </div>

                  {/* Navigation CTA */}
                  <button 
                    onClick={() => alert(`Redirecting to Google Maps navigation route: ${activeTrip.pickup} -> ${activeTrip.dropoff}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-800 hover:bg-gray-750 text-gray-200 font-bold rounded-xl text-[10px] uppercase tracking-wider border border-gray-750 mb-3"
                  >
                    <Compass className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Open Navigation Maps</span>
                  </button>

                  {/* Trip Stage Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTripAction}
                    className="w-full py-3 bg-yellow-400 text-gray-950 font-black rounded-xl text-xs uppercase tracking-widest shadow-md"
                  >
                    {tripStage === 'accepted' ? 'Confirm Picked Up ➔' : 'Deliver & Complete Trip ➔'}
                  </motion.button>
                </>
              )}
            </div>
          )}

          {/* Incoming Job Banner */}
          <AnimatePresence>
            {incomingJob && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-gray-900 border border-gray-850 rounded-2xl p-4.5 shadow-xl text-left"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black bg-yellow-400 text-gray-950 px-2 py-0.5 rounded uppercase tracking-wider">
                    New Ride Request
                  </span>
                  
                  {/* Countdown ring details */}
                  <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                    <span>{countdown}s left</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-gray-300 mb-4">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-400">Pickup:</strong> {incomingJob.pickup}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-400">Dropoff:</strong> {incomingJob.dropoff}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-950/50 p-2.5 rounded-xl border border-gray-850 text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold block">DISTANCE</span>
                    <span className="font-extrabold text-gray-250">{incomingJob.distance}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-500 font-bold block">EST. FARE</span>
                    <span className="font-black text-yellow-450 text-sm">₹{incomingJob.fare}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDecline}
                    className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-750 text-gray-400 font-bold rounded-xl text-xs uppercase tracking-wider"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-2.5 bg-yellow-400 hover:bg-yellow-350 text-gray-950 font-black rounded-xl text-xs uppercase tracking-wider"
                  >
                    Accept
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder Status Displays */}
          {!isOnline && (
            <div className="py-12 text-center bg-gray-950/20 border border-dashed border-gray-850 rounded-2xl">
              <span className="text-3xl block mb-2 opacity-50">😴</span>
              <h4 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider">You are offline</h4>
              <p className="text-[10px] text-gray-500 max-w-[200px] mx-auto mt-1.5">
                Go online above to start receiving dynamic passenger requests in Hyderabad.
              </p>
            </div>
          )}

          {isOnline && !incomingJob && !activeTrip && (
            <div className="py-12 text-center bg-gray-950/40 border border-yellow-500/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Pulsing search radar animation */}
              <div className="w-12 h-12 rounded-full bg-yellow-400/5 flex items-center justify-center border border-yellow-400/20 animate-pulse-soft mb-3 relative">
                <Bike className="w-5 h-5 text-yellow-400" />
                <div className="absolute inset-0 rounded-full border border-yellow-400/25 animate-ping"></div>
              </div>
              
              <h4 className="text-sm font-extrabold text-yellow-450 uppercase tracking-widest leading-none">Searching for jobs</h4>
              <p className="text-[10px] text-gray-500 max-w-[210px] mt-2">
                Waiting for incoming client travel bookings near your location...
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
