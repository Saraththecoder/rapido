import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Bell, Search, Star, Clock, ShoppingCart, Mic } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { RESTAURANTS } from '../../data/restaurants';
import { useCartStore } from '../../store/useCartStore';
import BottomNav from '../../components/BottomNav';
import { ProfileDrawer } from '../../components/DrawerModals';

const CUISINES = [
  { label: 'Pizza', icon: '🍕' },
  { label: 'Burger', icon: '🍔' },
  { label: 'Sushi', icon: '🍣' },
  { label: 'Noodles', icon: '🍜' },
];

export default function FoodHome() {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('Pizza'); // Default to Pizza as shown in Screenshot 5
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  useEffect(() => {
    applyTheme('food');
  }, []);

  // Filter restaurants by cuisine selection and search queries
  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check if the cuisine tag matches selected cuisine
    const matchesCuisine = !selectedCuisine || 
                           r.cuisines.some(c => c.toLowerCase().includes(selectedCuisine.toLowerCase()));
    
    return matchesSearch && matchesCuisine;
  });

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = getTotal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-[#1C1C1C]"
    >
      {/* Top Header Address Bar (Matching Screenshot 5) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div 
          onClick={() => setProfileOpen(true)}
          className="flex items-center gap-2 text-left cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img src="/avatar.png" className="w-7 h-7 rounded-full object-cover border border-orange-500/20" alt="Profile" />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xs text-gray-900 font-display">Home</span>
              <ChevronDown className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <span className="text-[10px] text-gray-400 font-bold block truncate max-w-[170px]">
              221B Baker Street, London...
            </span>
          </div>
        </div>
        
        {/* Notification Bell */}
        <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Main content scrollport */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-24 space-y-5">
        
        {/* Search Bar Input (Matching Screenshot 5) */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food, groceries..."
            className="w-full bg-[#F4F4F6] border border-transparent rounded-full pl-10 pr-10 py-3 text-xs text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-gray-100/80 transition-all font-semibold"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <Mic className="w-4 h-4 text-orange-500 absolute right-3.5 top-3.5 cursor-pointer" />
        </div>

        {/* Cuisine Filter Horizontal Scroll List */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {CUISINES.map((cuisine) => {
            const isSelected = selectedCuisine === cuisine.label;
            return (
              <button
                key={cuisine.label}
                onClick={() => setSelectedCuisine(cuisine.label)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 font-display ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10'
                    : 'bg-[#F4F4F6] text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cuisine.icon}</span>
                <span>{cuisine.label}</span>
              </button>
            );
          })}
        </div>

        {/* Promotional Offer Banner Card (Matching Screenshot 5) */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-5 text-white flex items-center justify-between relative overflow-hidden shadow-lg">
          <div className="space-y-1.5 text-left max-w-[60%] z-10">
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider font-display">
              Limited Time
            </span>
            <h3 className="text-lg font-black leading-tight font-display">
              50% OFF on First Order
            </h3>
            <p className="text-[10px] text-orange-100 font-semibold">
              Use Code: <strong className="font-extrabold text-white">SWIFTGO50</strong>
            </p>
          </div>
          
          {/* Cover pizza bowl display */}
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 shadow-md">
            <img src="/food_promo.png" className="w-full h-full object-cover" alt="Dish" />
          </div>
        </div>

        {/* Featured Restaurants List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest font-display">
              Featured Restaurants
            </h3>
            <button className="text-xs font-bold text-orange-500 hover:underline">
              See All
            </button>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <span className="text-2xl block mb-1">🔍</span>
              <p className="text-xs font-bold">No matching restaurants found.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredRestaurants.map((res) => (
                <div
                  key={res.id}
                  onClick={() => navigate(`/food/${res.id}`)}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-250 transition-all cursor-pointer shadow-sm text-left group flex flex-col"
                >
                  {/* Photo Banners */}
                  <div className="h-[180px] w-full relative overflow-hidden">
                    <img 
                      src={res.image || '/food_promo.png'} 
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" 
                      alt={res.name} 
                    />
                    
                    {/* Offer Tag Top-Left */}
                    <div className="absolute top-3.5 left-3.5 bg-orange-500 text-white font-extrabold px-3 py-1 rounded-full text-[9px] uppercase tracking-wider shadow-md">
                      {res.offer}
                    </div>

                    {/* Rating badge bottom-right */}
                    <div className="absolute bottom-3.5 right-3.5 bg-white px-2 py-1 rounded-lg shadow-md border border-gray-100 flex items-center gap-0.5 z-10">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-[10px] font-black text-gray-800 font-display leading-none">
                        {res.rating}
                      </span>
                    </div>
                  </div>

                  {/* Text properties details below image */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="space-y-1.5 min-w-0 pr-2">
                      <h4 className="font-extrabold text-sm text-gray-900 font-display truncate">
                        {res.name}
                      </h4>
                      <p className="text-[11px] text-gray-450 font-bold truncate">
                        {res.eta} • {res.cuisines.join(' • ')}
                      </p>
                    </div>
                    
                    {/* Price level indicator */}
                    <span className="text-xs font-black text-orange-500 font-display shrink-0">
                      $$
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav />

      {/* Sticky Bottom Cart banner */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-5 left-4 right-4 bg-orange-500 text-white rounded-2xl p-3 flex items-center justify-between shadow-xl z-30"
          >
            <div className="flex items-center gap-2 px-1">
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold uppercase tracking-wide leading-none">{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
                <span className="text-[9px] text-orange-100 font-bold font-display">Total: ₹{cartTotal}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/food/cart')}
              className="bg-white text-orange-600 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-md font-display"
            >
              Check Out →
            </button>
          </motion.div>
        )}
        {profileOpen && (
          <ProfileDrawer
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
