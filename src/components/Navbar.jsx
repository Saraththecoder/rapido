import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X, LogOut, Wallet, User, Car, Utensils, Package, BarChart2 } from 'lucide-react';

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

  // Define nav links based on role
  const renderNavLinks = () => {
    if (!currentUser) {
      return (
        <>
          <Link
            to="/login"
            className="text-gray-700 hover:text-primary font-medium transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl font-medium shadow-sm transition duration-200"
          >
            Register
          </Link>
        </>
      );
    }

    if (currentUser.role === 'user') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <Link
            to="/user/dashboard"
            className={`font-medium transition duration-200 ${isActive('/user/dashboard') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/user/taxi"
            className={`flex items-center gap-1 font-medium transition duration-200 ${isActive('/user/taxi') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            <Car size={16} /> Taxi Ride
          </Link>
          <Link
            to="/user/food"
            className={`flex items-center gap-1 font-medium transition duration-200 ${isActive('/user/food') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            <Utensils size={16} /> Food Delivery
          </Link>
          <Link
            to="/user/parcel"
            className={`flex items-center gap-1 font-medium transition duration-200 ${isActive('/user/parcel') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            <Package size={16} /> Parcel
          </Link>
          <Link
            to="/user/history"
            className={`font-medium transition duration-200 ${isActive('/user/history') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Orders History
          </Link>
        </div>
      );
    }

    if (currentUser.role === 'rider') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <Link
            to="/rider/dashboard"
            className={`font-medium transition duration-200 ${isActive('/rider/dashboard') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Rider Console
          </Link>
          <Link
            to="/rider/requests"
            className={`font-medium transition duration-200 ${isActive('/rider/requests') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Job Requests
          </Link>
          <Link
            to="/rider/earnings"
            className={`font-medium transition duration-200 ${isActive('/rider/earnings') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Earnings
          </Link>
          <Link
            to="/rider/wallet"
            className={`font-medium transition duration-200 ${isActive('/rider/wallet') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            Wallet
          </Link>
        </div>
      );
    }

    if (currentUser.role === 'admin') {
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 md:hidden">
          <Link
            to="/admin/dashboard"
            className="font-medium text-gray-600 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary text-white p-2 rounded-xl flex items-center justify-center font-bold text-xl shadow-md shadow-orange-200">
                SG
              </span>
              <span className="font-display font-extrabold text-2xl text-dark tracking-tight">
                Swift<span className="text-primary">Go</span>
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
                    className="flex items-center gap-2 bg-orange-50 text-primary border border-orange-100 px-4 py-2 rounded-xl hover:bg-orange-100 transition duration-200 font-medium"
                  >
                    <Wallet size={16} />
                    <span>₹{currentUser.walletBalance?.toFixed(2)}</span>
                  </Link>
                )}
                {currentUser.role === 'rider' && (
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${currentUser.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                    <span className="text-xs font-semibold text-gray-500 uppercase">{currentUser.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                )}
                
                {/* User Avatar Dropdown placeholder / details */}
                <Link
                  to={currentUser.role === 'user' ? '/user/profile' : '#'}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <img
                    src={currentUser.avatar || "https://placehold.co/100x100?text=User"}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-orange-50 border border-white shadow-sm"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs text-gray-400 font-medium leading-3">Welcome</p>
                    <p className="text-sm font-semibold text-dark max-w-[120px] truncate">{currentUser.name}</p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50 transition duration-200"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            {currentUser && currentUser.role === 'user' && (
              <Link
                to="/user/wallet"
                className="flex items-center gap-1.5 bg-orange-50 text-primary px-3 py-1.5 rounded-xl text-sm font-semibold border border-orange-100"
              >
                <Wallet size={14} />
                <span>₹{currentUser.walletBalance?.toFixed(0)}</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-slate-50 focus:outline-none transition duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 pt-2 pb-6 space-y-4 shadow-inner">
          <div className="flex flex-col gap-3">
            {renderNavLinks()}
          </div>
          
          {currentUser && (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar || "https://placehold.co/100x100?text=User"}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-dark">{currentUser.name}</h4>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {currentUser.role === 'user' && (
                  <Link
                    to="/user/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 py-2.5 rounded-xl font-medium text-sm transition"
                  >
                    <User size={16} /> Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-xl font-medium text-sm transition"
                >
                  <LogOut size={16} /> Logout
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
