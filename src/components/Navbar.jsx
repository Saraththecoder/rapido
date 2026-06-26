import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X, LogOut, Wallet, User, Car, Utensils, Package } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const renderNavLinks = () => {
    if (!currentUser) {
      return (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-zinc-550 hover:text-zinc-900 text-sm font-semibold transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn-primary px-4.5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Register
          </Link>
        </div>
      );
    }

    const baseClass = "text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 ";
    const activeClass = "text-zinc-900 border-b-2 border-primary";
    const inactiveClass = "text-zinc-450 hover:text-zinc-900";

    if (currentUser.role === 'user') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <Link
            to="/user/dashboard"
            className={`${baseClass} ${isActive('/user/dashboard') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/user/taxi"
            className={`${baseClass} flex items-center gap-1.5 ${isActive('/user/taxi') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            <Car size={13} /> Taxi Ride
          </Link>
          <Link
            to="/user/food"
            className={`${baseClass} flex items-center gap-1.5 ${isActive('/user/food') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            <Utensils size={13} /> Food Delivery
          </Link>
          <Link
            to="/user/parcel"
            className={`${baseClass} flex items-center gap-1.5 ${isActive('/user/parcel') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            <Package size={13} /> Parcel
          </Link>
          <Link
            to="/user/history"
            className={`${baseClass} ${isActive('/user/history') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            History
          </Link>
        </div>
      );
    }

    if (currentUser.role === 'rider') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <Link
            to="/rider/dashboard"
            className={`${baseClass} ${isActive('/rider/dashboard') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Rider Console
          </Link>
          <Link
            to="/rider/requests"
            className={`${baseClass} ${isActive('/rider/requests') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Job Requests
          </Link>
          <Link
            to="/rider/earnings"
            className={`${baseClass} ${isActive('/rider/earnings') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Earnings
          </Link>
          <Link
            to="/rider/wallet"
            className={`${baseClass} ${isActive('/rider/wallet') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Wallet
          </Link>
        </div>
      );
    }

    if (currentUser.role === 'admin') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <Link
            to="/admin/dashboard"
            className={`${baseClass} ${isActive('/admin/dashboard') ? activeClass : inactiveClass}`}
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary text-white px-2.5 py-1.5 rounded-lg flex items-center justify-center font-bold text-sm tracking-tight">
                SG
              </span>
              <span className="font-display font-extrabold text-xl text-zinc-950 tracking-tight">
                SwiftGo<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {renderNavLinks()}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {currentUser && (
              <>
                {currentUser.role === 'user' && (
                  <Link
                    to="/user/wallet"
                    className="flex items-center gap-1.5 bg-accent-peach/30 hover:bg-accent-peach/50 text-primary border border-primary/10 px-3.5 py-1.5 rounded-xl transition font-semibold text-xs"
                  >
                    <Wallet size={14} className="text-primary" />
                    <span>₹{currentUser.walletBalance?.toFixed(2)}</span>
                  </Link>
                )}
                {currentUser.role === 'rider' && (
                  <div className="flex items-center gap-2 border border-primary/10 bg-accent-peach/30 text-primary px-3 py-1.5 rounded-xl">
                    <span className={`h-2 w-2 rounded-full ${currentUser.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-350'}`}></span>
                    <span className="text-[10px] font-bold text-primary uppercase">{currentUser.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                )}
                
                {/* User Avatar */}
                <Link
                  to={currentUser.role === 'user' ? '/user/profile' : '#'}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <img
                    src={currentUser.avatar || "https://placehold.co/100x100?text=User"}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover border border-zinc-100"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase leading-none">Welcome</p>
                    <p className="text-xs font-bold text-zinc-800 max-w-[100px] truncate">{currentUser.name}</p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-primary p-2 rounded-lg hover:bg-accent-peach/20 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            {currentUser && currentUser.role === 'user' && (
              <Link
                to="/user/wallet"
                className="flex items-center gap-1 bg-accent-peach/30 text-primary px-2.5 py-1.5 rounded-xl text-xs font-bold border border-primary/10"
              >
                <Wallet size={12} className="text-primary" />
                <span>₹{currentUser.walletBalance?.toFixed(0)}</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-primary hover:bg-accent-peach/20 transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-4 pt-2 pb-6 space-y-4 shadow-sm text-left">
          <div className="flex flex-col gap-2">
            {renderNavLinks()}
          </div>
          
          {currentUser && (
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar || "https://placehold.co/100x100?text=User"}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-lg object-cover border border-zinc-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-zinc-800">{currentUser.name}</h4>
                  <p className="text-[10px] text-zinc-400 font-semibold">{currentUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {currentUser.role === 'user' && (
                  <Link
                    to="/user/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 bg-accent-peach/20 hover:bg-accent-peach/30 text-primary py-2 rounded-xl font-bold text-xs border border-primary/10 transition"
                  >
                    <User size={14} /> Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-xl font-bold text-xs border border-rose-100 transition"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
