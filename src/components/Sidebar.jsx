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
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white border-b border-zinc-100 text-zinc-900 flex justify-between items-center px-4 h-16 sticky top-0 z-45 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-bold font-mono">SG</span>
          <span className="font-display font-black text-base">SwiftGo <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Admin</span></span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="p-1.5 text-zinc-500 hover:text-zinc-900 transition focus:outline-none"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/10 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen bg-white text-zinc-650 z-40 flex flex-col justify-between border-r border-zinc-100 shadow-sm transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
        ${mobileOpen ? 'translate-x-0 w-60' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="text-left">
          {/* Brand header for desktop */}
          <div className="hidden lg:flex items-center justify-between p-5 border-b border-zinc-100">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white px-2 py-1 rounded text-sm font-bold font-mono">SG</span>
                <span className="font-display font-black text-base text-zinc-900 tracking-tight">
                  SwiftGo <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Admin</span>
                </span>
              </div>
            )}
            {collapsed && (
              <span className="bg-primary text-white px-2 py-1 rounded text-xs font-bold font-mono mx-auto">
                SG
              </span>
            )}
            
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="text-zinc-400 hover:text-primary p-1 rounded hover:bg-accent-peach/20 hidden lg:block transition"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-150
                    ${isActive 
                      ? 'bg-accent-peach/30 text-primary border border-primary/10 shadow-sm shadow-primary/5' 
                      : 'hover:bg-accent-peach/10 hover:text-primary text-zinc-450'}
                    ${collapsed ? 'justify-center px-0' : ''}
                  `}
                  title={collapsed ? item.name : ''}
                >
                  <Icon size={16} className="shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Info & Logout */}
        <div className="p-3 border-t border-zinc-100 bg-accent-peach/10">
          {currentUser && !collapsed && (
            <div className="flex items-center gap-3 mb-3 px-2 text-left">
              <img 
                src={currentUser.avatar || "https://placehold.co/100x100?text=Admin"} 
                alt="Admin Avatar"
                className="w-8 h-8 rounded-lg object-cover border border-zinc-100" 
              />
              <div className="truncate min-w-0">
                <h4 className="text-xs font-bold text-zinc-800 leading-none truncate">{currentUser.name}</h4>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Global Admin</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition duration-150
              ${collapsed ? 'justify-center px-0' : ''}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
