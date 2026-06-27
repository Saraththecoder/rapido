import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, ToggleLeft, ToggleRight, DollarSign, Clock, Bike, Compass, MapPin, LogOut, Menu, X } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useWalletStore } from '../../store/useWalletStore';
import { useAuthStore } from '../../store/useAuthStore';

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
  const logout = useAuthStore((state) => state.logout);
  const setRole = useAuthStore((state) => state.setRole);
  
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'earnings' | 'profile'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    setActiveTab('jobs'); // ensure they see the job
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
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10 text-gray-900">
        <div className="flex items-center gap-2">
          {/* Hamburger Menu Trigger */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] transition-colors border border-orange-100"
            title="Open Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 font-display ml-1">
            Rider Console
          </h2>
        </div>

        {/* Right side options: Online status and logout */}
        <div className="flex items-center gap-3">
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

          {/* Logout Button */}
          <button 
            onClick={() => {
              logout();
              navigate('/auth');
            }}
            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-105 text-rose-600 border border-rose-200 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Hamburger Slide-in Drawer Container */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 left-0 w-[270px] bg-[#0C1E36] text-white z-50 shadow-2xl flex flex-col p-4"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛵</span>
                  <h3 className="font-extrabold uppercase text-xs tracking-widest font-display text-orange-400">
                    SwiftGo Pilot
                  </h3>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto scrollbar-none space-y-1.5 pr-1">
                {[
                  { id: 'jobs', label: 'Active Jobs Desk', icon: Bike },
                  { id: 'earnings', label: 'Earnings Logs', icon: DollarSign },
                  { id: 'profile', label: 'My Pilot Profile', icon: Compass }
                ].map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-[#FF7A00] text-black font-black shadow-lg shadow-orange-500/10'
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#FF7A00]'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Bottom controls */}
              <div className="pt-4 border-t border-white/10 mt-auto space-y-2">
                <button
                  onClick={() => {
                    setRole('user');
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500/20 hover:bg-orange-500/35 text-[#FF7A00] font-extrabold rounded-xl text-xs uppercase tracking-wider border border-orange-500/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Passenger Mode</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-950/20 hover:bg-rose-950/45 text-rose-400 font-extrabold rounded-xl text-xs uppercase tracking-wider border border-rose-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Pilot</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sub Tabs Navigator */}
      <div className="px-4 pt-3 flex gap-2 shrink-0 z-10">
        {[
          { id: 'jobs', label: 'Active Jobs' },
          { id: 'earnings', label: 'Earnings Logs' },
          { id: 'profile', label: 'My Profile' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all border font-display relative ${
              activeTab === tab.id
                ? 'bg-orange-50 text-[#FF7A00] border-orange-200 shadow-sm'
                : 'bg-[#F8F8F8] text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic View Panels */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20">
        
        {/* VIEW 1: ACTIVE JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left block mb-1">Live Order Desk</h3>
            
            {activeTrip && (
              <div className="bg-[#F8F8F8] border-2 border-orange-500 rounded-2xl p-4 shadow-lg text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#FF7A00] text-black font-black px-3 py-1 text-[9px] uppercase tracking-wider rounded-bl-xl">
                  Active Job
                </div>

                {tripStage === 'completed' ? (
                  <div className="text-center py-6">
                    <span className="text-4xl block mb-2">🏆</span>
                    <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">Trip Completed!</h3>
                    <p className="text-xs text-green-600 font-bold mt-1">₹ {activeTrip.fare} added to wallet balance</p>
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

                    <div className="space-y-2.5 text-xs text-gray-650 mb-4 bg-white p-3 rounded-xl border border-[#E5E5E5]">
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
        )}

        {/* VIEW 2: EARNINGS LOG */}
        {activeTab === 'earnings' && (
          <div className="space-y-4 text-left">
            {/* Earnings Summary Card */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4.5 shadow-sm">
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

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Trip Earnings History</h4>
              
              {[
                { id: 'TRP-8912', route: 'bustand -> Railway Station', time: '11:20 AM', amount: 89, type: '🚗 Cab Economy' },
                { id: 'TRP-8910', route: 'Upparapalli Road -> bustand', time: '10:15 AM', amount: 45, type: '🛵 Bike Taxi' },
                { id: 'TRP-8908', route: 'Railway Station -> Jubilee Hills', time: '09:05 AM', amount: 149, type: '🛺 Auto Ride' },
                { id: 'TRP-8899', route: 'Tirupati -> Tirumala Hills', time: 'Yesterday', amount: 450, type: '🚗 Premium Cab' }
              ].map(txn => (
                <div key={txn.id} className="p-3 bg-[#F8F9FB] border border-gray-150 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[8px] bg-orange-100 text-[#FF7A00] font-black px-1.5 py-0.5 rounded uppercase font-display leading-none">{txn.type}</span>
                    <h5 className="font-extrabold text-[11px] text-gray-900 mt-1.5">{txn.route}</h5>
                    <span className="text-[9px] text-gray-400 font-mono block mt-0.5">{txn.id} • {txn.time}</span>
                  </div>
                  <span className="text-xs font-black text-gray-805 font-display font-mono">₹{txn.amount}</span>
                </div>
              ))}
            </div>

            {/* Payout Action button */}
            <button
              onClick={() => alert(`Initiating payout of ₹${todayEarnings} to your registered Bank Account...`)}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md font-display mt-4"
            >
              Request Bank Payout
            </button>
          </div>
        )}

        {/* VIEW 3: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-4 text-left">
            <div className="bg-white rounded-2xl border border-gray-150 p-4 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-orange-500/20 bg-gray-50 flex items-center justify-center font-black text-lg text-gray-700 overflow-hidden">
                  <img src="/avatar.png" className="w-full h-full object-cover" alt="Pilot" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 leading-tight">Priya Reddy</h3>
                  <span className="text-[9px] bg-green-500/10 text-green-600 border border-green-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider mt-1 inline-block">
                    PILOT-TS-9812
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-450 font-bold uppercase text-[9px]">Vehicle Info</span>
                  <span className="font-semibold text-gray-800">🛵 Honda Activa 125</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-450 font-bold uppercase text-[9px]">Plate Number</span>
                  <span className="font-mono font-bold text-gray-800">TS09-EX-3829</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-450 font-bold uppercase text-[9px]">Approval Status</span>
                  <span className="text-green-600 font-extrabold flex items-center gap-1">✓ Active & Verified</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 space-y-3.5">
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-display">Console Settings</h4>
              
              <div className="divide-y divide-gray-150 text-xs">
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-gray-700">Accept Auto Bookings</span>
                  <span className="text-green-600 font-extrabold">Active</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-gray-700">Auto Payout Mode</span>
                  <span className="text-gray-450">Disabled</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-gray-700">Preferred Map Service</span>
                  <span className="text-[#FF7A00] font-black">Google Maps</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
