import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Car, Utensils, Box } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Hiding bottom nav on specific sub-flows
  const isTracking = path.includes('/tracking');
  const isBookFlow = path.includes('/book') || path.includes('/restaurant');
  const isConsoleOrAdmin = path.includes('/rider') || path.includes('/admin');

  if (isTracking || isBookFlow || isConsoleOrAdmin) {
    return null;
  }

  const items = [
    { label: 'Hub', icon: LayoutGrid, route: '/' },
    { label: 'Ride', icon: Car, route: '/ride' },
    { label: 'Food', icon: Utensils, route: '/food' },
    { label: 'Courier', icon: Box, route: '/courier' }
  ];

  return (
    <div className="absolute bottom-5 left-4 right-4 h-16 bg-[#110E16]/95 border border-white/5 rounded-2xl flex items-center justify-around px-3.5 z-40 shadow-2xl">
      {items.map((item) => {
        // Match active route
        const isActive = item.route === '/' 
          ? path === '/' 
          : path.startsWith(item.route);

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.route)}
            className={`flex items-center gap-2 py-1.5 px-3.5 transition-all duration-350 select-none ${
              isActive
                ? 'bg-[#221F2D] text-[#C3B1E1] border border-purple-500/20 rounded-2xl scale-[1.03]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon className="w-5 h-5 stroke-[2]" />
            {isActive && (
              <span className="text-[10px] font-black tracking-wider uppercase font-display leading-none">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
