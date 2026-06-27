import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  LogOut, 
  Users, 
  Bike, 
  MapPin, 
  TrendingUp,
  Menu,
  X,
  Car,
  Box,
  Calendar,
  FileText,
  CreditCard,
  Utensils,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useAuthStore } from '../../store/useAuthStore';

// Initial Mock Datasets for all tables
const MOCK_USERS = [
  { id: 'USR-101', name: 'Malli Hasini Sarath', phone: '8074244332', role: 'User', rating: '4.76', status: 'Active' },
  { id: 'USR-102', name: 'Vikram Singh', phone: '9845012345', role: 'User', rating: '4.50', status: 'Active' },
  { id: 'USR-103', name: 'Priya Reddy', phone: '8074244333', role: 'Rider', rating: '4.90', status: 'Active' },
  { id: 'USR-104', name: 'Napoli Pizza Vendor', phone: '8074244334', role: 'Vendor', rating: '4.85', status: 'Active' },
  { id: 'USR-105', name: 'Ramesh Kumar', phone: '9123456789', role: 'User', rating: '4.20', status: 'Suspended' }
];

const MOCK_HOTELS = [
  { id: 'HTL-301', name: 'Napoli Artisanal Pizza', rating: '4.8', category: 'Italian, Pizza', status: 'Open', orders: 120 },
  { id: 'HTL-302', name: 'Spicy Biryani House', rating: '4.9', category: 'Hyderabadi Biryani', status: 'Open', orders: 250 },
  { id: 'HTL-303', name: 'Creamy Waffle Corner', rating: '4.5', category: 'Desserts, Shakes', status: 'Closed', orders: 48 },
  { id: 'HTL-304', name: 'Tandoori Delights', rating: '4.6', category: 'North Indian', status: 'Open', orders: 84 }
];

const MOCK_RIDES_HISTORY = [
  { id: 'RID-8901', driver: 'Priya Reddy', customer: 'Hasini Sarath', route: 'Jubilee Hills -> Hitech City', fare: 89, type: '🛵 Bike Taxi', status: 'Completed' },
  { id: 'RID-8902', driver: 'Kavitha S.', customer: 'Vikram Singh', route: 'Airport -> Secunderabad', fare: 450, type: '🚗 Cab Premium', status: 'Completed' },
  { id: 'RID-8903', driver: 'Sujatha Rao', customer: 'Ramesh Kumar', route: 'Railway Station -> Begumpet', fare: 120, type: '🛺 Auto Ride', status: 'Refunded' }
];

const MOCK_PARCELS_LOGS = [
  { id: 'PAR-401', sender: 'Hasini Sarath', recipient: 'Vikram Singh', contents: 'Documents', weight: '0.5 kg', status: 'Delivered' },
  { id: 'PAR-402', sender: 'Sujatha Rao', recipient: 'Priya Reddy', contents: 'Electronics', weight: '2.3 kg', status: 'In Transit' },
  { id: 'PAR-403', sender: 'Ramesh Kumar', recipient: 'Kavitha S.', contents: 'Medicine', weight: '0.2 kg', status: 'Delivered' }
];

const MOCK_PILOTS_DATES = [
  { id: 'PLT-01', name: 'Priya Reddy', joinDate: '12-May-2026', vehicle: '🛵 Honda Activa', status: 'Approved' },
  { id: 'PLT-02', name: 'Kavitha S.', joinDate: '20-May-2026', vehicle: '🛵 TVS Jupiter', status: 'Approved' },
  { id: 'PLT-03', name: 'Meena Kumari', joinDate: '22-May-2026', vehicle: '🛵 Suzuki Access', status: 'Pending' },
  { id: 'PLT-04', name: 'Sujatha Rao', joinDate: '24-May-2026', vehicle: '🛵 Honda Activa', status: 'Approved' }
];

export default function RideAdmin() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [activeView, setActiveView] = useState('overview'); // 'overview' | 'users' | 'hotels' | 'rides' | 'parcels' | 'ridersDates' | 'reportsHotels' | 'reportsRides' | 'reportsParcels' | 'reportsRiderPayouts' | 'reportsHotelPayouts' | 'profitsReports'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState(MOCK_USERS);
  const [hotels, setHotels] = useState(MOCK_HOTELS);
  const [pilots, setPilots] = useState(MOCK_PILOTS_DATES);

  useEffect(() => {
    applyTheme('hub'); // Admin uses hub theme
  }, []);

  const handleToggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const handleToggleHotelStatus = (hotelId) => {
    setHotels(prev => prev.map(h => h.id === hotelId ? { ...h, status: h.status === 'Open' ? 'Closed' : 'Open' } : h));
  };

  const handleTogglePilotStatus = (pilotId) => {
    setPilots(prev => prev.map(p => p.id === pilotId ? { ...p, status: p.status === 'Approved' ? 'Suspended' : 'Approved' } : p));
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Helper menu array for navigation
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'hotels', label: 'Hotels / Restaurants', icon: Utensils },
    { id: 'rides', label: 'Ride Bookings', icon: Car },
    { id: 'parcels', label: 'Parcels Logs', icon: Box },
    { id: 'ridersDates', label: 'Riders Reg. Dates', icon: Calendar },
    { id: 'reportsHotels', label: 'Reports: Hotels', icon: FileText },
    { id: 'reportsRides', label: 'Reports: Rides', icon: FileText },
    { id: 'reportsParcels', label: 'Reports: Parcels', icon: FileText },
    { id: 'reportsRiderPayouts', label: 'Reports: Rider Payouts', icon: CreditCard },
    { id: 'reportsHotelPayouts', label: 'Reports: Hotel Payouts', icon: CreditCard },
    { id: 'profitsReports', label: 'Profits & Commissions', icon: DollarSign }
  ];

  const currentMenuLabel = menuItems.find(m => m.id === activeView)?.label || 'Admin Panel';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900 overflow-hidden"
    >
      {/* Top Admin Header with Hamburger */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10 shrink-0">
        <div className="flex items-center gap-2">
          {/* Hamburger Menu Trigger */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] transition-colors border border-orange-100"
            title="Open Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 font-display truncate max-w-[190px]">
            {currentMenuLabel}
          </h2>
        </div>

        {/* Back and Logout icons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/auth')}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            title="Back to Login Roles"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-100"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
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
                  <span className="text-lg">⚙️</span>
                  <h3 className="font-extrabold uppercase text-xs tracking-widest font-display text-orange-400">
                    SwiftGo Admin
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
                {menuItems.map(item => {
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
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
              <div className="pt-4 border-t border-white/10 mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-950/20 hover:bg-rose-950/45 text-rose-400 font-extrabold rounded-xl text-xs uppercase tracking-wider border border-rose-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Admin Scroll Window */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20 space-y-4">
        
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {activeView === 'overview' && (
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

              <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 text-left relative overflow-hidden">
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

        {/* VIEW 2: USERS MANAGEMENT */}
        {activeView === 'users' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">System Users Database</span>
            <div className="space-y-3">
              {users.map(u => (
                <div key={u.id} className="p-3 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs text-gray-900">{u.name}</h5>
                    <span className="text-[9px] text-gray-400 font-mono block mt-0.5">{u.id} • {u.phone}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[9px] font-black uppercase bg-orange-50 text-[#FF7A00] border border-orange-500/10 px-1.5 py-0.5 rounded leading-none">{u.role}</span>
                      <span className="text-[9px] font-semibold text-gray-500">⭐ {u.rating} Rating</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleUserStatus(u.id)}
                    className={`px-2 py-1 rounded text-[9px] font-bold uppercase border transition-colors ${
                      u.status === 'Active'
                        ? 'bg-red-50 text-red-500 border-red-500/20'
                        : 'bg-green-50 text-green-600 border-green-500/20'
                    }`}
                  >
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: HOTELS / RESTAURANTS */}
        {activeView === 'hotels' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Platform Restaurant Partners</span>
            <div className="space-y-3">
              {hotels.map(h => (
                <div key={h.id} className="p-3 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs text-gray-900">{h.name}</h5>
                    <span className="text-[9px] text-gray-400 block mt-0.5">{h.category}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[9px] text-gray-500">⭐ {h.rating}</span>
                      <span className="text-[9px] text-gray-400">• {h.orders} orders processed</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleHotelStatus(h.id)}
                    className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase border transition-colors ${
                      h.status === 'Open'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-green-50 text-green-600 border-green-200'
                    }`}
                  >
                    {h.status === 'Open' ? 'Block / Close' : 'Approve / Open'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: RIDE BOOKINGS */}
        {activeView === 'rides' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Live Travel Bookings logs</span>
            <div className="space-y-3">
              {MOCK_RIDES_HISTORY.map(r => (
                <div key={r.id} className="p-3 bg-white border border-[#E5E5E5] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black bg-orange-50 text-[#FF7A00] border border-orange-500/10 px-1.5 py-0.5 rounded uppercase leading-none">{r.type}</span>
                    <span className="text-[10px] font-bold font-mono text-gray-800">₹{r.fare}</span>
                  </div>
                  <div className="text-xs">
                    <h5 className="font-bold text-gray-800 text-[11px]">{r.route}</h5>
                    <p className="text-[9px] text-gray-400 mt-1">Driver: <strong>{r.driver}</strong> • Client: <strong>{r.customer}</strong></p>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-[9px]">
                    <span className="text-gray-400 font-mono">{r.id}</span>
                    <span className={`font-extrabold ${r.status === 'Completed' ? 'text-green-600' : 'text-red-500'}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: PARCELS LOGS */}
        {activeView === 'parcels' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Courier Logistics logs</span>
            <div className="space-y-3">
              {MOCK_PARCELS_LOGS.map(p => (
                <div key={p.id} className="p-3 bg-white border border-[#E5E5E5] rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-extrabold text-gray-700">📦 {p.contents}</span>
                    <span className="font-mono text-gray-400">{p.weight}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    <p>Sender: <strong className="text-gray-700">{p.sender}</strong></p>
                    <p>Receiver: <strong className="text-gray-700">{p.recipient}</strong></p>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-[9px]">
                    <span className="text-gray-400 font-mono">{p.id}</span>
                    <span className={`font-extrabold ${p.status === 'Delivered' ? 'text-green-600' : 'text-blue-500 animate-pulse'}`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: RIDERS REGISTRATION DATES */}
        {activeView === 'ridersDates' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Rider Roster & Signup Dates</span>
            <div className="space-y-3">
              {pilots.map(p => (
                <div key={p.id} className="p-3 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs text-gray-900">{p.name}</h5>
                    <p className="text-[9px] text-[#FF7A00] font-semibold mt-0.5">{p.vehicle}</p>
                    <span className="text-[9px] text-gray-400 block mt-1">Joined: <strong className="font-mono font-bold text-gray-700">{p.joinDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${
                      p.status === 'Approved' 
                        ? 'bg-green-50 text-green-600 border border-green-200' 
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {p.status}
                    </span>
                    <button 
                      onClick={() => handleTogglePilotStatus(p.id)}
                      className="px-2 py-1 rounded text-[8px] bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 font-bold uppercase"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: REPORTS OF HOTELS */}
        {activeView === 'reportsHotels' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Restaurant Business Report</span>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs space-y-2">
              <div className="flex justify-between border-b pb-1.5 font-bold text-gray-500 uppercase text-[9px]">
                <span>Restaurant Partner</span>
                <span>Revenue</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold">Spicy Biryani House</span>
                <span className="font-mono font-bold">₹24,500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold">Napoli Artisanal Pizza</span>
                <span className="font-mono font-bold">₹18,900</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold">Tandoori Delights</span>
                <span className="font-mono font-bold">₹8,400</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold">Creamy Waffle Corner</span>
                <span className="font-mono font-bold">₹4,800</span>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-[10px] text-gray-600">
              Total F&B orders processed today: <strong>532 orders</strong>. Gross Restaurant GMV equals <strong>₹56,600.00</strong>.
            </div>
          </div>
        )}

        {/* VIEW 8: REPORTS OF RIDES */}
        {activeView === 'reportsRides' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Rides & Travel Activity Report</span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[8px] text-gray-400 font-bold block uppercase">Bike Rides</span>
                <span className="text-sm font-black text-gray-900 mt-1 block">189 Completed</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[8px] text-gray-400 font-bold block uppercase">Auto Rides</span>
                <span className="text-sm font-black text-gray-900 mt-1 block">84 Completed</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[8px] text-gray-400 font-bold block uppercase">Cab Rides</span>
                <span className="text-sm font-black text-gray-900 mt-1 block">39 Completed</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[8px] text-gray-400 font-bold block uppercase">Average Fare</span>
                <span className="text-sm font-black text-orange-500 mt-1 block">₹142.50</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs">
              <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Peak Booking Hours</span>
              <p className="text-[10px] text-gray-500">Highest travel density recorded today between <strong>9:00 AM - 11:30 AM</strong> and <strong>5:30 PM - 8:00 PM</strong>.</p>
            </div>
          </div>
        )}

        {/* VIEW 9: REPORTS OF PARCELS */}
        {activeView === 'reportsParcels' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Parcel Courier delivery Report</span>
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Delivered on-time</span>
                <span className="font-mono font-bold text-green-600">97.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Average Delivery Time</span>
                <span className="font-mono font-bold text-gray-800">42 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Active Delivery Agents</span>
                <span className="font-mono font-bold text-gray-800">14 Pilots</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 10: REPORTS OF RIDER PAYOUTS */}
        {activeView === 'reportsRiderPayouts' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Pilot Weekly Payout Roster</span>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-[10px] space-y-2">
              <div className="flex justify-between border-b pb-1.5 font-bold text-gray-500 uppercase text-[8px]">
                <span>Pilot Name</span>
                <span>Status</span>
                <span className="text-right">Payout</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="font-semibold">Priya Reddy</span>
                <span className="text-green-600 font-extrabold">Paid (TxnRef)</span>
                <span className="font-mono font-bold text-right">₹1,240</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="font-semibold">Kavitha S.</span>
                <span className="text-green-600 font-extrabold">Paid (TxnRef)</span>
                <span className="font-mono font-bold text-right">₹980</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="font-semibold">Sujatha Rao</span>
                <span className="text-green-600 font-extrabold">Paid (TxnRef)</span>
                <span className="font-mono font-bold text-right">₹640</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold">Meena Kumari</span>
                <span className="text-amber-500 font-extrabold">Pending Approval</span>
                <span className="font-mono font-bold text-right">₹0</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 11: REPORTS OF HOTEL PAYOUTS */}
        {activeView === 'reportsHotelPayouts' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Restaurant Partner Payouts log</span>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-[10px] space-y-2">
              <div className="flex justify-between border-b pb-1.5 font-bold text-gray-500 uppercase text-[8px]">
                <span>Partner Hotel</span>
                <span>GST Tax (5%)</span>
                <span className="text-right">Net Transferred</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="font-semibold">Spicy Biryani</span>
                <span className="font-mono">₹1,225</span>
                <span className="font-mono font-bold text-right text-green-600">₹23,275</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="font-semibold">Napoli Artisanal Pizza</span>
                <span className="font-mono">₹945</span>
                <span className="font-mono font-bold text-right text-green-600">₹17,955</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold">Creamy Waffle Corner</span>
                <span className="font-mono">₹240</span>
                <span className="font-mono font-bold text-right text-green-600">₹4,560</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 12: PROFITS & COMMISSIONS REPORTS */}
        {activeView === 'profitsReports' && (
          <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 text-left space-y-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">SwiftGo Profit Margin Audit</span>
            
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-semibold">Total Gross Bookings Value</span>
                <span className="font-mono font-bold text-gray-900">₹1,04,800.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-semibold">Average Platform Fee (15%)</span>
                <span className="font-mono font-bold text-orange-600">₹15,720.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-semibold">System Taxes Collected</span>
                <span className="font-mono font-bold text-gray-700">₹2,840.00</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
                <span className="font-black text-gray-900">Net Admin Operating Profits</span>
                <span className="font-mono font-black text-green-600">₹18,560.00</span>
              </div>
            </div>
            
            <div className="py-2.5 px-3 bg-green-50 border border-green-200 rounded-xl text-[10px] text-green-700">
              🎉 Profit margins increased by <strong>12.4%</strong> week-on-week due to high order volume during the Hyderabad food festival.
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
