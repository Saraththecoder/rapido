import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Bike, 
  UtensilsCrossed, 
  BookOpen, 
  TrendingUp,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const { logout, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Riders', path: '/admin/riders', icon: Bike },
    { name: 'Restaurants', path: '/admin/restaurants', icon: UtensilsCrossed },
    { name: 'Bookings', path: '/admin/bookings', icon: BookOpen },
    { name: 'Revenue Reports', path: '/admin/revenue', icon: TrendingUp },
  ];

  return (
    <>
      {/* Mobile Top Header (only when sidebar is hidden on small screens) */}
      <div className="lg:hidden bg-dark text-white flex justify-between items-center px-4 h-16 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-white p-1.5 rounded-lg text-sm font-bold">SG</span>
          <span className="font-display font-extrabold text-lg">SwiftGo <span className="text-xs text-primary font-normal">Admin</span></span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="p-2 text-gray-400 hover:text-white transition focus:outline-none"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen bg-dark text-gray-300 z-40 flex flex-col justify-between border-r border-gray-800 transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand header for desktop (non-navbar view) */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-800">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white p-2 rounded-xl flex items-center justify-center font-bold text-lg">
                  SG
                </span>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  SwiftGo <span className="text-primary text-xs font-semibold">Admin</span>
                </span>
              </div>
            )}
            {collapsed && (
              <span className="bg-primary text-white p-2 rounded-xl flex items-center justify-center font-bold text-lg mx-auto">
                SG
              </span>
            )}
            
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 hidden lg:block transition"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-white shadow-md shadow-orange-500/20' 
                      : 'hover:bg-gray-800 hover:text-white text-gray-400'}
                    ${collapsed ? 'justify-center px-0' : ''}
                  `}
                  title={collapsed ? item.name : ''}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Info & Logout */}
        <div className="p-4 border-t border-gray-800 bg-dark-light/45">
          {currentUser && !collapsed && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <img 
                src={currentUser.avatar || "https://placehold.co/100x100?text=Admin"} 
                alt="Admin Avatar"
                className="w-10 h-10 rounded-xl object-cover border border-gray-700" 
              />
              <div className="truncate">
                <h4 className="text-sm font-semibold text-white leading-4">{currentUser.name}</h4>
                <span className="text-xs text-gray-500">Global Admin</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition duration-200
              ${collapsed ? 'justify-center px-0' : ''}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
