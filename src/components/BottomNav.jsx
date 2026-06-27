import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Palmtree, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Hiding bottom nav on specific sub-flows and the main dashboard route (dashboard renders its own)
  const isTracking = path.includes('/tracking');
  const isBookFlow = path.includes('/book') || path.includes('/restaurant');
  const isConsoleOrAdmin = path.includes('/rider') || path.includes('/admin') || path.includes('/vendor');
  const isMainDashboard = path === '/';

  if (isTracking || isBookFlow || isConsoleOrAdmin || isMainDashboard) {
    return null;
  }

  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab') || 'ride';

  const items = [
    { label: 'Ride', icon: Home, route: '/?tab=ride', tab: 'ride' },
    { label: 'All Services', icon: Compass, route: '/?tab=services', tab: 'services' },
    { label: 'Travel', icon: Palmtree, route: '/?tab=travel', tab: 'travel' },
    { label: 'Profile', icon: User, route: '/?tab=profile', tab: 'profile' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-150 flex items-center justify-around z-40 px-2 shadow-lg">
      {items.map((item) => {
        const isActive = path === '/' && currentTab === item.tab;

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.route)}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all ${
              isActive
                ? 'text-[#0C1E36] scale-105'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-black tracking-wide font-display">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

