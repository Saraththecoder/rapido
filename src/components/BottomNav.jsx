import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Home, 
  Car, 
  Utensils, 
  History, 
  User, 
  ClipboardList, 
  TrendingUp, 
  Wallet,
  Package
} from 'lucide-react';

const BottomNav = () => {
  const { currentUser } = useContext(AppContext);

  if (!currentUser) return null;

  const isRider = currentUser.role === 'rider';
  const isUser = currentUser.role === 'user';

  if (!isUser && !isRider) return null;

  const userItems = [
    { name: 'Home', path: '/user/dashboard', icon: Home },
    { name: 'Taxi', path: '/user/taxi', icon: Car },
    { name: 'Food', path: '/user/food', icon: Utensils },
    { name: 'Parcel', path: '/user/parcel', icon: Package },
    { name: 'History', path: '/user/history', icon: History },
  ];

  const riderItems = [
    { name: 'Home', path: '/rider/dashboard', icon: Home },
    { name: 'Requests', path: '/rider/requests', icon: ClipboardList },
    { name: 'Earnings', path: '/rider/earnings', icon: TrendingUp },
    { name: 'Wallet', path: '/rider/wallet', icon: Wallet },
  ];

  const activeStyle = "text-zinc-950 flex flex-col items-center justify-center w-full h-full py-1 text-[9px] font-bold uppercase tracking-wider transition-colors";
  const inactiveStyle = "text-zinc-400 hover:text-zinc-600 flex flex-col items-center justify-center w-full h-full py-1 text-[9px] font-medium uppercase tracking-wider transition-colors";

  const items = isRider ? riderItems : userItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-50 h-15 px-2">
      <div className="grid grid-cols-5 h-full max-w-md mx-auto items-center">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              <Icon size={16} className="mb-0.5" />
              <span className="truncate max-w-[50px]">{item.name}</span>
            </NavLink>
          );
        })}
        {isRider && (
          <NavLink
            to="/rider/dashboard"
            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          >
            <User size={16} className="mb-0.5" />
            <span>Profile</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
