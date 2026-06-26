import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, Star, Clock, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { RESTAURANTS } from '../../data/restaurants';
import { useCartStore } from '../../store/useCartStore';

export default function FoodRestaurant() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const { items, addItem, updateQty, getTotal } = useCartStore();

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);

  // Accordion state to toggle menu sections
  const [collapsedSections, setCollapsedSections] = useState({
    Recommended: false,
    Starters: false,
    'Main Course': false,
    Beverages: false
  });

  useEffect(() => {
    applyTheme('food');
    if (!restaurant) {
      navigate('/food');
    }
  }, [restaurant, navigate]);

  if (!restaurant) return null;

  const toggleSection = (sectionName) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleShare = () => {
    alert(`Link for ${restaurant.name} copied to clipboard!`);
  };

  const getQty = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    return item ? item.qty : 0;
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = getTotal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Navigation Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button
          onClick={() => navigate('/food')}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-extrabold text-sm text-gray-800 tracking-wide uppercase truncate max-w-[200px]">
          {restaurant.name}
        </span>
        <button
          onClick={handleShare}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <Share2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Main Restaurant Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Hero Gradient Banner */}
        <div className={`h-[140px] bg-gradient-to-br ${restaurant.gradient} p-5 relative flex flex-col justify-end text-white text-left`}>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-85">Authentic Cuisines</span>
          <h1 className="text-xl font-black leading-none mt-1 filter drop-shadow">
            {restaurant.name}
          </h1>
        </div>

        {/* Info stats bar card */}
        <div className="mx-4 mt-[-15px] relative z-10 bg-white border border-gray-100 rounded-2xl p-4 shadow-md text-left">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div>
                <span className="flex items-center gap-0.5 font-extrabold text-xs text-green-700 bg-green-50 px-1.5 py-0.5 rounded w-fit">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {restaurant.rating}
                </span>
                <span className="text-[10px] text-gray-400 font-bold block mt-1">200+ Ratings</span>
              </div>
              <div className="border-r border-gray-100"></div>
              <div>
                <span className="flex items-center gap-1 font-extrabold text-xs text-gray-700 leading-tight">
                  <Clock className="w-3.5 h-3.5 text-gray-450 shrink-0" />
                  {restaurant.eta}
                </span>
                <span className="text-[10px] text-gray-400 font-bold block mt-1">Delivery Time</span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Min Order</span>
              <span className="text-xs font-extrabold text-gray-800 mt-0.5 block">₹{restaurant.minOrder}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between text-[11px] font-bold">
            <span className="flex items-center gap-1 text-green-700">
              🟢 Pure Veg Available
            </span>
            <span className="text-orange-500 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
              Offer: {restaurant.offer ? 'Active' : 'No Promos'}
            </span>
          </div>
        </div>

        {/* Menu Sections List */}
        <div className="p-4 space-y-4">
          {Object.keys(restaurant.menu).map((sectionName) => {
            const isCollapsed = collapsedSections[sectionName];
            const menuItems = restaurant.menu[sectionName];

            return (
              <div key={sectionName} className="border-b border-gray-100 pb-3">
                {/* Section Header Accordion trigger */}
                <button
                  onClick={() => toggleSection(sectionName)}
                  className="w-full flex items-center justify-between py-2 text-left"
                >
                  <span className="text-sm font-extrabold text-gray-900 tracking-wide">
                    {sectionName} ({menuItems.length})
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {/* Section Items */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden space-y-4 mt-2"
                    >
                      {menuItems.map((item) => {
                        const qty = getQty(item.id);
                        return (
                          <div
                            key={item.id}
                            className="flex items-start justify-between py-3 border-t border-gray-50 text-left gap-4"
                          >
                            {/* Left Side: Text details */}
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] leading-none px-1 rounded-sm border ${
                                  item.isVeg 
                                    ? 'border-green-600 text-green-600 bg-green-50' 
                                    : 'border-red-600 text-red-600 bg-red-50'
                                } font-extrabold`}>
                                  {item.isVeg ? 'VEG' : 'NON-VEG'}
                                </span>
                              </div>
                              <h4 className="font-extrabold text-sm text-gray-900">{item.name}</h4>
                              <span className="text-xs font-black text-gray-800 block">₹{item.price}</span>
                              <p className="text-[11px] text-gray-450 font-medium leading-relaxed max-w-[210px] line-clamp-2">
                                {item.desc}
                              </p>
                            </div>

                            {/* Right Side: Square Placeholder & ADD counter */}
                            <div className="relative flex-shrink-0 flex flex-col items-center">
                              {/* Square colored placeholder based on food category */}
                              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${restaurant.gradient} opacity-20 border border-gray-150`}></div>
                              
                              {/* Quantity Modifier CTA */}
                              <div className="absolute bottom-[-10px] w-20">
                                {qty === 0 ? (
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => addItem(item, restaurant.id)}
                                    className="w-full bg-white text-green-600 border border-green-300 font-extrabold text-[11px] rounded-lg py-1.5 uppercase tracking-wider shadow-sm hover:bg-green-50 transition-colors"
                                  >
                                    + ADD
                                  </motion.button>
                                ) : (
                                  <div className="w-full bg-white text-green-600 border border-green-300 font-extrabold text-xs rounded-lg py-1 flex items-center justify-between px-2.5 shadow-sm">
                                    <button 
                                      onClick={() => updateQty(item.id, -1)}
                                      className="hover:text-green-800 text-sm py-0.5 px-1 leading-none"
                                    >
                                      −
                                    </button>
                                    <span className="font-black text-[11px]">{qty}</span>
                                    <button 
                                      onClick={() => updateQty(item.id, 1)}
                                      className="hover:text-green-800 text-sm py-0.5 px-1 leading-none"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary Bar Sticky (only shows if item count is non-empty) */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-5 left-4 right-4 bg-orange-500 text-white rounded-2xl p-3 flex items-center justify-between shadow-xl z-30"
          >
            <div className="flex items-center gap-2 px-1">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold uppercase tracking-wide leading-none">{cartCount} item{cartCount > 1 ? 's' : ''} added</span>
                <span className="text-[9px] text-orange-100 font-bold">Total: ₹{cartTotal}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/food/cart')}
              className="bg-white text-orange-500 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-orange-50 transition-colors shadow-sm"
            >
              Check Out →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
