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
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-805" />
          </button>
          <h2 className="text-base font-extrabold uppercase tracking-wider text-gray-900">
            Rider Console
          </h2>
        </div>

        {/* Toggle Switch */}
        <div 
          onClick={handleStatusChange}
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className={`text-[10px] font-black uppercase tracking-wider ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <motion.div className="flex items-center">
            {isOnline ? (
              <ToggleRight className="w-7 h-7 text-green-500" />
            ) : (
              <ToggleLeft className="w-7 h-7 text-gray-400" />
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20">
        {/* Earnings Card */}
        <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4.5 mb-5 shadow-sm text-left">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Today's Summary</span>
          <div className="grid grid-cols-3 gap-2">
            <div className="border-r border-[#E5E5E5] pr-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-400 tracking-wider font-semibold">Earnings</span>
              <span className="text-base font-black text-[#FF7A00] block mt-0.5">₹ {todayEarnings}</span>
            </div>
            <div className="border-r border-[#E5E5E5] px-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-400 tracking-wider font-semibold">Trips</span>
              <span className="text-base font-black text-gray-800 block mt-0.5">{todayTrips}</span>
            </div>
            <div className="pl-2">
              <span className="block text-[9px] font-extrabold uppercase text-gray-400 tracking-wider font-semibold">Hours</span>
              <span className="text-base font-black text-gray-800 block mt-0.5">6.5</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="space-y-4">
          {/* Active Job Layout */}
          {activeTrip && (
            <div className="bg-[#F8F8F8] border-2 border-orange-500 rounded-2xl p-4 shadow-lg text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FF7A00] text-black font-black px-3 py-1 text-[9px] uppercase tracking-wider rounded-bl-xl">
                Active Job
              </div>

              {tripStage === 'completed' ? (
                <div className="text-center py-6">
                  <span className="text-4xl block mb-2">🏆</span>
                  <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">Trip Completed!</h3>
                  <p className="text-xs text-orange-605 font-bold mt-1">₹ {activeTrip.fare} added to wallet balance</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Customer Name</span>
                    <span className="font-extrabold text-sm text-gray-900">{activeTrip.customer}</span>
                    <span className="ml-3 inline-block bg-orange-50 text-[#FF7A00] font-bold border border-orange-500/20 text-[10px] px-2 py-0.5 rounded font-mono">
                      OTP: {activeTrip.otp}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-605 mb-4 bg-white p-3 rounded-xl border border-[#E5E5E5]">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-gray-800">Pickup:</strong> {activeTrip.pickup}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-gray-800">Dropoff:</strong> {activeTrip.dropoff}
                      </div>
                    </div>
                  </div>

                  {/* Navigation CTA */}
                  <button 
                    onClick={() => alert(`Redirecting to Google Maps navigation route: ${activeTrip.pickup} -> ${activeTrip.dropoff}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-[10px] uppercase tracking-wider border border-[#E5E5E5] mb-3 shadow-xs"
                  >
                    <Compass className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Open Navigation Maps</span>
                  </button>

                  {/* Trip Stage Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTripAction}
                    className="w-full py-3 bg-[#FF7A00] text-black font-black rounded-xl text-xs uppercase tracking-widest shadow-xs hover:bg-[#ff9133] transition-colors"
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
                className="bg-white border border-[#E5E5E5] rounded-2xl p-4.5 shadow-xl text-left"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black bg-[#FF7A00] text-black px-2 py-0.5 rounded uppercase tracking-wider">
                    New Ride Request
                  </span>
                  
                  {/* Countdown ring details */}
                  <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                    <span>{countdown}s left</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-gray-650 mb-4">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-800">Pickup:</strong> {incomingJob.pickup}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-800">Dropoff:</strong> {incomingJob.dropoff}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#F8F8F8] p-2.5 rounded-xl border border-[#E5E5E5] text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold block">DISTANCE</span>
                    <span className="font-extrabold text-gray-800">{incomingJob.distance}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-500 font-bold block">EST. FARE</span>
                    <span className="font-black text-orange-600 text-sm">₹{incomingJob.fare}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDecline}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-xl text-xs uppercase tracking-wider border border-gray-200"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-2.5 bg-[#FF7A00] hover:bg-[#ff9133] text-black font-black rounded-xl text-xs uppercase tracking-wider shadow-xs"
                  >
                    Accept
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder Status Displays */}
          {!isOnline && (
            <div className="py-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <span className="text-3xl block mb-2 opacity-50">😴</span>
              <h4 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider font-semibold">You are offline</h4>
              <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto mt-1.5">
                Go online above to start receiving dynamic passenger requests in Hyderabad.
              </p>
            </div>
          )}

          {isOnline && !incomingJob && !activeTrip && (
            <div className="py-12 text-center bg-[#FFF4E5] border border-orange-500/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Pulsing search radar animation */}
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border border-orange-500/20 animate-pulse-soft mb-3 relative">
                <Bike className="w-5 h-5 text-orange-500" />
                <div className="absolute inset-0 rounded-full border border-orange-500/25 animate-ping"></div>
              </div>
              
              <h4 className="text-sm font-extrabold text-orange-600 uppercase tracking-widest leading-none">Searching for jobs</h4>
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
