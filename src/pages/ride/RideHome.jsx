import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Heart, 
  ChevronRight, 
  Bell, 
  Menu,
  ArrowRight,
  Package,
  Car,
  Compass,
  ArrowLeft,
  User
} from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useRideStore } from '../../store/useRideStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileDrawer, HistoryDrawer, OffersDrawer, SettingsDrawer, HelpDrawer } from '../../components/DrawerModals';

export default function RideHome({ setActiveTab }) {
  const navigate = useNavigate();
  const { setRoute } = useRideStore();
  const user = useAuthStore((state) => state.user);

  // Drawers state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Search input state
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [pickupInput, setPickupInput] = useState('Detecting Current Location...');
  const [dropoffInput, setDropoffInput] = useState('');

  useEffect(() => {
    applyTheme('taxi');
  }, []);

  const handleSelectLocation = (placeName, fullAddress) => {
    setRoute('Jubilee Hills Road No. 36, Hyderabad', fullAddress || placeName);
    navigate('/ride/book');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!dropoffInput) return;
    setRoute(
      pickupInput === 'Detecting Current Location...' ? 'Jubilee Hills Road No. 36, Hyderabad' : pickupInput,
      dropoffInput
    );
    navigate('/ride/book');
  };

  const savedPlaces = [
    { name: 'bustand', address: '1 Busstand, Tata Nagar, Tirupati, Andhra Pradesh ...', isHeartActive: true },
    { name: 'Upparapalli Road', address: 'Tirupati, Andhra Pradesh, India', isHeartActive: false },
    { name: 'Railway Station', address: 'opp. Tirupati, Tata Nagar, Tirupati, Andhra Pradesh...', isHeartActive: false }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white text-gray-900 min-h-full pb-6 text-left relative">
      
      {/* Header with Drawer Trigger & Notification */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-800" />
          </button>
          <span className="text-sm font-black tracking-widest text-gray-900 font-display">
            SWIFTGO
          </span>
        </div>
        
        <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {!showSearchPanel ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col space-y-5 mt-2"
          >
            {/* Search Input Bar (Matches Image 1) */}
            <div 
              onClick={() => setShowSearchPanel(true)}
              className="mx-4 p-3.5 flex items-center gap-3 bg-[#F4F4F6] hover:bg-gray-150 rounded-2xl cursor-pointer transition-colors border border-gray-100 shadow-sm"
            >
              <Search className="w-5 h-5 text-gray-650 shrink-0" />
              <span className="text-[13px] font-black text-gray-900 font-display">
                Where are you going?
              </span>
            </div>

            {/* Saved Places List (Matches Image 1) */}
            <div className="px-4 divide-y divide-gray-100">
              {savedPlaces.map((place, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleSelectLocation(place.name, place.address)}
                  className="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3.5 pr-4 min-w-0">
                    <div className="p-2.5 rounded-xl bg-[#F4F4F6] text-gray-500 mt-0.5 shrink-0">
                      {idx === 0 ? (
                        <MapPin className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-gray-900 font-display truncate">
                        {place.name}
                      </h4>
                      <p className="text-[10px] text-gray-450 font-bold truncate mt-0.5">
                        {place.address}
                      </p>
                    </div>
                  </div>
                  
                  {/* Heart Action Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${place.name} added to favorites`);
                    }}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${place.isHeartActive ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-gray-400'}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Popular Places Section (Matches Image 1) */}
            <div className="space-y-3 px-4">
              <h3 className="text-xs font-black text-gray-905 uppercase tracking-wider pl-0.5 font-display">
                Popular Places
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Bus Stand Card */}
                <div 
                  onClick={() => handleSelectLocation('Bus Stand', 'Tirupati Bus Stand, Tirupati')}
                  className="rounded-3xl border border-gray-150 overflow-hidden bg-white hover:border-orange-500/20 cursor-pointer group shadow-sm"
                >
                  <div className="p-3 pb-2 flex justify-between items-center bg-gray-50/50">
                    <span className="text-[11px] font-black text-gray-800 font-display">Bus Stand</span>
                    <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 group-hover:scale-105 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="h-28 overflow-hidden bg-gray-100">
                    <img 
                      src="/bus_stand.png" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      alt="Bus Stand" 
                    />
                  </div>
                </div>

                {/* Railway Station Card */}
                <div 
                  onClick={() => handleSelectLocation('Railway station', 'Tirupati Railway Station, Tirupati')}
                  className="rounded-3xl border border-gray-150 overflow-hidden bg-white hover:border-orange-500/20 cursor-pointer group shadow-sm"
                >
                  <div className="p-3 pb-2 flex justify-between items-center bg-gray-50/50">
                    <span className="text-[11px] font-black text-gray-800 font-display">Railway station</span>
                    <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 group-hover:scale-105 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="h-28 overflow-hidden bg-gray-100">
                    <img 
                      src="/railway_station.png" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      alt="Railway station" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Section (Matches Image 1) */}
            <div className="space-y-3 px-4 pt-1">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider pl-0.5 font-display">
                  Explore
                </h3>
                <button 
                  onClick={() => setActiveTab('services')}
                  className="text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-wider flex items-center gap-0.5 font-display"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>

              {/* Grid / Horizontal Row of Explore items */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => navigate('/courier')}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-[#F8F9FB] border border-gray-100 hover:border-orange-500/20 transition-all text-center"
                >
                  <div className="text-xl mb-1.5 p-2 bg-white rounded-xl shadow-xs">📦</div>
                  <span className="text-[9px] font-extrabold text-gray-700 leading-tight">
                    Parcel on Bike
                  </span>
                </button>

                <button
                  onClick={() => handleSelectLocation('Auto', 'Auto Stand, Hyderabad')}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-[#F8F9FB] border border-gray-100 hover:border-orange-500/20 transition-all text-center"
                >
                  <div className="text-xl mb-1.5 p-2 bg-white rounded-xl shadow-xs">🛺</div>
                  <span className="text-[9px] font-extrabold text-gray-700 leading-tight">
                    Auto
                  </span>
                </button>

                <button
                  onClick={() => handleSelectLocation('Cab Economy', 'Cab Point, Hyderabad')}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-[#F8F9FB] border border-gray-100 hover:border-orange-500/20 transition-all text-center"
                >
                  <div className="text-xl mb-1.5 p-2 bg-white rounded-xl shadow-xs">🚗</div>
                  <span className="text-[9px] font-extrabold text-gray-700 leading-tight">
                    Cab Economy
                  </span>
                </button>

                <button
                  onClick={() => handleSelectLocation('Bike', 'Bike Parking, Hyderabad')}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-[#F8F9FB] border border-gray-100 hover:border-orange-500/20 transition-all text-center"
                >
                  <div className="text-xl mb-1.5 p-2 bg-white rounded-xl shadow-xs">🛵</div>
                  <span className="text-[9px] font-extrabold text-gray-700 leading-tight">
                    Bike
                  </span>
                </button>
              </div>
            </div>

          </motion.div>
        ) : (
          /* Address Search Form Slide-up Panel (Unified with booking inputs) */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="flex-1 flex flex-col p-5 bg-[#F8F9FB] justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowSearchPanel(false)}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider font-display">
                  Find a Ride
                </h3>
              </div>

              {/* Input Form Panel */}
              <form onSubmit={handleSearchSubmit} className="bg-white border border-gray-150 rounded-2xl p-4.5 flex gap-3.5 relative shadow-sm">
                <div className="flex flex-col items-center justify-between py-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0"></div>
                  <div className="w-0.5 flex-1 bg-gray-200 my-1.5"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></div>
                </div>

                <div className="flex-1 space-y-3.5">
                  <div className="text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block pl-0.5">Pickup Location</label>
                    <input
                      type="text"
                      value={pickupInput}
                      onChange={(e) => setPickupInput(e.target.value)}
                      placeholder="Pickup address"
                      className="w-full bg-transparent border-none p-0 text-xs text-gray-805 font-bold focus:outline-none focus:ring-0 mt-0.5 leading-none"
                    />
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block pl-0.5">Dropoff Destination</label>
                    <input
                      type="text"
                      value={dropoffInput}
                      onChange={(e) => setDropoffInput(e.target.value)}
                      placeholder="Where to?"
                      autoFocus
                      className="w-full bg-transparent border-none p-0 text-xs text-gray-805 font-bold focus:outline-none focus:ring-0 mt-0.5 leading-none"
                    />
                  </div>
                </div>
              </form>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSearchSubmit}
              disabled={!dropoffInput}
              className={`w-full py-4 font-black rounded-2xl flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest transition-all duration-300 font-display shadow-md ${
                dropoffInput 
                  ? 'bg-[#FF7A00] text-black shadow-orange-500/10'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Find Drivers</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu Drawer Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="absolute inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-3/4 h-full bg-white flex flex-col justify-between z-10 shadow-2xl text-gray-900 border-r border-[#E5E5E5]"
            >
              <div className="bg-[#FF7A00] p-5 pt-8 text-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-black/10 text-black hover:bg-black/20 transition-all"
                >
                  <ArrowLeft className="w-4.5 h-4.5" />
                </button>

                <div className="flex items-center gap-3 mt-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-white border-2 border-white/20 overflow-hidden">
                    <img src="/avatar.png" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-extrabold text-sm leading-tight font-display text-black">
                      {user?.name || 'Malli Hasini Sarath'}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                      <span className="font-extrabold bg-black/10 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-display leading-none">
                        ⭐ 4.76
                      </span>
                      <span className="text-gray-900 font-bold">
                        {user?.phone || '8074244332'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 px-5 py-4 overflow-y-auto divide-y divide-gray-100 text-gray-800 text-left">
                <button onClick={() => { setIsDrawerOpen(false); setIsProfileOpen(true); }} className="w-full flex items-center gap-4 py-3.5 font-bold text-xs hover:text-orange-600 transition-colors">
                  <User className="w-4.5 h-4.5 text-gray-400" />
                  <span>Profile Settings</span>
                </button>
                <button onClick={() => { setIsDrawerOpen(false); setIsHistoryOpen(true); }} className="w-full flex items-center gap-4 py-3.5 font-bold text-xs hover:text-orange-600 transition-colors">
                  <Clock className="w-4.5 h-4.5 text-gray-400" />
                  <span>Ride History</span>
                </button>
                <button onClick={() => { setIsDrawerOpen(false); setIsOffersOpen(true); }} className="w-full flex items-center gap-4 py-3.5 font-bold text-xs hover:text-orange-600 transition-colors">
                  <Package className="w-4.5 h-4.5 text-gray-400" />
                  <span>Offers & Coupons</span>
                </button>
                <button onClick={() => { setIsDrawerOpen(false); setIsSettingsOpen(true); }} className="w-full flex items-center gap-4 py-3.5 font-bold text-xs hover:text-orange-600 transition-colors">
                  <Compass className="w-4.5 h-4.5 text-gray-400" />
                  <span>Settings</span>
                </button>
                <button onClick={() => { setIsDrawerOpen(false); setIsHelpOpen(true); }} className="w-full flex items-center gap-4 py-3.5 font-bold text-xs hover:text-orange-600 transition-colors">
                  <HelpDrawer isOpen={true} onClose={() => {}} className="w-4.5 h-4.5 text-gray-400" />
                  <span>Help Support</span>
                </button>
              </div>

              <div className="p-4 border-t border-[#E5E5E5] text-center bg-[#F8F8F8]">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-display">
                  SWIFTGO v1.0.0
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {isProfileOpen && <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />}
        {isHistoryOpen && <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />}
        {isOffersOpen && <OffersDrawer isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} />}
        {isSettingsOpen && <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />}
        {isHelpOpen && <HelpDrawer isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
