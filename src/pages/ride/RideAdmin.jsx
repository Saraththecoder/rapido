import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, LogOut, Users, Bike, MapPin, TrendingUp } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'roster' | 'audit'

  useEffect(() => {
    applyTheme('hub'); // Admin uses hub theme
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
    navigate('/auth');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Admin Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/auth')}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-805" />
          </button>
          <h2 className="text-base font-extrabold uppercase tracking-widest text-gray-900">
            Admin Panel
          </h2>
        </div>
        <button 
          onClick={handleLogout}
          className="p-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] transition-colors border border-orange-200"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Sub Tabs Navigator */}
      <div className="px-4 pt-3 flex gap-2 shrink-0 z-10">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'roster', label: 'Pilot Roster' },
          { id: 'audit', label: 'System Logs' }
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

      {/* Main Admin Scroll Window */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20 space-y-5">
        
        {/* VIEW 1: SYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Stats Grid 2x2 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 text-left relative overflow-hidden">
                <Users className="w-8 h-8 text-orange-500 absolute right-2 bottom-1 opacity-10" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Total Users</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">1,284</span>
              </div>

              <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 text-left relative overflow-hidden">
                <Bike className="w-8 h-8 text-orange-500 absolute right-2 bottom-1 opacity-10" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Active Pilots</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">47</span>
              </div>

              <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 text-left relative overflow-hidden">
                <MapPin className="w-8 h-8 text-orange-500 absolute right-2 bottom-1 opacity-10" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Today's Trips</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">312</span>
              </div>

              <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 text-left relative overflow-hidden font-sans">
                <TrendingUp className="w-8 h-8 text-orange-500 absolute right-2 bottom-1 opacity-10" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Revenue</span>
                <span className="text-lg font-black text-[#FF7A00] mt-1 block">₹ 48,200</span>
              </div>
            </div>

            {/* Custom SVG Revenue Bar Chart */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-4">
                Weekly Revenue Chart
              </span>
              
              <div className="w-full h-32 flex items-end justify-between px-1">
                {[
                  { label: 'M', val: '35px', count: '₹5K' },
                  { label: 'T', val: '46px', count: '₹6.5K' },
                  { label: 'W', val: '56px', count: '₹8K' },
                  { label: 'T', val: '70px', count: '₹10K' },
                  { label: 'F', val: '84px', count: '₹12K' },
                  { label: 'S', val: '105px', count: '₹15K' }
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-10">
                    <span className="text-[9px] font-bold text-gray-600">{bar.count}</span>
                    <div className="w-5 bg-orange-500/30 hover:bg-[#FF7A00] rounded-t-sm transition-all" style={{ height: bar.val }}></div>
                    <span className="text-[9px] font-bold text-gray-400">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PILOT ROSTER */}
        {activeTab === 'roster' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Manage Pilot Roster
              </span>
              <span className="text-[9px] text-[#FF7A00] font-black uppercase">
                {riders.filter(r => r.active).length} Active Pilots
              </span>
            </div>

            <div className="space-y-3">
              {riders.map((rider) => (
                <div 
                  key={rider.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E5E5E5]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF7A00] border border-orange-200 flex items-center justify-center font-black text-xs">
                      {rider.avatar}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-gray-800 leading-tight">{rider.name}</h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-extrabold text-[#FF7A00]">⭐ {rider.rating}</span>
                        <span className="text-[9px] text-gray-500">• {rider.trips} trips</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${
                      rider.active 
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-650 border border-red-500/20'
                    }`}>
                      {rider.active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    
                    <button
                      onClick={() => handleToggleRider(rider.id)}
                      className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors ${
                        rider.active
                          ? 'bg-red-50 text-red-505 border border-red-500/20 hover:bg-red-100/50'
                          : 'bg-green-50 text-green-600 border border-green-500/20 hover:bg-green-100/50'
                      }`}
                    >
                      {rider.active ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SYSTEM AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
              System Activity Log
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] font-medium text-gray-600">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="pb-2">TXN ID</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Details</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-2.5 font-mono text-orange-605 font-bold">{log.id}</td>
                      <td className="py-2.5">{log.service}</td>
                      <td className="py-2.5 text-gray-500">{log.time}</td>
                      <td className={`py-2.5 text-right font-bold ${
                        log.status === 'Success' || log.status === 'Activated'
                          ? 'text-green-600'
                          : log.status === 'Refunded' || log.status === 'Suspended'
                            ? 'text-red-650'
                            : 'text-gray-805'
                      }`}>
                        {log.amount > 0 ? `₹${log.amount}` : log.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
