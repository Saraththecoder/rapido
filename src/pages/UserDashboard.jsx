import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';
import RideHome from './ride/RideHome';
import { 
  Home, 
  Compass, 
  Palmtree, 
  User, 
  Star, 
  HelpCircle, 
  Package, 
  CreditCard, 
  Clock, 
  Shield, 
  Gift, 
  Trophy, 
  Ticket, 
  LogOut, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const balance = useWalletStore((state) => state.balance);
  const [activeTab, setActiveTab] = useState('ride'); // 'ride' | 'services' | 'travel' | 'profile'

  // Sync tab with query parameters if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['ride', 'services', 'travel', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Apply default user theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', '#FF7A00');
    root.style.setProperty('--color-bg', '#FFFFFF');
    root.style.setProperty('--color-text', '#111111');
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Render sub-views based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'ride':
        return <RideHome setActiveTab={setActiveTab} />;
      case 'services':
        return <AllServicesView setActiveTab={setActiveTab} />;
      case 'travel':
        return <TravelView />;
      case 'profile':
        return <ProfileView user={user} balance={balance} onLogout={handleLogout} />;
      default:
        return <RideHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Dynamic Screen Viewport */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="h-full flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Customized Bottom Navigation Bar matching the image */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-150 flex items-center justify-around z-40 px-2 shadow-lg">
        {/* Ride Tab */}
        <button
          onClick={() => navigate('/?tab=ride')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all ${
            activeTab === 'ride' ? 'text-[#0C1E36] scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[9px] font-black tracking-wide font-display">Ride</span>
        </button>

        {/* All Services Tab */}
        <button
          onClick={() => navigate('/?tab=services')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all ${
            activeTab === 'services' ? 'text-[#0C1E36] scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[9px] font-black tracking-wide font-display">All Services</span>
        </button>

        {/* Travel Tab */}
        <button
          onClick={() => navigate('/?tab=travel')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all ${
            activeTab === 'travel' ? 'text-[#0C1E36] scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Palmtree className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[9px] font-black tracking-wide font-display">Travel</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => navigate('/?tab=profile')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all ${
            activeTab === 'profile' ? 'text-[#0C1E36] scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[9px] font-black tracking-wide font-display">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SUB VIEW: ALL SERVICES
// ----------------------------------------------------
function AllServicesView({ setActiveTab }) {
  const navigate = useNavigate();

  const services = [
    { name: 'Parcel on Bike', desc: 'Instant packages', icon: '📦', bg: 'bg-orange-50', border: 'border-orange-100', route: '/courier' },
    { name: 'Auto', desc: 'No-bargain auto', icon: '🛺', bg: 'bg-green-50', border: 'border-green-100', route: '/ride' },
    { name: 'Cab Economy', desc: 'Affordable hatchbacks', icon: '🚗', bg: 'bg-blue-50', border: 'border-blue-100', route: '/ride' },
    { name: 'Bike', desc: 'Quick solo rides', icon: '🛵', bg: 'bg-amber-50', border: 'border-amber-100', route: '/ride' },
    { name: 'Bike Lite', desc: 'Budget friendly bike', icon: '🚲', bg: 'bg-yellow-50', border: 'border-yellow-100', route: '/ride' },
    { name: 'Cab Premium', desc: 'Luxurious sedans', icon: '✨', bg: 'bg-purple-50', border: 'border-purple-100', route: '/ride' },
    { name: 'Food Delivery', desc: 'Hot delicious food', icon: '🍕', bg: 'bg-rose-50', border: 'border-rose-100', route: '/food' },
    { name: 'Travel', desc: 'Outstation packages', icon: '🌴', bg: 'bg-teal-50', border: 'border-teal-100', isTab: true },
  ];

  return (
    <div className="flex-1 flex flex-col p-5 text-left bg-white">
      <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6 font-display">
        All Services
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {services.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (item.isTab) {
                setActiveTab('travel');
              } else {
                navigate(item.route);
              }
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 hover:border-orange-500/20 hover:bg-white transition-all text-center group h-[110px]"
          >
            <div className="text-2xl mb-2 shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
            <span className="text-[10px] font-extrabold text-gray-800 leading-tight block">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SUB VIEW: TRAVEL
// ----------------------------------------------------
function TravelView() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-5 text-left bg-white">
      <h2 className="text-xl font-black text-gray-900 tracking-tight mb-1 font-display">
        Travel
      </h2>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-6">
        Intercity, rentals & tourism
      </p>

      <div className="space-y-4">
        {/* Outstation Card */}
        <div className="p-4 rounded-2xl border border-gray-150 bg-gradient-to-r from-teal-50 to-white flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[9px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-black uppercase tracking-wider font-display">
              Outstation Cabs
            </span>
            <h3 className="text-sm font-extrabold text-gray-800">Intercity rides starting at ₹12/km</h3>
            <p className="text-[10px] text-gray-500 font-medium">Safe one-way and round trips from Tirupati</p>
          </div>
          <button 
            onClick={() => navigate('/ride')}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rental Card */}
        <div className="p-4 rounded-2xl border border-gray-150 bg-gradient-to-r from-orange-50/50 to-white flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-black uppercase tracking-wider font-display">
              Hourly Rentals
            </span>
            <h3 className="text-sm font-extrabold text-gray-800">Cabs & Autos by the Hour</h3>
            <p className="text-[10px] text-gray-500 font-medium">Keep a ride with you for multiple stops</p>
          </div>
          <button 
            onClick={() => navigate('/ride')}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-orange-600 hover:bg-orange-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tirupati Special package card */}
        <div className="p-4 rounded-2xl border border-gray-150 bg-gradient-to-r from-purple-50 to-white flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-black uppercase tracking-wider font-display">
                Pilgrimage Special
              </span>
              <span className="text-[9px] bg-rose-150 text-rose-700 font-bold px-1.5 py-0.5 rounded font-mono">Popular</span>
            </div>
            <h3 className="text-sm font-extrabold text-gray-800">Tirupati temple packages</h3>
            <p className="text-[10px] text-gray-500 font-medium">Dedicated round-trip auto or cab with guide</p>
          </div>
          <button 
            onClick={() => navigate('/ride')}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SUB VIEW: PROFILE (Redesigned exactly to Screenshot 3)
// ----------------------------------------------------
function ProfileView({ user, balance, onLogout }) {
  const navigate = useNavigate();

  const profileItems = [
    { label: 'Help', icon: HelpCircle, action: () => alert('Support connected!') },
    { label: 'Parcel - Send Items', icon: Package, action: () => navigate('/courier') },
    { label: 'Payment', icon: CreditCard, subtitle: `Balance: ₹ ${balance.toFixed(2)}`, action: () => alert(`Wallet Balance: ₹ ${balance.toFixed(2)}`) },
    { label: 'My Rides', icon: Clock, action: () => alert('Showing past rides list...') },
    { label: 'Safety', icon: Shield, action: () => alert('Safety measures: SOS & Vet check active.') },
    { label: 'Refer and Earn', icon: Gift, subtitle: 'Get ₹50', action: () => alert('Referral Code: SWIFTGO50') },
    { label: 'My Rewards', icon: Trophy, action: () => alert('Vouchers: 2 active coupons.') },
    { label: 'Power Pass', icon: Ticket, action: () => alert('Power Pass subscriptions: 20% off rides active!') },
  ];

  return (
    <div className="flex-1 flex flex-col p-4.5 text-left bg-[#F8F9FB] space-y-4">
      <h2 className="text-xl font-extrabold text-gray-950 font-display pl-0.5 mt-2">
        Profile
      </h2>

      {/* User Info Container Panel exactly like Screenshot 3 */}
      <div className="bg-white rounded-3xl border border-gray-150 p-4 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Round Avatar Icon with circle outline */}
            <div className="w-11 h-11 rounded-full border-2 border-[#FF7A00]/20 flex items-center justify-center text-gray-600 bg-gray-50 text-sm font-black font-display shrink-0 overflow-hidden">
              <img src="/avatar.png" className="w-full h-full object-cover" alt="User" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900 leading-tight">
                {user?.name || 'Malli Hasini Sarath'}
              </h3>
              <span className="text-[10px] text-gray-400 font-semibold block mt-0.5 leading-none">
                {user?.phone || '8074244332'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-100"></div>

        {/* Rating Section Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Star className="w-4.5 h-4.5 text-amber-500 fill-current shrink-0" />
            <span className="text-xs font-bold text-gray-800 leading-none">
              4.76 My Rating
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* List items with icons and chevrons */}
      <div className="bg-white rounded-3xl border border-gray-150 divide-y divide-gray-100 shadow-sm overflow-hidden">
        {profileItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4.5 h-4.5 text-gray-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-gray-800 block">
                  {item.label}
                </span>
                {item.subtitle && (
                  <span className="text-[9px] text-[#FF7A00] font-black uppercase font-display leading-none block mt-0.5">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-450" />
          </button>
        ))}

        {/* Switch / Logout Option */}
        <button
          onClick={onLogout}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-rose-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4.5 h-4.5 text-rose-500 shrink-0" />
            <span className="text-xs font-bold text-rose-600 block">
              Logout / Switch Account
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-350" />
        </button>
      </div>
    </div>
  );
}
