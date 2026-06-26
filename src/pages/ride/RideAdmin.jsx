import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, LogOut, Users, Bike, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useAuthStore } from '../../store/useAuthStore';

// Initial Mock Riders
const INITIAL_RIDERS = [
  { id: '1', name: 'Priya Reddy', rating: '4.9', active: true, trips: 142, avatar: 'PR' },
  { id: '2', name: 'Kavitha S.', rating: '4.7', active: true, trips: 98, avatar: 'KS' },
  { id: '3', name: 'Meena Kumari', rating: '4.8', active: false, trips: 110, avatar: 'MK' },
  { id: '4', name: 'Sujatha Rao', rating: '4.6', active: true, trips: 64, avatar: 'SR' },
  { id: '5', name: 'Haritha P.', rating: '4.5', active: false, trips: 31, avatar: 'HP' }
];

// Initial Transaction Logs
const MOCK_TRANSACTIONS = [
  { id: 'TXN-9821', service: 'Ride Hailing', amount: 89, status: 'Success', time: '10 mins ago' },
  { id: 'TXN-9820', service: 'Food Order', amount: 298, status: 'Success', time: '14 mins ago' },
  { id: 'TXN-9819', service: 'Courier Delivery', amount: 49, status: 'Success', time: '22 mins ago' },
  { id: 'TXN-9818', service: 'Ride Hailing', amount: 149, status: 'Refunded', time: '1 hour ago' },
  { id: 'TXN-9817', service: 'Food Order', amount: 199, status: 'Success', time: '2 hours ago' }
];

export default function RideAdmin() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [riders, setRiders] = useState(INITIAL_RIDERS);
  const [logs, setLogs] = useState(MOCK_TRANSACTIONS);

  useEffect(() => {
    applyTheme('hub'); // Admin uses hub/purple theme
  }, []);

  const handleToggleRider = (riderId) => {
    setRiders(prevRiders =>
      prevRiders.map(rider =>
        rider.id === riderId ? { ...rider, active: !rider.active } : rider
      )
    );
    
    // Add transaction log representing the status toggle change
    const toggledRider = riders.find(r => r.id === riderId);
    if (toggledRider) {
      const newLog = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        service: 'System Config',
        amount: 0,
        status: toggledRider.active ? 'Suspended' : 'Activated',
        time: 'Just now'
      };
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 4)]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-[#0F0A1E] text-white"
    >
      {/* Top Admin Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0F0A1E] border-b border-purple-950/40 z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')}
            className="p-1 rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-purple-300" />
          </button>
          <h2 className="text-base font-extrabold uppercase tracking-widest text-purple-400">
            Admin Panel
          </h2>
        </div>
        <button 
          onClick={handleLogout}
          className="p-1.5 rounded-xl bg-purple-950/45 hover:bg-purple-900/50 text-purple-300 transition-colors border border-purple-900/20"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Main Admin Scroll Window */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-5">
        
        {/* Stats Grid 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-950/15 border border-purple-900/30 rounded-2xl p-3.5 text-left relative overflow-hidden">
            <Users className="w-8 h-8 text-purple-400 absolute right-2 bottom-1 opacity-20" />
            <span className="text-[9px] font-bold text-purple-300/60 uppercase tracking-wider block">Total Users</span>
            <span className="text-lg font-black text-white mt-1 block">1,284</span>
          </div>

          <div className="bg-purple-950/15 border border-purple-900/30 rounded-2xl p-3.5 text-left relative overflow-hidden">
            <Bike className="w-8 h-8 text-purple-400 absolute right-2 bottom-1 opacity-20" />
            <span className="text-[9px] font-bold text-purple-300/60 uppercase tracking-wider block">Active Pilots</span>
            <span className="text-lg font-black text-white mt-1 block">47</span>
          </div>

          <div className="bg-purple-950/15 border border-purple-900/30 rounded-2xl p-3.5 text-left relative overflow-hidden">
            <MapPin className="w-8 h-8 text-purple-400 absolute right-2 bottom-1 opacity-20" />
            <span className="text-[9px] font-bold text-purple-300/60 uppercase tracking-wider block">Today's Trips</span>
            <span className="text-lg font-black text-white mt-1 block">312</span>
          </div>

          <div className="bg-purple-950/15 border border-purple-900/30 rounded-2xl p-3.5 text-left relative overflow-hidden font-sans">
            <TrendingUp className="w-8 h-8 text-purple-400 absolute right-2 bottom-1 opacity-20" />
            <span className="text-[9px] font-bold text-purple-300/60 uppercase tracking-wider block">Revenue</span>
            <span className="text-lg font-black text-purple-400 mt-1 block">₹ 48,200</span>
          </div>
        </div>

        {/* Custom SVG Revenue Bar Chart */}
        <div className="bg-purple-950/10 border border-purple-900/20 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-bold text-purple-300/60 uppercase tracking-widest block mb-4">
            Weekly Revenue Chart
          </span>
          
          {/* SVG Bar Chart */}
          <div className="w-full h-32 flex items-end justify-between px-1">
            {/* Monday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹5K</span>
              <div className="w-5 bg-purple-500/20 hover:bg-purple-500 rounded-t-sm transition-all" style={{ height: '35px' }}></div>
              <span className="text-[9px] font-bold text-gray-500">M</span>
            </div>
            {/* Tuesday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹6.5K</span>
              <div className="w-5 bg-purple-500/30 hover:bg-purple-500 rounded-t-sm transition-all" style={{ height: '46px' }}></div>
              <span className="text-[9px] font-bold text-gray-500">T</span>
            </div>
            {/* Wednesday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹8K</span>
              <div className="w-5 bg-purple-500/40 hover:bg-purple-500 rounded-t-sm transition-all" style={{ height: '56px' }}></div>
              <span className="text-[9px] font-bold text-gray-500">W</span>
            </div>
            {/* Thursday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹10K</span>
              <div className="w-5 bg-purple-500/60 hover:bg-purple-500 rounded-t-sm transition-all" style={{ height: '70px' }}></div>
              <span className="text-[9px] font-bold text-gray-500">T</span>
            </div>
            {/* Friday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹12K</span>
              <div className="w-5 bg-purple-500/85 hover:bg-purple-500 rounded-t-sm transition-all" style={{ height: '84px' }}></div>
              <span className="text-[9px] font-bold text-gray-500">F</span>
            </div>
            {/* Saturday bar */}
            <div className="flex flex-col items-center gap-2 w-10">
              <span className="text-[9px] font-bold text-purple-300/80">₹15K</span>
              <div className="w-5 bg-purple-400 hover:bg-purple-300 rounded-t-sm transition-all shadow-md shadow-purple-500/20" style={{ height: '105px' }}></div>
              <span className="text-[9px] font-bold text-gray-400">S</span>
            </div>
          </div>
        </div>

        {/* Manage Riders List */}
        <div className="bg-purple-950/10 border border-purple-900/20 rounded-2xl p-4 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-purple-300/60 uppercase tracking-widest">
              Manage Pilot Roster
            </span>
            <span className="text-[9px] text-gray-500 font-bold uppercase">
              {riders.filter(r => r.active).length} Active
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-none pr-1">
            {riders.map((rider) => (
              <div 
                key={rider.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-xs">
                    {rider.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-200 leading-tight">{rider.name}</h5>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-extrabold text-purple-400">⭐ {rider.rating}</span>
                      <span className="text-[9px] text-gray-500">• {rider.trips} trips</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${
                    rider.active 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {rider.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  
                  <button
                    onClick={() => handleToggleRider(rider.id)}
                    className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors ${
                      rider.active
                        ? 'bg-red-500/20 text-red-300 border border-red-500/20 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-300 border border-green-500/20 hover:bg-green-500/30'
                    }`}
                  >
                    {rider.active ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction logs table */}
        <div className="bg-purple-950/10 border border-purple-900/20 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-bold text-purple-300/60 uppercase tracking-widest block mb-3">
            System Activity Log
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] font-medium text-gray-300">
              <thead>
                <tr className="border-b border-purple-900/30 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="pb-2">TXN ID</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Details</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="py-2.5 font-mono text-purple-400 font-bold">{log.id}</td>
                    <td className="py-2.5">{log.service}</td>
                    <td className="py-2.5 text-gray-400">{log.time}</td>
                    <td className={`py-2.5 text-right font-bold ${
                      log.status === 'Success' || log.status === 'Activated'
                        ? 'text-green-400'
                        : log.status === 'Refunded' || log.status === 'Suspended'
                          ? 'text-red-400'
                          : 'text-purple-400'
                    }`}>
                      {log.amount > 0 ? `₹${log.amount}` : log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
