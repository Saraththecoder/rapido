import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import RestaurantCard from '../../components/RestaurantCard';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

const FoodDelivery = () => {
  const { restaurants } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Veg', 'Fast Food', 'Biryani', 'Chinese', 'Healthy'];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Search filter
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category chips filter
    if (activeFilter === 'All') return matchesSearch;
    
    if (activeFilter === 'Veg') {
      return matchesSearch && restaurant.cuisine.toLowerCase().includes('veg');
    }
    
    return matchesSearch && restaurant.cuisine.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Search Header Banner */}
      <div className="bg-dark text-white rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="bg-amber-500/20 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            SwiftGo Food Delivery
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white leading-tight">
            Order fresh meals from <span className="text-primary">top local kitchens</span>
          </h2>
          
          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl pt-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-dark border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="bg-white p-1.5 rounded-2xl border border-gray-100 flex items-center gap-1 shrink-0 text-gray-400">
          <SlidersHorizontal size={16} className="mx-1" />
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 border shrink-0 ${
              activeFilter === filter
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'bg-white border-gray-100 text-gray-600 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Restaurants List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-extrabold text-xl text-dark">
            {activeFilter === 'All' ? 'Popular Restaurants' : `${activeFilter} Spotlights`}
          </h3>
          <span className="text-xs text-gray-400 font-semibold">{filteredRestaurants.length} locations found</span>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 py-16 text-center text-gray-400 max-w-md mx-auto space-y-3">
            <Search size={48} className="mx-auto text-gray-200" />
            <p className="text-sm font-bold text-dark">No restaurants match your search.</p>
            <p className="text-xs max-w-xs mx-auto text-gray-400 leading-relaxed font-medium">
              Try searching for other cuisines (like Biryani, Chinese, Italian) or adjust your filter choices.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default FoodDelivery;
