import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import RestaurantCard from '../../components/RestaurantCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const FoodDelivery = () => {
  const { restaurants } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Veg', 'Fast Food', 'Biryani', 'Chinese', 'Healthy'];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    
    if (activeFilter === 'Veg') {
      return matchesSearch && restaurant.cuisine.toLowerCase().includes('veg');
    }
    
    return matchesSearch && restaurant.cuisine.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left animate-fade-in">
      
      {/* Search Header Banner */}
      <div className="bg-apollo-header border border-primary/10 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="bg-primary text-white px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
            SwiftGo Food
          </span>
          <h2 className="text-2.5xl md:text-4.5xl font-display font-black text-zinc-900 tracking-tight leading-tight">
            Order fresh meals from <span className="text-primary">local kitchens</span>
          </h2>
          
          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl pt-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold placeholder:text-zinc-400 text-zinc-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="bg-accent-peach/30 p-2.5 rounded-xl border border-primary/10 flex items-center justify-center shrink-0 text-primary shadow-sm">
          <SlidersHorizontal size={14} />
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 border shadow-sm ${
              activeFilter === filter
                ? 'bg-primary border-primary text-white'
                : 'bg-white border-zinc-150 text-zinc-650 hover:border-primary/20 hover:text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Restaurants List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-display font-bold text-lg text-zinc-900">
            {activeFilter === 'All' ? 'Popular Restaurants' : `${activeFilter} Spotlights`}
          </h3>
          <span className="text-xs text-zinc-400 font-bold shrink-0">{filteredRestaurants.length} locations</span>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-zinc-100 rounded-2xl py-16 text-center text-zinc-400 max-w-md mx-auto space-y-3 shadow-sm">
            <Search size={40} className="mx-auto text-primary opacity-60" />
            <p className="text-sm font-bold text-zinc-800">No restaurants match.</p>
            <p className="text-xs max-w-xs mx-auto text-zinc-450 leading-relaxed font-semibold">
              Try searching for other cuisines (like Biryani, Chinese, Italian) or adjust filters.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default FoodDelivery;
